import Joi from 'joi';

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    score: Joi.number().required(),
  }),
};

const getByIdRole = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

const getAllRole = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      score: Joi.number().required(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

export default { createRole, getByIdRole, getAllRole, updateRole, deleteRole };
