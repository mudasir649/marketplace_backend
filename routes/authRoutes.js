import express from "express";
import { register, login, logout, updateProfile, getUserAds, getFavroiteAds, sendEmail, getUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', login).
       post('/register', register).
       post('/logout', logout).
       put('/userProfile/:id', updateProfile).
       get('/getUserAds/:id', getUserAds).
       get('/getFavAds/:id', getFavroiteAds).
       get('/getUser/:userId', getUser).
       post('/send-email', sendEmail);

export default router;