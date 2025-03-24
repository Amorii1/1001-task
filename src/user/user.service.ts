import { Prisma } from "@prisma/client";
import { CreateUserDto, ListUserDto } from "./user.dto";
import prisma from "../utils/prismaClient";

export class UserService {
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

  async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data: data,
      select: this.select,
    });
  }

  async getUsers(data: ListUserDto) {
    const { skip, take, email, name } = data;
    const where: Prisma.UserWhereInput = {
      name: {
        contains: name,
      },
      email: {
        contains: email,
      },
    };

    return prisma.user.findMany({
      where,
      skip,
      take,
      select: this.select,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}
