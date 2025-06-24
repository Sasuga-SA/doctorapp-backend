import { Op } from "sequelize";
import { User } from "../models/user.model.js";
import { hashToken } from "../utils/token.generator.js";

export async function verifyEmailController(req, res) {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: "Token requerido" });

  const hashed = hashToken(token);

  const user = await User.findOne({
    where: {
      verifyTokenHash: hashed,
      verifyTokenExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  user.isVerified = true;
  user.verifyTokenHash = null;
  user.verifyTokenExpires = null;
  await user.save();

  res.json({ message: "Cuenta verificada, ¡ya puedes iniciar sesión!" });
}
