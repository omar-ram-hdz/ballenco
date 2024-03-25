import { createMyOwnConnection, getUUID, SUPER_KEY } from "./default.js";

const conn = await createMyOwnConnection();

export class CardsModel {
  static async create({ input }) {
    const { numero, cvv, year, month, user } = input;
    const uuid = await getUUID(conn);

    try {
      await conn.query(
        `INSERT INTO cards(id,numero,cvv,year_expiration,month_expiration, usuario) VALUES(UUID_TO_BIN('${uuid}'), AES_ENCRYPT(?,'${SUPER_KEY}'), AES_ENCRYPT(?,'${SUPER_KEY}'),?,?,UUID_TO_BIN(?)  );`,
        [numero, cvv, year, month, user]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error creating card from user: ${user}`);
    }
    return true;
  }
  static async delete({ uuid, user }) {
    try {
      await conn.query(
        `DELETE FROM cards WHERE id = UUID_TO_BIN(?) AND user = UUID_TO_BIN(?);`,
        [uuid, user]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error deleting a card from user: ${user} `);
    }
    return true;
  }
  static async deleteAllOfUser({ user }) {
    try {
      await conn.query(`DELETE FROM cards WHERE usuario = UUID_TO_BIN(?);`, [
        user,
      ]);
    } catch (err) {
      console.log(err);
      throw new Error(`Error deleting all cards from user: ${user}`);
    }

    return true;
  }
  static async getCards({ user }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id,CAST(AES_DECRYPT(numero,'${SUPER_KEY}') AS CHAR) numero,year_expiration,month_expiration, saldo,activa FROM cards WHERE usuario = UUID_TO_BIN(?);`,
        [user]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error getting cards from user: ${user}`);
    }
    return data;
  }

  static async update({ input }) {
    const { id, newMoney } = input;
    try {
      await conn.query(
        `UPDATE cards SET saldo = ? WHERE id = UUID_TO_BIN(?);`,
        [newMoney, id]
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error on update card money");
    }
  }

  static async get({ id }) {
    let data;
    try {
      [data] = await conn.query(
        `SELECT BIN_TO_UUID(id) id, CAST(AES_DECRYPT(numero,'${SUPER_KEY}') AS CHAR) numero,CAST(AES_DECRYPT(cvv,'${SUPER_KEY}') AS CHAR) cvv,year_expiration,month_expiration saldo,activa FROM cards WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
    } catch (err) {
      console.log(err);
      throw new Error(`Error getting cards by id: ${id} `);
    }

    return data[0];
  }
}
