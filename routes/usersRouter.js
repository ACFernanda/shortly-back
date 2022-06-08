import { Router } from "express";
import { getUser, getTopUsers } from "./../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUser);

usersRouter.get("/users/ranking", getTopUsers);

export default usersRouter;