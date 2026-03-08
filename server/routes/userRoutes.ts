import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";
import { Request, Response } from "express";
import {
  login,
  signup,
  sendotp,
  logout,
  forgetPassword,
  resetPassword,
  changePassword,
  updateProfile,
} from "../controllers/UserControllers";
import { Auth } from "../middlewares/Auth";
// Create a new router instance
const router: Router = Router();

// --------------------------------------------------------------------------------------------------------
//                                           Authentication routes
// --------------------------------------------------------------------------------------------------------

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for user logout
router.post("/logout", logout);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);

router.post("/change-password", Auth, changePassword);
router.post("/update-profile", Auth, updateProfile);

//  for google signup
router.post("/google", AuthController.googleSignup);

export default router;
