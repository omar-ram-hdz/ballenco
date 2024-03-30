import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";
import { CardsModel } from "./cards.js";

const conn = await createMyOwnConnection();

export class UserModel {
  static async getDataUser({ input }) {
    const { mail, pass } = input;
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id, nombre,year_birthday, mail FROM users WHERE mail = ? AND pass = AES_ENCRYPT(?,'${SUPER_KEY}');`,
        [mail, pass]
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error getting user");
    }
    if (data.length === 0) {
      console.log(err);
      throw new Error("Error,  invalid information");
    } else {
      return data[0];
    }
  }
  static async delete({ id }) {
    try {
      await CardsModel.deleteAllOfUser({ user: id });
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting cards user");
    }
    try {
      await conn.query(`DELETE FROM users WHERE id = UUID_TO_BIN(?);`, [id]);
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting user");
    }

    return true;
  }
  static async create({ input }) {
    const { nombre, year, mail, pass } = input;
    const uuid = await getUUID(conn);
    try {
      await conn.query(
        `INSERT INTO users(id,nombre,year_birthday,mail,pass) VALUES( UUID_TO_BIN('${uuid}'),?,?,?, AES_ENCRYPT(?,'${SUPER_KEY}') );`,
        [nombre, year, mail, pass]
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error creating user");
    }

    return uuid;
  }
  static async update({ id, input }) {
    const { nombre, year, mail } = input;

    try {
      await conn.query(
        `UPDATE users SET nombre = ?,year_birthday = ?,mail = ? WHERE id = UUID_TO_BIN(?);`,
        [nombre, year, mail, id]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error updating user: ${id}`);
    }

    return true;
  }
  static async getDataById({ id }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id, nombre,year_birthday, mail FROM users WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error getting user by id: ${id}`);
    }

    return data[0];
  }
  static async updatePIN({ input }) {
    const { user, nip } = input;
    try {
      await conn.query(`UPDATE users SET nip=? WHERE id = UUID_TO_BIN(?);`, [
        nip,
        user,
      ]);
    } catch (err) {
      console.log(err);
      throw new Error(`Error adding nip: ${nip} at user : ${user}`);
    }
    return true;
  }
  static async validatePIN({ pin, user }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT nip FROM users WHERE id = UUID_TO_BIN(?);`,
        [user]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error getting nip from user : ${user}`);
    }
    return data[0].nip == pin;
  }
}
