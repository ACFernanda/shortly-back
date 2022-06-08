import { Router } from "express";
import {
  shortenUrl,
  getUserUrls,
  redirectToUrl,
  deleteUrl,
} from "./../controllers/urlsController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", shortenUrl);

urlsRouter.get("/urls/:id", getUserUrls);

urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);

urlsRouter.delete("/urls/:id", deleteUrl);

export default urlsRouter;
