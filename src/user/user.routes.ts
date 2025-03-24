import express from "express";
import { UserController } from "./user.controller";
import { CreateUserDto, ListUserDto } from "./user.dto";
import { validator } from "../middlewares/validator";
import { asyncHandler } from "../utils/asyncHandler";
import { authHandler } from "../middlewares/authHandler";
import { UserService } from "./user.service";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post(
  "/create",
  authHandler(),
  validator(CreateUserDto),
  asyncHandler(userController.createUser)
);

router.get(
  "/list",
  validator(ListUserDto),
  asyncHandler(userController.getUsers)
);

export default router;
