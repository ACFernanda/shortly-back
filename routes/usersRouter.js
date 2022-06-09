import { Router } from "express";
import { getUser } from "./../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUser);

// usersRouter.get("/users/ranking", getTopUsers);

export default usersRouter;
