import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";
import { CardsModel } from "./cards.js";

const conn = createMyOwnConnection();

export class UserModel {
  static async getDataUser({ input }) {
    const { mail, pass } = input;
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id, nombre,fecha_nacimiento, mail,nip FROM users WHERE mail = ? AND pass = AES_ENCRYPT('${pass}','${SUPER_KEY}');`,
        [mail]
      );
    } catch (err) {
      throw new Error("Error getting user");
    }
    if (data.length === 0) {
      throw new Error("Error,  invalid information");
    } else {
      return data[0];
    }
  }
  static async delete({ id }) {
    try {
      await CardsModel.deleteAllOfUser({ user: id });
    } catch (err) {
      throw new Error("Error deleting cards user");
    }
    try {
      await conn.query(`DELETE FROM users WHERE id = UUID_TO_BIN(?);`, [id]);
    } catch (err) {
      throw new Error("Error deleting user");
    }

    return true;
  }
  static async create({ input }) {
    const { nombre, fecha_nacimiento, mail, pass } = input;
    const uuid = getUUID(conn);

    try {
      await conn.query(
        `INSERT INTO users(id,nombre,fecha_nacimiento,mail,pass) VALUES(UUID_TO_BIN(${uuid}),?,?,?,AES_ENCRYPT('${pass}','${SUPER_KEY}'));`,
        [nombre, fecha_nacimiento, mail]
      );
    } catch (err) {
      throw new Error("Error creating user");
    }

    return uuid;
  }
  static async update({ id, input }) {
    const { nombre, fecha_nacimiento, mail } = input;

    try {
      await conn.query(
        `UPDATE users SET nombre = ?,fecha_nacimiento = ?,mail = ? WHERE id = UUID_TO_BIN ('${id}')`,
        [nombre, fecha_nacimiento, mail]
      );
    } catch (err) {
      throw new Error(`Error updating user: ${id}`);
    }

    return true;
  }
}
