import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { getUser, getTopUsers } from "./../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", tokenValidator, getUser);

usersRouter.get("/ranking", getTopUsers);

export default usersRouter;
