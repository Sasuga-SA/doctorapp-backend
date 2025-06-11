import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const { Doctor } = models;

export const registerDoctor = async (data) => {
  const { firstName, lastName, email, password, specialty, phone } = data;

  const exists = await Doctor.findOne({ where: { email } });
  if (exists) throw new Error('Email ya registrado');

  const hashed = await bcrypt.hash(password, 10);
  const doctor = await Doctor.create({ firstName, lastName, email, password: hashed, specialty, phone });

  return doctor;
};

export const authenticateDoctor = async ({ email, password }) => {
  const doctor = await Doctor.findOne({ where: { email } });
  if (!doctor) throw new Error('No encontrado');

  const valid = await bcrypt.compare(password, doctor.password);
  if (!valid) throw new Error('Credenciales inválidas');

  const token = jwt.sign({ id: doctor.id, role: doctor.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const getDoctorProfile = async (id) => {
  const doctor = await Doctor.findByPk(id, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'specialty', 'role'],
  });

  if (!doctor) throw new Error('Usuario no encontrado');
  return doctor;
};
