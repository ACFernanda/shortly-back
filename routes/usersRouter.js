import { Router } from "express";
import { getUser, getTopUsers } from "./../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/ranking", getTopUsers);

usersRouter.get("/users/:id", getUser);

export default usersRouter;
