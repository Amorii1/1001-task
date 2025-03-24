import { NextFunction, Request, Response } from "express";
import { getRedis } from "../utils/redisClient";
import { decodeToken, TokenData } from "../utils/tokenHandler";
import { InvalidTokenError, TokenRequiredError } from "../utils/customError";

export const authHandler = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) throw new TokenRequiredError();

      //authintication
      const decoded = decodeToken(req.headers.authorization);
      if (!decoded) throw new InvalidTokenError();
      const decodedData = decoded.data as TokenData;

      //session validation for invalidation jwt tokens, which are stateless and not in redis control.
      const sessionId = await getRedis(decodedData.id);
      if (!sessionId || sessionId !== decodedData.sessionId)
        throw new InvalidTokenError();

      // Response modification
      res.locals.userId = decodedData.id;
      res.locals.tokenData = decodedData;
    } catch (error) {
      next(error);
    }

    next();
  };
};
