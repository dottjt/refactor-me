import Joi from 'joi';

export const productIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export const productIdAndOptionIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  productOptionId: Joi.string().guid({ version: 'uuidv4' }).required(),
});