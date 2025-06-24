import crypto from "crypto";

export function generateRandomToken(size = 32) {
  return crypto.randomBytes(size).toString("hex");
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
