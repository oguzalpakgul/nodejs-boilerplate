import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import appInfoService from '../services/appInfo.service.js';

const createAppInfo = catchAsync(async (req, res) => {
  const appInfo = await appInfoService.createAppInfo(req.body);
  res.status(httpStatus.CREATED).send(appInfo);
});

const getAllAppInfo = catchAsync(async (req, res) => {
  const filter = req.body;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await appInfoService.queryAppInfo(filter, options);
  res.send(result);
});

const getAppInfo = catchAsync(async (req, res) => {
  const appInfo = await appInfoService.getAppInfoById(req.params.appInfoId);
  if (!appInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AppInfo not found');
  }
  res.send(appInfo);
});

const updateAppInfo = catchAsync(async (req, res) => {
  const appInfo = await appInfoService.updateAppInfoById(req.params.appInfoId, req.body);
  res.send(appInfo);
});

const deleteAppInfo = catchAsync(async (req, res) => {
  await appInfoService.deleteAppInfoById(req.params.appInfoId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createAppInfo,
  getAllAppInfo,
  getAppInfo,
  updateAppInfo,
  deleteAppInfo,
};
