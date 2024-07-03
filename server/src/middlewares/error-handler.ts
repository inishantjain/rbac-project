import { CustomError } from "../errors/custom-error";
import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { MongoError } from "mongodb";
import { ZodError } from "zod";

export const errorHandlerMiddleware = (
  err: CustomError | MongooseError | MongoError | Error | ZodError<any>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomError;

  if (err instanceof CustomError) {
    customError = err;
  } else if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    customError = new CustomError(messages.join(", "), 400);
  } else if (err instanceof MongooseError.CastError) {
    customError = new CustomError(`No item found for ${err.value}`, 404);
  } else if ((err as MongoError).code === 11000) {
    customError = new CustomError(`Duplicate value entered for a field which accepts unique values`, 400);
  } else if (err instanceof ZodError) {
    const messages = err.errors.map((e) => {
      if (e.code === "invalid_type") return e.message + " " + e.path; //returns required only when field is undefined, hence adding path here
      return e.message;
    });
    customError = new CustomError(messages.join(", "), 400);
  } else {
    customError = new CustomError(err.message || "Something went wrong", 500);
  }

  console.error(err); // log the error for debugging

  return res.status(customError.statusCode).json({
    code: customError.statusCode,
    message: customError.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development
  });
};
