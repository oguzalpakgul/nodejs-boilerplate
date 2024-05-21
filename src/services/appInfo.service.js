import httpStatus from 'http-status';
import { AppInfo } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { sequelizeFilter } from '../utils/sequelizeFilter.js';

/**
 * Create a appInfo
 * @param {Object} appInfoBody
 * @returns {Promise<AppInfo>}
 */
const createAppInfo = async (appInfoBody) => {
  return AppInfo.create(appInfoBody);
};

/**
 * Query for appInfo
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(DESC|ASC)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{ results: AppInfo[], paging: { page: number, limit: number, totalPages: number, totalResults: number } }>}
 */
const queryAppInfo = async (filter, options) => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  if (Object.keys(filter).length !== 0) {
    filter = sequelizeFilter(filter);
  } else {
    filter = {};
  }
  const { rows, count } = await AppInfo.findAndCountAll({
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
 * Get appInfo by id
 * @param {uuidv4} id
 * @returns {Promise<AppInfo>}
 */
const getAppInfoById = async (id) => {
  return AppInfo.findByPk(id);
};

/**
 * Update appInfo by id
 * @param {uuidv4} appInfoId
 * @param {Object} updateBody
 * @returns {Promise<AppInfo>}
 */
const updateAppInfoById = async (appInfoId, updateBody) => {
  const appInfo = await getAppInfoById(appInfoId);
  if (!appInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AppInfo not found');
  }

  await appInfo.update(updateBody);
  return appInfo;
};

/**
 * Delete appInfo by id
 * @param {uuidv4} appInfoId
 * @returns {Promise<AppInfo>}
 */
const deleteAppInfoById = async (appInfoId) => {
  const appInfo = await getAppInfoById(appInfoId);
  if (!appInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AppInfo not found');
  }
  await appInfo.destroy();
  return appInfo;
};

export default { createAppInfo, queryAppInfo, getAppInfoById, updateAppInfoById, deleteAppInfoById };
