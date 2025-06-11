import express from 'express';
import authRoutes from './auth.routes.js';

const router = express.Router();

// Agrupa todas las rutas del microservicio aquí
router.use('/auth', authRoutes);

// Aquí podrías agregar más en el futuro:
// router.use('/admin', adminRoutes);

export default router;
