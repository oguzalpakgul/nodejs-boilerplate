import httpStatus from 'http-status';
import { Module } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { sequelizeFilter } from '../utils/sequelizeFilter.js';

/**
 * Create a module
 * @param {Object} moduleBody
 * @returns {Promise<Module>}
 */
const createModule = async (moduleBody) => {
  return Module.create(moduleBody);
};

/**
 * Query for module
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(DESC|ASC)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{ results: Module[], paging: { page: number, limit: number, totalPages: number, totalResults: number } }>}
 */
const queryModule = async (filter, options) => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  if (Object.keys(filter).length !== 0) {
    filter = sequelizeFilter(filter);
  } else {
    filter = {};
  }
  const { rows, count } = await Module.findAndCountAll({
    where: filter,
    order: options.sortBy ? [options.sortBy.split(':')] : [],
    limit: limit,
    offset: offset,
  });

  const totalPages = Math.ceil(count / limit);

  return {
    results: rows,
    paging: {
      page: page,
      limit: limit,
      totalPages: totalPages,
      totalResults: count,
    },
  };
};

/**
 * Get module by id
 * @param {uuidv4} id
 * @returns {Promise<Module>}
 */
const getModuleById = async (id) => {
  return Module.findByPk(id);
};

/**
 * Get module by name
 * @param {string} name
 * @returns {Promise<Module>}
 */
const getModuleByName = async (name) => {
  return Module.findOne({ where: { name: name } });
};

/**
 * Update module by id
 * @param {uuidv4} moduleId
 * @param {Object} updateBody
 * @returns {Promise<Module>}
 */
const updateModuleById = async (moduleId, updateBody) => {
  const module = await getModuleById(moduleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }

  await module.update(updateBody);
  return module;
};

/**
 * Delete module by id
 * @param {uuidv4} moduleId
 * @returns {Promise<Module>}
 */
const deleteModuleById = async (moduleId) => {
  const module = await getModuleById(moduleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  await module.destroy();
  return module;
};

export default { createModule, queryModule, getModuleById, getModuleByName, updateModuleById, deleteModuleById };
