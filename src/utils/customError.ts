export const errorTypes = {
  invalidInput: { status: 400, code: "invalidInput" },
  alreadyExistsError: { status: 400, code: "alreadyExists" },
  notFoundError: { status: 404, code: "notFound" },
  serverError: { status: 500, code: "serverError" },
  redisError: { status: 500, code: "redisError" },
  invalidCredentials: { status: 400, code: "invalidCredentials" },
  unauthorized: { status: 401, code: "unauthorized" },
  tokenRequired: { status: 401, code: "tokenRequired" },
  invalidToken: { status: 401, code: "invalidToken" },
  notApproved: { status: 401, code: "notApproved" },
};

export class InputError extends Error {
  constructor(
    public status: number = errorTypes.invalidInput.status,
    public code: string = errorTypes.invalidInput.code,
    public details?: any
  ) {
    super();
  }
}

export class AlreadyExistsError extends Error {
  constructor(
    public status: number = errorTypes.alreadyExistsError.status,
    public code: string = errorTypes.alreadyExistsError.code,
    public details?: any
  ) {
    super();
  }
}

export class NotFoundError extends Error {
  constructor(
    public status: number = errorTypes.notFoundError.status,
    public code: string = errorTypes.notFoundError.code,
    public details?: any
  ) {
    super();
  }
}

export class ServerError extends Error {
  constructor(
    public status: number = errorTypes.serverError.status,
    public code: string = errorTypes.serverError.code,
    public details?: any
  ) {
    super();
  }
}

export class RedisError extends Error {
  constructor(
    public status: number = errorTypes.redisError.status,
    public code: string = errorTypes.redisError.code,
    public details?: any
  ) {
    super();
  }
}

export class InvalidCredentialsError extends Error {
  constructor(
    public status: number = errorTypes.invalidCredentials.status,
    public code: string = errorTypes.invalidCredentials.code,
    public details?: any
  ) {
    super();
  }
}
export class NotApprovedError extends Error {
  constructor(
    public status: number = errorTypes.notApproved.status,
    public code: string = errorTypes.notApproved.code,
    public details?: any
  ) {
    super();
  }
}

export class UnauthorizedError extends Error {
  constructor(
    public status: number = errorTypes.unauthorized.status,
    public code: string = errorTypes.unauthorized.code,
    public details?: any
  ) {
    super();
  }
}
export class TokenRequiredError extends Error {
  constructor(
    public status: number = errorTypes.tokenRequired.status,
    public code: string = errorTypes.tokenRequired.code,
    public details?: any
  ) {
    super();
  }
}

export class InvalidTokenError extends Error {
  constructor(
    public status: number = errorTypes.invalidToken.status,
    public code: string = errorTypes.invalidToken.code,
    public details?: any
  ) {
    super();
  }
}
