import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

async function seed() {
  const prisma = new PrismaClient();

  const transactionData = await prisma.$transaction(async (tx) => {
    //START: user
    const user = await tx.user.create({
      data: {
        name: "omar",
        email: "omar@1001.tv",
        password: hashSync("123456", 10),
      },
    });
    //END: user
  });
}

seed()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
  });
