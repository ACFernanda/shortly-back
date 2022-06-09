import idSchema from "../schemas/idSchema.js";

export function idValidator(req, res, next) {
  const id = req.params;
  const validation = idSchema.validate(id);
  if (validation.error) {
    return res.status(404).send(validation.error.details);
  }

  next();
}
