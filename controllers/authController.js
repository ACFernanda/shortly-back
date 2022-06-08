import db from "./../db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rowCount > 0) {
      return res.status(409).send("Email cadastrado anteriormente.");
    }

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao registrar usuário!");
  }
}
