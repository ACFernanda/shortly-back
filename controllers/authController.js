import db from "./../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [
        user.id,
        token,
      ]);

      res.send(token);
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao logar!");
  }
}
