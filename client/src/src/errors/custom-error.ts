const StatusCodes = {
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
};

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOTFOUND);
  }
}

export class UnAuthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
export class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
