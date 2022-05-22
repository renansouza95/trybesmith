import Joi from 'joi';

export const UserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const ProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});