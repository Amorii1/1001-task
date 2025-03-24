import { Request, Response, NextFunction } from "express";

//no need to try catch every async function error handling
//just wrap the function with asyncHandler
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
