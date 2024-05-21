import Joi from 'joi';

const filterInput = Joi.array().items(
  Joi.object({
    fields: Joi.array().items(Joi.string().valid('name')).required(),
    condition: Joi.string().valid('==', '!=', '<', '<=', '>', '>=', '%=', '=%', '%=%').required(),
    values: Joi.array().items(Joi.string()).required(),
  })
);

export default { filterInput };
