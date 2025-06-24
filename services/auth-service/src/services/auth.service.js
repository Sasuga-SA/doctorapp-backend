import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import { generateRandomToken, hashToken } from "../utils/token.generator.js";
import { sendEmail, verifyEmailTemplate } from "./mail.service.js";

const { User } = models;

export async function registerUserService(data) {
  const {
    firstName,
    lastName,
    email,
    password,
    specialty,
    phone,
    role = "doctor",
    organization,
  } = data;

  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error("Email ya registrado");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
    specialty,
    phone,
    role,
    organization,
    isVerified: false,
  });

  const verifyToken = generateRandomToken();
  user.verifyTokenHash = hashToken(verifyToken);
  user.verifyTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 h
  await user.save();

  const url = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verifica tu cuenta en DoctorApp",
    html: verifyEmailTemplate(user.firstName ?? "Doctor/a", url),
  });

  const payload = {
    message: "Registro exitoso, revisa tu correo para activar la cuenta",
    id: user.id,
  };

  if (process.env.NODE_ENV === "local") {
    payload.verifyToken = verifyToken;
  }

  return payload;
}

export const authenticateUserService = async ({ email, password }) => {
  const user = await User.scope("full").findOne({ where: { email } });
  if (!user) throw new Error("No encontrado");
  console.log(user.password);

  if (!user.isVerified) {
    throw new Error("Cuenta no verificada. Revisa tu correo electrónico.");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Credenciales inválidas");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
  return token;
};

export const getUserProfileService = async (id) => {
  const doctor = await User.findByPk(id, {
    attributes: ["id", "firstName", "lastName", "email", "specialty", "role"],
  });

  if (!doctor) throw new Error("Usuario no encontrado");
  return doctor;
};
