import { NextFunction, Request, Response } from "express";
import { errorTypes, NotFoundError } from "../utils/customError";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    console.log(err);

    return res
      .status(errorTypes.notFoundError.status)
      .send({ error: errorTypes.notFoundError.code });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(err);

    if (err.code === "P2002") {
      return res
        .status(errorTypes.alreadyExistsError.status)
        .send({ error: errorTypes.alreadyExistsError.code });
    } else if (err.code === "P2005") {
      return res
        .status(errorTypes.invalidInput.status)
        .send({ error: errorTypes.invalidInput.code });
    } else if (err.code === "P2025") {
      return res
        .status(errorTypes.notFoundError.status)
        .send({ error: errorTypes.notFoundError.code });
    } else if (err.code === "P2003") {
      return res
        .status(errorTypes.invalidInput.status)
        .send({ error: errorTypes.invalidInput.code });
    }
  }

  if (err) {
    console.log(err);

    return res
      .status(err.status)
      .send({ error: err.code, ...{ details: err.details } });
  }
  next();
};
