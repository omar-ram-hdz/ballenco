import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import path from "path";

export const createApp = () => {
  const app = express();
  const publicDirection = express.static(path.join(__dirname, "web", "public"));

  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");
  app.use(publicDirection);
  return app;
};
