import {
  registerUserService,
  authenticateUserService,
} from "../services/auth.service.js";

export const registerUserController = async (req, res) => {
  try {
    const response = await registerUserService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await authenticateUserService(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
