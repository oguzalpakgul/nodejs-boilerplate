import httpStatus from 'http-status';
import { User } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { sequelizeFilter } from '../utils/sequelizeFilter.js';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(DESC|ASC)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{ results: User[], paging: { page: number, limit: number, totalPages: number, totalResults: number } }>}
 */
const queryUsers = async (filter, options) => {
  const { page, limit } = options;
  const offset = (page - 1) * limit;

  if (Object.keys(filter).length !== 0) {
    filter = sequelizeFilter(filter);
  } else {
    filter = {};
  }
  const { rows, count } = await User.findAndCountAll({
    where: filter,
    order: options.sortBy ? [options.sortBy.split(':')] : [],
    limit: limit,
    offset: offset,
  });

  const totalPages = Math.ceil(count / limit);

  return {
    results: rows,
    paging: { page: page, limit: limit, totalPages: totalPages, totalResults: count },
  };
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

/**
 * Update user by id
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  await user.update(updateBody);
  return user;
};

/**
 * Delete user by id
 * @param {number} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

export default { createUser, queryUsers, getUserById, getUserByEmail, updateUserById, deleteUserById };
