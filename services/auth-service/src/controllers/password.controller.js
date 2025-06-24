import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateRandomToken, hashToken } from "../utils/token.generator.js";
import { sendEmail } from "../services/mail.service.js";

export async function forgotPasswordController(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.json({
      message: "Si el correo existe, se enviará un enlace!.",
    });
  }

  const resetToken = generateRandomToken();
  user.resetTokenHash = hashToken(resetToken);
  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const url = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "Restablece tu contraseña",
    html: `
      <p>Hola,</p>
      <p>Haz clic en el siguiente enlace para crear una nueva contraseña. Este enlace vence en 15&nbsp;minutos.</p>
      <a href="${url}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
    `,
  });

  const payload = {
    message: "Si el correo existe, se enviará un enlace.",
  };

  if (process.env.NODE_ENV === "local") {
    payload.resetToken = resetToken;
  }

  res.json(payload);
}

export async function resetPasswordController(req, res) {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Datos incompletos" });

  const hashed = hashToken(token);

  const user = await User.findOne({
    where: {
      resetTokenHash: hashed,
      resetTokenExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });

  user.password = await bcrypt.hash(password, 10);
  user.resetTokenHash = null;
  user.resetTokenExpires = null;
  await user.save();

  res.json({ message: "Contraseña actualizada. Inicia sesión." });
}
