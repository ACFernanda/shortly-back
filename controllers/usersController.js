import db from "./../db.js";

export async function getUser(req, res) {
  const { id } = req.params;

  try {
    const resultUser = await db.query(
      `
      SELECT users.id, users.name, SUM(urls.visits) AS "visitCount" FROM users
      JOIN urls ON users.id = urls."userId"
      WHERE users.id = $1
      GROUP BY users.id`,
      [id]
    );
    if (!resultUser.rows.length) {
      return res.sendStatus(404);
    }
    const user = resultUser.rows[0];

    const resultShortenedUrls = await db.query(
      `
      SELECT id, "shortUrl", url, visits AS "visitCount"
      FROM urls
      WHERE "userId"=$1`,
      [id]
    );
    const shortenedUrls = resultShortenedUrls.rows;

    const completeUser = { ...user, shortenedUrls };

    res.status(200).send(completeUser);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao buscar usuário!");
  }
}

export async function getTopUsers(req, res) {
  try {
    const result = await db.query(
      `
      SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(COALESCE(urls.visits, 0)) AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;
    `
    );
    const topUsers = result.rows;

    res.status(200).send(topUsers);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao buscar usuários!");
  }
}
