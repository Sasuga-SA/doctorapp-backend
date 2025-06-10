import { Router } from 'express';
import { createDoctor, getAllDoctors } from '../controllers/doctor.controller.js';

const router = Router();

router.post('/', createDoctor);
router.get('/', getAllDoctors);

export default router;
