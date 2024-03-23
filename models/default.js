import mysql from "mysql2";
import "dotenv/config";

export const createMyOwnConnection = async () => {
  const DEFAULT_CONFIG = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "1234",
    database: "ballenco",
  };
  const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;
  const conn = await mysql.createConnection(connectionString);
  return conn;
};

export const getUUID = async (connection) => {
  let [uuidRes] = await connection.query("SELECT UUID() uuid;");
  const [{ uuid }] = uuidRes;
  return uuid;
};

export const SUPER_KEY = process.env.SUPER_KEY;
