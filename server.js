import { createApp } from "./app.js";
import dotenv from "dotenv";

const log = console.log;
const app = createApp();

if (process.env.environment !== "production") {
  dotenv.config();
}
PORT = process.env.PORT ?? 3000;
HOST = process.env.PORT ?? "localhost";

app.listen(PORT, HOST, () => {
  log(`Servidor escuchando en el puerto http://${HOST}:${PORT}/`);
});
