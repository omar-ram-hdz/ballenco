import { validatePartialUser, validateUser } from "../schemas/users.js";
export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  create = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newUser = await this.userModel.create({ input: result.data });

    return res.status(201).json(newUser);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.userModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted", status: true });
  };
  update = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedUser = await this.userModel.update({
      id,
      input: result.data,
    });

    return res.json({ status: updatedUser });
  };

  getData = async (req, res) => {
    const { mail, pass } = req.params;
    const result = validatePartialUser({ mail, pass });
    if (!result.success) {
      return res.status(400).json(result.error.message);
    }
    const data = await this.userModel.getDataUser({ input: result.data });

    return res.status(201).json({ data });
  };

  getDataById = async (req, res) => {
    const { id } = req.params;
    const result = await this.userModel.getDataById({ id });
    if (result === false) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json({ data: result });
  };
  updatePIN = async (req, res) => {
    const { id } = req.params;
    const { nip } = req.body;
    let str = nip.toString().length;
    if (str > 5 || str < 2) {
      return res.status(404).json({ message: "NIP is not 3 or 4 characters" });
    }
    const result = await this.userModel.updatePIN({
      input: { user: id, pin: nip },
    });
    return res.status(201).json({ status: result });
  };
  validatePIN = async (req, res) => {
    const { id, nip } = req.params;
    let str = nip.toString().length;
    if (str > 5 || str < 2) {
      return res.status(404).json({ message: "NIP is not 3 or 4 characters" });
    }
    const result = await this.userModel.validatePIN({
      input: { user: id, pin: nip },
    });
    return res.status(201).json({ status: result });
  };
}
