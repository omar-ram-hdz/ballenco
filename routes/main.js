import { Router } from "express";
import { readFile } from "../helpers/readFile.mjs";

export const createRouter = () => {
  const mainRouter = Router();

  mainRouter.use((req, res) => {
    let file = readFile("../views/404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.send(file);
    res.end();
  });

  return mainRouter;
};
