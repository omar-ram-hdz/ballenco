import { Router } from "express";

export const createRouter = () => {
  const mainRouter = Router();

  mainRouter.use((req, res) => {
    res.sendFile("../web/views/404.html");
  });

  return mainRouter;
};
