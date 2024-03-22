import { Router } from "express";

export const createRouter = () => {
  const mainRouter = Router();

  mainRouter.use((req, res) => {
    res.render("404");
  });

  return mainRouter;
};
