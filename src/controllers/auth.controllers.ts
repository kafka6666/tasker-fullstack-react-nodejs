import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  registrationValidation(body);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
  loginValidation(body);
});

export { 
  registerUser, 
  loginUser, 
  logoutUser, 
  verifyEmail, 
  resendVerificationEmail, 
  refreshAccessToken,
  forgotPasswordRequest,
  changeCurrentUserPassword,
  getCurrentUser 
};
