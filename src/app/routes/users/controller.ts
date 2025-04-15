import { ApiResponse } from "../../../utils/api-response.ts";
import { ApiError } from "../../../utils/api-error.ts";
import type { Request, Response, RequestHandler } from "express";
import { logger } from "../../../utils/logger.ts";
import { User } from "../../../models/user.models.ts";
import { env } from "../../../env.ts";
import type { CookieOptions } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const userController: RequestHandler = (req: Request, res: Response) => {
  logger.info("Server health check done and it's running successfully");
  
  res.json(
    new ApiResponse(
        200, 
        { 
            message: "User route hits and it's running successfully"
        }
    )
  );
};

// All users controllers
const registerUser: RequestHandler = async( req: Request, res: Response ) => {
  // Obtain user data from request body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json(
      new ApiError(
        400,
        "All fields are required",
        []
      )
    );
    return;
  }

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json(
        new ApiError(
          400,
          "User already exists",
          []
        )
      );
      return;
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (!user) {
      res.status(400).json(
        new ApiError(
          400,
          "User not registered",
          []
        )
      );
      return;
    }

    // Generate verification token and save to db
    const token = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = token;
    user.emailVerificationExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      host: env.MAILTRAP_SMTP_HOST,
      auth: {
        user: env.MAILTRAP_SMTP_USER,
        pass: env.MAILTRAP_SMTP_PASS,
      },
    });
    const mailOptions = {
      from: env.MAILTRAP_SMTP_USER,
      to: user.email,
      subject: "Verify your email",
      text: `Please click on the following link to verify your email: ${env.BASE_URL}/api/v1/users/verify/${token}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json(
      new ApiResponse(
        201, 
        {
          message: "User registered, check your email to verify",
        }
      )
    );
  } catch (error) {
    res.status(500).json(
      new ApiError(
        500,
        "User not registered",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  // Login user with email and password then add secure token in cookie
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json(
      new ApiError(
        400,
        "Email and password are required",
        []
      )
    );
    return;
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json(
        new ApiError(
          400,
          "Invalid email or password",
          []
        )
      );
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password as string, user.password as string);
    logger.info("Password match:", isMatch);
    if (!isMatch) {
      res.status(400).json(
        new ApiError(
          400,
          "Invalid email or password",
          []
        )
      );
      return;
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id as string,
        username: user.username as string,
        email: user.email as string,
      },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
      } as jwt.SignOptions
    );

    logger.info("Token generated:", token);

    // Set cookie with minimal options for testing
    const cookieOptions = {
      httpOnly: false, // Set to false for testing
      secure: false, // Set to false for local development
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    } as CookieOptions;

    logger.info("Cookie options: ", cookieOptions);

    // Set cookie before sending response
    res.cookie("token", token, cookieOptions);

    logger.info("Response headers:", res.getHeaders());

    // Send response along with user data
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id as string,
        email: user.email as string,
        username: user.username as string,
      },
    });
  } catch (error) {
    res.status(400).json(
      new ApiError(
        400,
        "User not logged in",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const logoutUser: RequestHandler = (req: Request, res: Response) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // This will make the cookie expire immediately
    });

    res.status(200).json(
      new ApiResponse(
        200,
        {
          message: "Logged out successfully",
        }
      )
    );
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json(
      new ApiError(
        500,
        "Error during logout",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const verifyUser: RequestHandler = async (req: Request, res: Response) => {
  //verify user
  const { token } = req.params;
  if (!token) {
    res.status(400).json(
      new ApiError(
        400,
        "Invalid token",
        []
      )
    );
    return;
  }

  try {
    // Find user by verification token
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      res.status(400).json(
        new ApiError(
          400,
          "Invalid token",
          []
        )
      );
      return;
    }
    
    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    // Save updated user
    await user.save();
    logger.info("User verified");

    // Send response
    res.status(200).json(
      new ApiResponse(
        200, 
        {
          message: "User verified",
        }
      )
    );
  } catch (error) {
    res.status(400).json(
      new ApiError(
        400,
        "User not verified",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const forgotPassword: RequestHandler = async (req: Request, res: Response) => {
  //get user by email and send reset token
  const { email } = req.body;
  if (!email) {
    res.status(400).json(
      new ApiError(
        400,
        "Email is required",
        []
      )
    );
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json(
        new ApiError(
          400,
          "Invalid email",
          []
        )
      );
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    const resetUrl = `${env.BASE_URL}/api/v1/users/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: env.MAILTRAP_SMTP_HOST,
      auth: {
        user: env.MAILTRAP_SMTP_USER,
        pass: env.MAILTRAP_SMTP_PASS,
      },
    });
    const mailOptions = {
      from: env.MAILTRAP_SMTP_USER,
      to: user.email || "",
      subject: "Reset your password",
      text: `Please click on the following link to reset your password: ${resetUrl}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          message: "Reset token sent to email",
        }
      )
    );
  } catch (error) {
    res.status(400).json(
      new ApiError(
        400,
        "Password reset failed",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const resetPassword: RequestHandler = async (req: Request, res: Response) => {
  // Obtain reset token and new password
  const { token } = req.params;
  const { password } = req.body;
  if (!token || !password) {
    res.status(400).json(
      new ApiError(
        400,
        "Token and password are required",
        []
      )
    );
    return;
  }

  // Find user by reset token and expiry
  try {
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json(
        new ApiError(
          400,
          "Invalid token",
          []
        )
      );
      return;
    }

    // Update user password and remove reset token
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    // Send response
    res.status(200).json(
      new ApiResponse(
        200,
        {
          message: "Password reset successful",
        }
      )
    );
  } catch (error) {
    res.status(400).json(
      new ApiError(
        400,
        "Password reset failed",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};

const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Check if user exists in the request
    if (!req.user) {
      logger.info("Unauthorized - User not authenticated");
      res.status(401).json(
        new ApiError(
          401,
          "Unauthorized - User not authenticated",
          []
        )
      );
      return;
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      logger.info("User not found");
      res.status(404).json(
        new ApiError(
          404,
          "User not found",
          []
        )
      );
      return;
    }

    res.status(200).json(
      new ApiResponse(
        200,
        {
          success: true,
          user,
        }
      )
    );
  } catch (error) {
    logger.error("Error fetching profile:", error);
    res.status(500).json(
      new ApiError(
        500,
        "Error fetching profile",
        [],
        error instanceof Error ? error.stack : "",
      )
    );
  }
};
  
export { 
    userController,
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    forgotPassword,
    resetPassword,
    getMe,
};