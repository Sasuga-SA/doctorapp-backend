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
      message: "If the email exists, a link will be sent!",
    });
  }

  const resetToken = generateRandomToken();
  user.resetTokenHash = hashToken(resetToken);
  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const url = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <p>Hello,</p>
      <p>Click on the following link to create a new password. This link expires in 15&nbsp;minutes.</p>
      <a href="${url}">Reset password</a>
      <p>If you didn't request this change, you can ignore this email.</p>
    `,
  });

  const payload = {
    message: "If the email exists, a link will be sent.",
  };

  if (process.env.NODE_ENV === "local") {
    payload.resetToken = resetToken;
  }

  res.json(payload);
}

export async function resetPasswordController(req, res) {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Incomplete data" });

  const hashed = hashToken(token);

  const user = await User.findOne({
    where: {
      resetTokenHash: hashed,
      resetTokenExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetTokenHash = null;
  user.resetTokenExpires = null;
  await user.save();

  res.json({ message: "Password updated. Please log in." });
}
