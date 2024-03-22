import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createRouter } from "./routes/main.js";
import path from "path";

export const createApp = () => {
  const app = express();
  const publicDirection = express.static("./web/public");

  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  app.use(publicDirection);
  app.use("/", createRouter());
  return app;
};
