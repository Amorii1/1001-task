export const envData = {
  PORT: parseInt(process.env.PORT || "3000", 10), //decimal
  DEFAULT_PER_PAGE: parseInt(process.env.DEFAULT_PER_PAGE || "10", 10),
  MAX_PER_PAGE: parseInt(process.env.MAX_PER_PAGE || "50", 10),

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "secret",
  ACCESS_TOKEN_EXPIRE_IN: process.env.ACCESS_TOKEN_EXPIRE_IN || "3600",
  REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN || "86400",
  REDIS_EXPIRE_IN: parseInt(process.env.REDIS_EXPIRE_IN || "168", 10),
};
