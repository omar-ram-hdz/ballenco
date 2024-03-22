import { Router } from "express";

const mainRouter = Router();

mainRouter.use((req, res) => {
  res.sendFile("../web/views/404.html");
});
