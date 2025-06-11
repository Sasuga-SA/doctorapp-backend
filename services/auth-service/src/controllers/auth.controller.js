import { registerDoctor, authenticateDoctor, getDoctorProfile } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const doctor = await registerDoctor(req.body);
    res.status(201).json({ message: "Doctor registrado", id: doctor.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authenticateDoctor(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Token inválido o ID no presente" });
    }

    const doctor = await getDoctorProfile(req.user.id);
    res.json({ doctor });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

