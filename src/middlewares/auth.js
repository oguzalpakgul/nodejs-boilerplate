import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { permissionService, moduleService } from '../services/index.js';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    //const splitted = requiredRights.split(':');
    let permissionRights = [];
    try {
      for (const item of requiredRights) {
        const [module_name, permission] = item.split(':');
        const moduleItem = await moduleService.getModuleByName(module_name);
        const permissionItem = await permissionService.getPermissionByRoleModule(user.roleId, moduleItem.id);
        permissionRights.push(permissionItem[permission]);
      }
    } catch (error) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }

    const hasRequiredRights = permissionRights.every((permissionRight) => permissionRight);
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
