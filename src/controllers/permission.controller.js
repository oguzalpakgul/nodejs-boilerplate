import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { permissionService } from '../services/index.js';

const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(httpStatus.CREATED).send(permission);
});

const getAllPermission = catchAsync(async (req, res) => {
  const filter = req.body;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await permissionService.queryPermission(filter, options);
  res.send(result);
});

const getPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionById(req.params.permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  res.send(permission);
});

const updatePermission = catchAsync(async (req, res) => {
  const permission = await permissionService.updatePermissionById(req.params.permissionId, req.body);
  res.send(permission);
});

const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermissionById(req.params.permissionId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createPermission,
  getAllPermission,
  getPermission,
  updatePermission,
  deletePermission,
};
