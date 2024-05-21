import Joi from 'joi';

const createPermission = {
  body: Joi.object().keys({
    view: Joi.boolean().required(),
    add: Joi.boolean().required(),
    edit: Joi.boolean().required(),
    delete: Joi.boolean().required(),
    mask: Joi.boolean().required(),
    roleId: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    moduleId: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    status: Joi.number().required(),
  }),
};

const getByIdPermission = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

const getAllPermission = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updatePermission = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
  body: Joi.object()
    .keys({
      view: Joi.boolean().required(),
      add: Joi.boolean().required(),
      edit: Joi.boolean().required(),
      delete: Joi.boolean().required(),
      mask: Joi.boolean().required(),
      roleId: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      moduleId: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      status: Joi.number().required(),
    })
    .min(1),
};

const deletePermission = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: ['uuidv4'],
    }),
  }),
};

export default { createPermission, getByIdPermission, getAllPermission, updatePermission, deletePermission };
