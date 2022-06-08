import signInSchema from "../schemas/signInSchema.js";

export function signInValidator(req, res, next) {
  const login = req.body;
  const validation = signInSchema.validate(login);
  if (validation.error) {
    return res.status(422).send(validation.error.details);
  }

  next();
}
