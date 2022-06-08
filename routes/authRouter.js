import { Router } from "express";
import { signUp, signIn } from "./../controllers/authController.js";
import { newUserValidator } from "../middlewares/newUserValidator.js";
import { signInValidator } from "../middlewares/signInValidator.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, signUp);

authRouter.post("/signin", signInValidator, signIn);

export default authRouter;
