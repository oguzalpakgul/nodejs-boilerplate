import Joi from 'joi';

const createModule = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getByIdModule = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

const getAllModule = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateModule = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .min(1),
};

const deleteModule = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

export default { createModule, getByIdModule, getAllModule, updateModule, deleteModule };
