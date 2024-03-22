import { Router } from "express";
import fs from "fs";

export const createRouter = () => {
  const mainRouter = Router();

  mainRouter.use((req, res) => {
    res.render("404");
  });

  return mainRouter;
};
