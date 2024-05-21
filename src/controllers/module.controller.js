import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { moduleService } from '../services/index.js';

const createModule = catchAsync(async (req, res) => {
  const module = await moduleService.createModule(req.body);
  res.status(httpStatus.CREATED).send(module);
});

const getAllModule = catchAsync(async (req, res) => {
  const filter = req.body;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await moduleService.queryModule(filter, options);
  res.send(result);
});

const getModule = catchAsync(async (req, res) => {
  const module = await moduleService.getModuleById(req.params.moduleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  res.send(module);
});

const updateModule = catchAsync(async (req, res) => {
  const module = await moduleService.updateModuleById(req.params.moduleId, req.body);
  res.send(module);
});

const deleteModule = catchAsync(async (req, res) => {
  await moduleService.deleteModuleById(req.params.moduleId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createModule,
  getAllModule,
  getModule,
  updateModule,
  deleteModule,
};
