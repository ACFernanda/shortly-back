import db from "./../db.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;

  const shortenURL = nanoid(url, 8);

  try {
    await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortenURL]
    );
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao encurtar URL!");
  }
}
