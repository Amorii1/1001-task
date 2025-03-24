import jwt from "jsonwebtoken";
import { envData } from "./envData";


export interface TokenData {
  id: string;
  sessionId?: string;
}

export const generateTokens = (data: TokenData) => {
  const accessToken = jwt.sign({ data }, envData.ACCESS_TOKEN_SECRET, {
    expiresIn: parseInt(envData.ACCESS_TOKEN_EXPIRE_IN as string, 10), //decimal
  });

  const refreshToken = jwt.sign({ data }, envData.REFRESH_TOKEN_SECRET, {
    notBefore: parseInt(envData.ACCESS_TOKEN_EXPIRE_IN as string, 10),
    expiresIn: parseInt(envData.REFRESH_TOKEN_EXPIRE_IN as string, 10),
  });

  return { accessToken, refreshToken };
};

export const decodeToken = (token: string) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, envData.ACCESS_TOKEN_SECRET);
    return decoded as any;
  } catch (error) {
    return null;
  }
};

export const decodeRefreshToken = (token: string) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, envData.REFRESH_TOKEN_SECRET);
    return decoded as any;
  } catch (error) {
    return null;
  }
};
