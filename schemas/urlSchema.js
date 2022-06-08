import joi from "joi";

const urlSchema = joi.object({
  email: joi.string().uri().required(),
});

export default urlSchema;
