import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import dbConnect from "./config/db.mjs";
import ApiError from "./utils/apiError.mjs";
import errorMiddleware from "./middlewares/errorMiddleware.mjs";
import mountRoutes from "./Routes/index.mjs";

dotenv.config({ path: "config.env" });

// App configuration
const app = express();
const { PORT } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dbConnect();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mountRoutes(app);
app.all("*", (req, res, next) => {
  next(new ApiError(`${req.originalUrl} is not a valid route`, 400));
});

// Error Handling inside Express
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Error Handling outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
