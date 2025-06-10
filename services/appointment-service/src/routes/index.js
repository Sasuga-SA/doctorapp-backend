import { Router } from 'express';
import doctorRoutes from './doctor.routes.js';
import appointmentRoutes from './appointment.routes.js'; // si ya tienes

const router = Router();

router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes); // si aplica

export default router;
