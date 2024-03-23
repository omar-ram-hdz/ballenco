import { validateCard } from "../schemas/cards.js";
export class CardController {
  constructor({ cardModel }) {
    this.cardModel = cardModel;
  }

  create = async (req, res) => {
    const result = validateCard(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newCard = await this.cardModel.create({ input: result.data });
    res.status(201).json(newCard);
  };
  delete = async (req, res) => {
    const { id, user } = req.params;
    const result = await this.cardModel.delete({ uuid: id, user });
    if (result === false) {
      return res.status(400).json({ message: "Card not found" });
    }

    return res.json({ message: "Card deleted" });
  };
  get = async (req, res) => {
    const { user } = req.params;
    const result = await this.cardModel.getCards({ user });
    if (result === false) {
      return res.status(400).json({ message: "Cards not found" });
    }

    return res.status(300).json(result);
  };
}
