import express from 'express';
import { loginUsuario } from '../controller/AuthController.js';

const router = express.Router();

// Login
router.post('/login', loginUsuario);

export default router;
