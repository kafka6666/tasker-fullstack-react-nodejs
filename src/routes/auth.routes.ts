import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.ts";
import { validate } from "../middlewares/validator.middleware.ts";
import { userRegistrationValidator } from "../validators/index.ts";

// Initialize router
const router = Router();

// Route for user registration
router.route("/register")
.post(userRegistrationValidator(), validate, registerUser);

export default router;