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
  forgotPassword,
  checkToken,
  emptyToken,
  verifyCode,
  resetPassword
} from "../controllers/authController.js";
import { changePasswordValidate, protect, validateRegister } from "../middleware/authMiddleware.js";
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
  .post("/change-password/:userId", changePasswordValidate, changePassword)
  .post("/forgot-password", forgotPassword)
  .get("/checkToken", checkToken).
  get("/verify-code/:code", verifyCode).
  post("/reset-password", resetPassword).
  get("/empty-token", emptyToken);

export default router;
