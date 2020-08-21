import Joi from 'joi';

export const productIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export const productOptionIdAndProductIdSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  productOptionId: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export const fullProductSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  deliveryPrice: Joi.number().required(),
});

export const fullProductOptionsSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  isNew: Joi.boolean().required(),
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
});