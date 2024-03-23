import { createMyOwnConnection, SUPER_KEY, getUUID } from "./default.js";

const conn = createMyOwnConnection();

export class MotionsModel {
  static async create({ origin, des, monto }) {
    const uuid = getUUID(conn);
    let date = new Date();
    const currentTime = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    try {
      await conn.query(
        `INSERT INTO movimientos(id, origen,destino,fecha,monto) VALUES(UUID_TO_BIN('${uuid}'),UUID_TO_BIN('${origin}'), UUID_TO_BIN('${des}'),?  );`,
        [monto]
      );
    } catch (err) {
      throw new Error("Error on transaction");
    }

    return true;
  }
  static async delete({ uuid }) {
    try {
      await conn.query(`DELETE FROM movimientos WHERE id = UUID_TO_BIN(?);`, [
        uuid,
      ]);
    } catch (err) {
      throw new Error("ERROR on deleting transaction");
    }

    return true;
  }
  static async get({ origen, min }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(destino) destino, fecha,monto FROM movimientos WHERE origen = UUID_TO_BIN(?) LIMIT ?,10;`,
        [origen, min]
      );
    } catch (err) {
      throw new Error("Error getting transactions");
    }

    return data[0];
  }
}
