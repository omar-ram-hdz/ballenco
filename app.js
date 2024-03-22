import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors";
import path from "path";

const app = express();
const publicDirection = express.static(path.join(__dirname, "web", "public"));

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");
app.use(publicDirection);

export default app;