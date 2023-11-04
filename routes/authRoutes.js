import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  getUserAds,
  getFavroiteAds,
  sendEmail,
  getUser,
  changePassword,
} from "../controllers/authController.js";
import { protect, validateRegister } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .post("/", login)
  .post("/register", validateRegister , register)
  .post("/logout", logout)
  .put("/userProfile/:id", updateProfile)
  .get("/getUserAds/:id", getUserAds)
  .get("/getFavAds/:id", getFavroiteAds)
  .get("/getUser/:userId", getUser)
  .post("/send-email", sendEmail)
  .post("/change-password/:userId", changePassword);

export default router;
