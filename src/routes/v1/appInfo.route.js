import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import { appInfoValidation, sequelizeFilterValidation } from '../../validations/index.js';
import { appInfoController } from '../../controllers/index.js';

const router = express.Router();

router
  .route('/')
  .post(auth('appInfo:add', 'role:add'), validate(appInfoValidation.createAppInfo), appInfoController.createAppInfo);

router
  .route('/all')
  .post(
    auth('appInfo:view'),
    validate(appInfoValidation.getAllAppInfo),
    validate(sequelizeFilterValidation.filterInput),
    appInfoController.getAllAppInfo
  );

router
  .route('/:appInfoId')
  .get(auth('appInfo:view'), validate(appInfoValidation.getAppInfo), appInfoController.getAppInfo)
  .put(auth('appInfo:edit'), validate(appInfoValidation.updateAppInfo), appInfoController.updateAppInfo)
  .delete(auth('appInfo:delete'), validate(appInfoValidation.deleteAppInfo), appInfoController.deleteAppInfo);

export default router;

/**
 * @swagger
 * tags:
 *   name: AppInfo
 *   description: AppInfo management
 */

/**
 * @swagger
 * /appInfo:
 *   post:
 *     summary: Create a AppInfo
 *     tags: [AppInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - version
 *               - update_type
 *             properties:
 *               os:
 *                 type: string
 *               version:
 *                 type: string
 *               update_type:
 *                 type: integer
 *     responses:
 *       "201":
 *         description: Created
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 *  /appInfo/all:
 *   post:
 *     summary: Get all AppInfo
 *     tags: [AppInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - fields
 *                 - condition
 *                 - values
 *               properties:
 *                 fields:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Fields to filter
 *                 condition:
 *                   type: string
 *                   description: Filter condition ('==', '!=', '<', '<=', '>', '>=', '%=', '=%', '%=%')
 *                 values:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Values to filter
 *
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of appInfo
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /appInfo/{id}:
 *   get:
 *     summary: Get a AppInfo
 *     tags: [AppInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AppInfo id
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a AppInfo
 *     tags: [AppInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AppInfo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               os:
 *                 type: string
 *               version:
 *                 type: string
 *               update_type:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a AppInfo
 *     tags: [AppInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AppInfo id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
