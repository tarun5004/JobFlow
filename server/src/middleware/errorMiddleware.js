import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const notFound = (request, _response, next) => {
  next(
    new ApiError(
      404,
      `Route not found: ${request.method} ${request.originalUrl}`,
    ),
  );
};

const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    request.log.warn({ err: error, statusCode: 400 }, "Validation failed");

    return response.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error.name === "CastError") {
    request.log.warn({ err: error, statusCode: 400 }, "Invalid resource ID");

    return response.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });
  }

  if (error.code === 11000) {
    request.log.warn({ err: error, statusCode: 409 }, "Duplicate resource");

    return response.status(409).json({
      success: false,
      message: "Resource already exists",
    });
  }

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    statusCode === 500 ? "Internal server error" : error.message;

  const logMethod = statusCode >= 500 ? "error" : "warn";
  request.log[logMethod]({ err: error, statusCode }, "Request failed");

  return response.status(statusCode).json({
    success: false,
    message,
    ...(error.details && { details: error.details }),
  });
};

export { errorHandler, notFound };
