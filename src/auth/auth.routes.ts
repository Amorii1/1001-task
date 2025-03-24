import express from "express";
import { validator } from "../middlewares/validator";
import { asyncHandler } from "../utils/asyncHandler";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./auth.dto";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

const router = express.Router();

const authService = new AuthService();
const userService = new UserService();
const authController = new AuthController(authService, userService);

router.post(
  "/register",
  validator(RegisterDto),
  asyncHandler(authController.register)
);
router.post("/login", validator(LoginDto), asyncHandler(authController.login));
router.post("/logout", asyncHandler(authController.logout));
router.post(
  "/refresh-token",
  validator(RefreshTokenDto),
  asyncHandler(authController.refreshToken)
);

export default router;
