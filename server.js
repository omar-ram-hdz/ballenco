import app from "./app";
import dotenv from "dotenv";

const log = console.log;

if (process.env.environment !== "production") {
  dotenv.config();
}
PORT = process.env.PORT ?? 3000;
HOST = process.env.PORT ?? "localhost";

app.listen(PORT, HOST, () => {
  log(`Servidor escuchando en el puerto http://${HOST}:${PORT}/`);
});
