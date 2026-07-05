import express from "express";
import {registerUser, login, getMe} from "../controllers/authController.js";
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;