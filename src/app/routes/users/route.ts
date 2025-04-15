import express from "express";
import type { Router } from "express";
import { 
  userController, 
  registerUser, 
  loginUser, 
  verifyUser, 
  logoutUser, 
  forgotPassword, 
  resetPassword,
  getMe
} from "./controller.ts";
import { isLoggedIn } from "../../../middlewares/oldAuth.middleware.ts";

export function registerRouter(): Router {
  const router = express.Router();

  // Test user route
  router.get("/", userController);

  // All users routes
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.get("/me", isLoggedIn, getMe);
  router.get("/verify/:token", verifyUser);
  router.get("/logout", isLoggedIn, logoutUser);
  router.post("/forgot-password", forgotPassword);
  router.post("/reset-password/:token", resetPassword);
  
  return router;
}