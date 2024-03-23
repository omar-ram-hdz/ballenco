import { Router } from "express";
import { createAPIRouter } from "./api.js";
import { createPublicRouter } from "./public.js";
export const createRouter = () => {
  const mainRouter = Router();
  const apiRouter = createAPIRouter();
  const publicRouter = createPublicRouter();
  mainRouter.use("/", publicRouter);
  mainRouter.use("/api", apiRouter);
  mainRouter.use((req, res) => {
    res.render("404");
  });

  return mainRouter;
};
