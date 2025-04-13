import http from "node:http";
import { env } from "./env.ts";
import { logger } from "./utils/logger.ts";
import connectDB from "./db/index.ts";
import { createApp } from "./app/index.ts";

async function main() {
  try {
    // get PORT from env
    const PORT = parseInt(env.PORT as string) ?? 8000;

    // connect to database
    await connectDB();

    // create and start server
    const server = http.createServer(createApp());
    server.listen(PORT, () => {
      logger.info(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    // log error
    logger.error(`Server failed to start: ${error}`);
    // exit process
    process.exit(1);
  }
}

main();

// secondary way to start the server //
// import app from "./app.ts";
// import dotenv from "dotenv";
// import connectDB from "./db/index.ts";
// dotenv.config({
//   path: "./.env",
// });
// const PORT = process.env.PORT || 8000;
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("Mongodb connection error", err);
//     process.exit(1);
//   });