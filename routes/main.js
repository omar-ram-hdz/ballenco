import { Router } from "express";
import fs from "fs";

export const createRouter = () => {
  const mainRouter = Router();

  mainRouter.use((req, res) => {
    fs.readFile("index.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error interno del servidor");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  });

  return mainRouter;
};
