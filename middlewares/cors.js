import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://192.168.1.75:3000",
  "http://localhost:3000",
  "http://localhost:5000",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
