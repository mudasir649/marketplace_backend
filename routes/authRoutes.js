import express from "express";
import { register, login, logout, updateProfile, getUserAds } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', login).post('/register', register).post('/logout', logout).put('/userProfile/:id', updateProfile).get('/getUserAds/:id', getUserAds);

export default router;