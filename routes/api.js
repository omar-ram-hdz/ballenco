import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { CardController } from "../controllers/cards.js";
import { MotionController } from "../controllers/motions.js";
import { UserModel } from "../models/users.js";
import { CardsModel } from "../models/cards.js";
import { MotionsModel } from "../models/motions.js";

export const createAPIRouter = () => {
  const userController = new UserController({ userModel: UserModel });
  const cardController = new CardController({ cardModel: CardsModel });
  const motionController = new MotionController({ motionModel: MotionsModel });
  const router = Router();

  router.get("/user/:id", userController.getDataById);
  router.get("/user/:mail/:pass", userController.getData);
  router.post("/user", userController.create);
  router.delete("/user/:id", userController.delete);
  router.patch("/user/:id", userController.update);
  router.post("/user/:id", userController.updatePIN);
  router.get("/user/validate/:id/:nip", userController.updatePIN);

  router.get("/cards/:user", cardController.getAll); //
  router.post("/card/", cardController.create); //
  router.get("/card/:id", cardController.get); //
  router.patch("/card/active/:id", cardController.disable);
  router.delete("/card/:id/:user", cardController.delete);

  router.post("/motions/", motionController.create);
  router.get("/motions/:origen/:min", motionController.get);
  router.delete("/motions/:id", motionController.delete);
  return router;
};
