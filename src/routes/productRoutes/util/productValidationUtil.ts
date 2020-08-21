import Joi from 'joi';

export const productIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
}).options({ abortEarly: false });

export const productOptionIdAndProductIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  productOptionId: Joi.string().guid({ version: 'uuidv4' }).required(),
}).options({ abortEarly: false });
