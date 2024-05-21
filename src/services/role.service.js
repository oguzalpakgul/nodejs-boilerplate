import httpStatus from 'http-status';
import { Role } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { sequelizeFilter } from '../utils/sequelizeFilter.js';

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */
const createRole = async (roleBody) => {
  return Role.create(roleBody);
};

/**
 * Query for role
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(DESC|ASC)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{ results: Role[], paging: { page: number, limit: number, totalPages: number, totalResults: number } }>}
 */
const queryRole = async (filter, options) => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  if (Object.keys(filter).length !== 0) {
    filter = sequelizeFilter(filter);
  } else {
    filter = {};
  }
  const { rows, count } = await Role.findAndCountAll({
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
 * Get role by id
 * @param {uuidv4} id
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return Role.findByPk(id);
};

/**
 * Get role by id
 * @param {string} name
 * @returns {Promise<Role>}
 */
const getRoleByName = async (name) => {
  return Role.findOne({ where: { name: name } });
};

/**
 * Update role by id
 * @param {uuidv4} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  await role.update(updateBody);
  return role;
};

/**
 * Delete role by id
 * @param {uuidv4} roleId
 * @returns {Promise<Role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.destroy();
  return role;
};

export default { createRole, queryRole, getRoleById, getRoleByName, updateRoleById, deleteRoleById };
