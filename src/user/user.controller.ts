import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { CreateUserDto, ListUserDto } from "./user.dto";
import bcrypt from "bcrypt";
import { AlreadyExistsError } from "../utils/customError";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    let userData: CreateUserDto = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);

    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new AlreadyExistsError();
    }

    const user = await this.userService.createUser(userData);
    res.status(201).json(user);
  };

  getUsers = async (req: Request, res: Response) => {
    const userData: ListUserDto = req.query;
    const users = await this.userService.getUsers(userData);
    res.status(200).json(users);
  };
}
