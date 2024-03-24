import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";

const conn = await createMyOwnConnection();

export class CardsModel {
  static async create({ input }) {
    const { numero, cvv, vencimiento, usuario } = input;
    const uuid = await getUUID(conn);

    try {
      await conn.query(
        `INSERT INTO cards(id,numero,cvv,vencimiento,usuario) VALUES(UUID_TO_BIN('${uuid}'), AES_ENCRYPT(?,'${SUPER_KEY}'), AES_ENCRYPT(?,'${SUPER_KEY}'),?,UUID_TO_BIN(?)  );`,
        [numero, cvv, vencimiento, usuario]
      );
    } catch (err) {
      throw new Error(`Error creating card from user: ${usuario}`);
    }
    return true;
  }
  static async delete({ uuid, user }) {
    try {
      await conn.query(
        `DELETE FROM cards WHERE id = UUID_TO_BIN(?) AND user = UUID_TO_BIN(?);`,
        [uuid, usuario]
      );
    } catch (err) {
      throw new Error(`Error deleting a card from user: ${usuario} `);
    }
    return true;
  }
  static async deleteAllOfUser({ user }) {
    try {
      await conn.query(`DELETE FROM cards WHERE user = UUID_TO_BIN(?);`, [
        user,
      ]);
    } catch (err) {
      throw new Error(`Error deleting all cards from user: ${user}`);
    }

    return true;
  }
  static async getCards({ user }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT AES_DECRYPT(numero,'${SUPER_KEY}'),vencimiento, saldo,activa FROM cards WHERE usuario = UUID_TO_BIN(?);`,
        [user]
      );
    } catch (err) {
      throw new Error(`Error getting cards from user: ${user}`);
    }
    return data[0];
  }
}
