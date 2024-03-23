import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";
import { CardsModel } from "./cards.js";

const conn = createMyOwnConnection();

export class UserModel {
  static async getDataUser({ mail, password }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id, nombre,fecha_nacimiento, mail,nip FROM users WHERE mail = ? AND pass = AES_ENCRYPT('${password}','${SUPER_KEY}');`,
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
  static async delete({ uuid }) {
    try {
      await CardsModel.deleteAllOfUser({ user: uuid });
    } catch (err) {
      throw new Error("Error deleting cards user");
    }
    try {
      await conn.query(`DELETE FROM users WHERE id = UUID_TO_BIN(?);`, [uuid]);
    } catch (err) {
      throw new Error("Error deleting user");
    }

    return true;
  }
  static async create({ input }) {
    const { nombre, fecha_nacimiento, mail, password } = input;
    const uuid = getUUID(conn);

    try {
      await conn.query(
        `INSERT INTO users(id,nombre,fecha_nacimiento,mail,pass) VALUES(UUID_TO_BIN(${uuid}),?,?,?,AES_ENCRYPT('${password}','${SUPER_KEY}'));`,
        [nombre, fecha_nacimiento, mail]
      );
    } catch (err) {
      throw new Error("Error creating user");
    }

    return uuid;
  }
}
