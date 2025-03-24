import { Prisma } from "@prisma/client";
import { RegisterDto } from "./auth.dto";
import prisma from "../utils/prismaClient";

export class AuthService {
  select: Prisma.UserSelect;
  constructor() {
    this.select = {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public register = async (data: RegisterDto) => {
    return await prisma.user.create({
      data: {
        ...data,
      },
      select: this.select,
    });
  };
}
