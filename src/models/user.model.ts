import { Joi } from "celebrate";

export const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
