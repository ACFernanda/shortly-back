import { Router } from "express";
import { signUp } from "./../controllers/authController.js";
// import { signIn } from "./../controllers/authController.js";
import { newUserValidator } from "../middlewares/newUserValidator.js";

const authRouter = Router();

authRouter.post("/signup", newUserValidator, signUp);

// authRouter.post("/signin", signIn);

export default authRouter;
