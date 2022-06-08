import joi from "joi";

const newUserSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.valid(joi.ref("password")).required(),
});

export default newUserSchema;
