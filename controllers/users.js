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

    return res.json({ message: "User deleted" });
  };
  update = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedUser = await this.movieModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedMovie);
  };

  getData = async (req, res) => {
    const result = validatePartialUser(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.message);
    }
    const data = await this.userModel.getDataUser({ input: result.data });

    return res.status(300).json(data);
  };
}
