import httpStatus from 'http-status';
import { Permission } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { sequelizeFilter } from '../utils/sequelizeFilter.js';

/**
 * Create a permission
 * @param {Object} permissionBody
 * @returns {Promise<Permission>}
 */
const createPermission = async (permissionBody) => {
  return Permission.create(permissionBody);
};

/**
 * Query for permission
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(DESC|ASC)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{ results: Permission[], paging: { page: number, limit: number, totalPages: number, totalResults: number } }>}
 */
const queryPermission = async (filter, options) => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  if (Object.keys(filter).length !== 0) {
    filter = sequelizeFilter(filter);
  } else {
    filter = {};
  }
  const { rows, count } = await Permission.findAndCountAll({
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
 * Get permission by id
 * @param {uuidv4} id
 * @returns {Promise<Permission>}
 */
const getPermissionById = async (id) => {
  return Permission.findByPk(id);
};

/**
 * Get permission by id
 * @param {uuidv4} id
 * @returns {Promise<Permission>}
 */
const getPermissionByRoleModule = async (roleId, moduleId) => {
  return Permission.findOne({ where: { roleId: roleId, moduleId: moduleId } });
};

/**
 * Update permission by id
 * @param {uuidv4} permissionId
 * @param {Object} updateBody
 * @returns {Promise<Permission>}
 */
const updatePermissionById = async (permissionId, updateBody) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }

  await permission.update(updateBody);
  return permission;
};

/**
 * Delete permission by id
 * @param {uuidv4} permissionId
 * @returns {Promise<Permission>}
 */
const deletePermissionById = async (permissionId) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  await permission.destroy();
  return permission;
};

export default {
  createPermission,
  queryPermission,
  getPermissionById,
  getPermissionByRoleModule,
  updatePermissionById,
  deletePermissionById,
};
