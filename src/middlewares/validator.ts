import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { InputError } from "../utils/customError";

export const validator = (InputsObject: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const object = plainToClass(
      InputsObject,
      ["POST", "PUT", "DELETE"].includes(req.method) ? req.body : req.query
    );

    try {
      await validateOrReject(
        object,
        req.method !== "GET"
          ? { forbidNonWhitelisted: true, whitelist: true }
          : {}
      );
    } catch (error) {
      console.log(error);

      next(new InputError(undefined, undefined, error));
    }

    next();
  };
};
