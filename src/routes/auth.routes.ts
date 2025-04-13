import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegistrationValidator } from "../validators/index.js";

// Initialize router
const router = Router();

// Route for user registration
router.route("/register")
.post(userRegistrationValidator(), validate, registerUser);

export default router;