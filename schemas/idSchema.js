import joi from "joi";

const idSchema = joi.object({
  id: joi.number().integer().required(),
});

export default idSchema;
