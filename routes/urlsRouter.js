import { Router } from "express";
import {
  postUrl,
  getUrl,
  openUrl,
  // deleteUrl,
} from "./../controllers/urlsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { urlValidator } from "../middlewares/urlValidator.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenValidator, urlValidator, postUrl);

urlsRouter.get("/urls/:id", getUrl);

urlsRouter.get("/urls/open/:shortUrl", openUrl);

// urlsRouter.delete("/urls/:id", deleteUrl);

export default urlsRouter;
