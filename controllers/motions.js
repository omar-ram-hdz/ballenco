import { validateMotions } from "../schemas/motions.js";
export class MotionController {
  constructor({ motionModel }) {
    this.motionModel = motionModel;
  }

  create = async (req, res) => {
    const result = validateMotions(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newCard = await this.motionModel.create({ input: result.data });

    return res.status(201).json(newCard);
  };
  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.motionModel.delete({ uuid: id });
    if (result === false) {
      return res.status(404).json({ message: "Motion not found" });
    }

    return res.json({ message: "Motion deleted" });
  };
  get = async (req, res) => {
    const { origen, min } = req.params;
    const result = await this.motionModel.get({ origen, min });
    if (result === false) {
      return res.status(400).json({ message: "Transactions not found" });
    }

    return res.status(300).json(result);
  };
}
