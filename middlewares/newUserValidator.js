import newUserSchema from "../schemas/newUserSchema.js";

export function newUserValidator(req, res, next) {
  const newUser = req.body;
  const validation = newUserSchema.validate(newUser);
  if (validation.error) {
    return res.status(422).send(validation.error.details);
  }

  next();
}
