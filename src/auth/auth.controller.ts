import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import bcrypt from "bcrypt";
import { LoginDto, RefreshTokenDto, RegisterDto } from "./auth.dto";
import { UserService } from "../user/user.service";
import {
  AlreadyExistsError,
  InvalidCredentialsError,
  InvalidTokenError,
} from "../utils/customError";
import { getRedis, removeRedis, setRedis } from "../utils/redisClient";
import {
  decodeRefreshToken,
  generateTokens,
  TokenData,
} from "../utils/tokenHandler";
import { randomBytes } from "crypto";

export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  register = async (req: Request, res: Response) => {
    let data: RegisterDto = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new AlreadyExistsError();
    }

    const user = await this.authService.register(data);

    let sessionId;
    sessionId = randomBytes(16).toString("hex");

    await setRedis(user.id, sessionId);

    res.status(201).json({
      ...generateTokens({
        id: user.id,
        sessionId,
      }),
      user,
    });
  };

  login = async (req: Request, res: Response) => {
    const data: LoginDto = req.body;
    let existingUser = await this.userService.getUserByEmail(data.email);
    if (!existingUser) throw new InvalidCredentialsError();

    const passwordMatch = await bcrypt.compare(
      data.password,
      existingUser.password
    );
    if (!passwordMatch) throw new InvalidCredentialsError();

    const { password, ...user } = existingUser;

    await removeRedis(user.id);

    let sessionId;
    sessionId = randomBytes(16).toString("hex");

    await setRedis(user.id, sessionId);

    res.status(200).json({
      ...generateTokens({
        id: user.id,
        sessionId,
      }),
      user,
    });
  };

  logout = async (req: Request, res: Response) => {
    const userId = res.locals.tokenData.id;

    // Remove session from Redis
    await removeRedis(userId);

    res.status(200).json({ message: "Logged out successfully" });
  };

  //verify otp system with redis
  //change password -> send otp -> verify otp -> change password -> invalidate all tokens ( sessions )

  refreshToken = async (req: Request, res: Response) => {
    const data: RefreshTokenDto = req.body;
    const decoded = decodeRefreshToken(data.refreshToken);
    if (!decoded) throw new InvalidTokenError();
    const decodedData = decoded.data as TokenData;

    let sessionId = await getRedis(decodedData.id);
    if (!sessionId || sessionId !== decodedData.sessionId)
      throw new InvalidTokenError();

    // Invalidate the old session
    await removeRedis(decodedData.id);

    // Generate new session
    sessionId = randomBytes(16).toString("hex");
    await setRedis(decodedData.id, sessionId);
    decodedData.sessionId = sessionId;

    res.status(200).json(generateTokens(decodedData));
  };
}
