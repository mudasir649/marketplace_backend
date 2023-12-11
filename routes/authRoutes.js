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
  resetPassword,
  verifyAccount,
  showAds,
  showNumber,
  resendVerifyCode
} from "../controllers/authController.js";
import { changePasswordValidate, protect, validateRegister } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .post("/", login)
  .post("/register", validateRegister , register)
  .post("/logout", logout)
  .put("/userProfile/:id", updateProfile)
  .put("/showAds/:id", showAds)
  .put("/showNumber/:id", showNumber)
  .get("/getUserAds/:id", getUserAds)
  .get("/getFavAds/:id", getFavroiteAds)
  .get("/getUser/:userId", getUser)
  .post("/send-email", sendEmail)
  .post("/change-password/:userId", changePasswordValidate, changePassword)
  .post("/forgot-password", forgotPassword)
  .post("/resend-code",  resendVerifyCode)
  .get("/checkToken", checkToken).
  get("/verify-code/:code", verifyCode).
  post("/reset-password", resetPassword).
  get("/empty-token", emptyToken).
  post("/verify-account", verifyAccount);

export default router;
