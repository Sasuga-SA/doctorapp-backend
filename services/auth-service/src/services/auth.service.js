import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import { generateRandomToken, hashToken } from "../utils/token.generator.js";
import { sendEmail, verifyEmailTemplate } from "./mail.service.js";

const { User } = models;

export async function registerUserService(data) {
  const { email, password, role = "doctor" } = data;

  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role,
    isVerified: false,
  });

  const verifyToken = generateRandomToken();
  user.verifyTokenHash = hashToken(verifyToken);
  user.verifyTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  const url = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verify your account in DoctorApp",
    html: verifyEmailTemplate("User", url),
  });

  const payload = {
    message:
      "Registration successful, check your email to activate your account",
    id: user.id,
  };

  if (process.env.NODE_ENV === "local") {
    payload.verifyToken = verifyToken;
  }

  return payload;
}

export const authenticateUserService = async ({ email, password }) => {
  const user = await User.scope("full").findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  if (!user.isVerified) {
    throw new Error("Account not verified. Check your email.");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
  return token;
};

export const getUserProfileService = async (userId) => {
  const user = await User.scope("full").findByPk(userId);
  if (!user) throw new Error("User not found");

  // Return user data without sensitive information
  const userData = user.toJSON();
  delete userData.password;
  delete userData.verifyTokenHash;
  return userData;
};
