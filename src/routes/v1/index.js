import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import docsRoute from './docs.route.js';
import appInfoRoute from './appInfo.route.js';
import moduleRoute from './module.route.js';
import roleRoute from './role.route.js';
import permissionRoute from './permission.route.js';

import config from '../../config/config.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/appInfo',
    route: appInfoRoute,
  },
  {
    path: '/module',
    route: moduleRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
  {
    path: '/permission',
    route: permissionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
