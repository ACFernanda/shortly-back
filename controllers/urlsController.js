import db from "./../db.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;

  const shortenURL = nanoid(8);

  try {
    await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
      [userId, url, shortenURL]
    );

    res.status(201).send({ shortUrl: shortenURL });
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao encurtar URL!");
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id=$1`,
      [id]
    );
    const url = result.rows[0];

    if (!url) {
      return res.sendStatus(404);
    }

    res.status(200).send(url);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao buscar a URL!");
  }
}
