import dotenv from "dotenv";
import express from "express";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import videoRoutes from "./video/video.routes";
import { queryParser } from "express-query-parser";
import { paginationParamsHandler } from "./middlewares/paginationParamsHandler";
import { errorHandler } from "./middlewares/errorHandler";
import { connectRedis } from "./utils/redisClient";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());
connectRedis();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);
app.use(paginationParamsHandler);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
