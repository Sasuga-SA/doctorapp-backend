import { validateUserUtil } from "../utils/validated.register.user.js";

export const validateRegisterUser = (req, res, next) => {
  const errors = validateUserUtil(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
