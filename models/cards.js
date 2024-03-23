import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";

const conn = createMyOwnConnection();

export class CardsModel {
  static async create({ input }) {
    const { numero, cvv, vencimiento, usuario } = input;
    const uuid = getUUID(conn);

    try {
      await conn.query(
        `INSERT INTO cards(id,numero,cvv,vencimiento,usuario) VALUES(UUID_TO_BIN('${uuid}'), AES_ENCRYPT('${numero}','${SUPER_KEY}'), AES_ENCRYPT('${cvv}','${SUPER_KEY}'),?,UUID_TO_BIN('${usuario}')  );`,
        [vencimiento]
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
}
