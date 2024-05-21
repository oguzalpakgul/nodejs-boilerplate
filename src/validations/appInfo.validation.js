import Joi from 'joi';

const createAppInfo = {
  body: Joi.object().keys({
    os: Joi.string(),
    version: Joi.string().required(),
    update_type: Joi.number().required(),
  }),
};

const getByIdAppInfo = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

const getAllAppInfo = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateAppInfo = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
  body: Joi.object()
    .keys({
      os: Joi.string(),
      version: Joi.string().required(),
      update_type: Joi.number().required(),
    })
    .min(1),
};

const deleteAppInfo = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

export default { createAppInfo, getByIdAppInfo, getAllAppInfo, updateAppInfo, deleteAppInfo };
