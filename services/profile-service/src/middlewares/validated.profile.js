import { validateProfileUtil } from "../utils/validated.profile.user.js";

export const validateProfileUser = (req, res, next) => {
  const errors = validateProfileUtil(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}; 