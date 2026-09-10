import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import pinoHttp from "pino-http";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import sendSuccess from "./utils/sendResponse.js";

const app = express();
const logger = pino();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(pinoHttp({ logger }));

app.get("/api/health", (_request, response) => {
  return sendSuccess(response, {
    message: "Server is healthy",
  });
});

// These must stay after every API route.
app.use(notFound);
app.use(errorHandler);

export { logger };
export default app;
