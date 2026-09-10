import "dotenv/config";
import app, { logger } from "./app.js";
import connectDB from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    const connection = await connectDB();

    logger.info(
      { database: connection.name },
      "MongoDB connected",
    );

    const server = app.listen(port, () => {
      logger.info({ port }, "JobFlow API started");
    });

    server.on("error", (error) => {
      logger.error({ err: error }, "Server failed to start");
      process.exit(1);
    });
  } catch (error) {
    logger.fatal({ err: error }, "Application failed to start");
    process.exit(1);
  }
};

startServer();