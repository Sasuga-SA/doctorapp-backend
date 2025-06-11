import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/verify.jwt.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyJWT, getProfile);


export default router;
