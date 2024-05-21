import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import permissionValidation from '../../validations/permission.validation.js';
import permissionController from '../../controllers/permission.controller.js';
import sequelizeFilterValidation from '../../validations/sequelizeFilter.validation.js';

const router = express.Router();

router.route('/').post(auth('add'), validate(permissionValidation.createPermission), permissionController.createPermission);

router
  .route('/all')
  .post(
    auth('view'),
    validate(permissionValidation.getAllPermission),
    validate(sequelizeFilterValidation.filterInput),
    permissionController.getAllPermission
  );

router
  .route('/:permissionId')
  .get(auth('view'), validate(permissionValidation.getPermission), permissionController.getPermission)
  .put(auth('edit'), validate(permissionValidation.updatePermission), permissionController.updatePermission)
  .delete(auth('delete'), validate(permissionValidation.deletePermission), permissionController.deletePermission);

export default router;

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission management
 */

/**
 * @swagger
 * /permission:
 *   post:
 *     summary: Create a Permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             properties:
 *               view:
 *                 type: boolean
 *               add:
 *                 type: boolean
 *               edit:
 *                 type: boolean
 *               delete:
 *                 type: boolean
 *               mask:
 *                 type: boolean
 *               roleId:
 *                 type: string
 *                 format: uuid
 *               moduleId:
 *                 type: string
 *                 format: uuid
 *               status:
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
 *  /permission/all:
 *   post:
 *     summary: Get all Permission
 *     tags: [Permission]
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
 *         description: Maximum number of permission
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
 * /permission/{id}:
 *   get:
 *     summary: Get a Permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission id
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
 *     summary: Update a Permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               view:
 *                 type: boolean
 *               add:
 *                 type: boolean
 *               edit:
 *                 type: boolean
 *               delete:
 *                 type: boolean
 *               mask:
 *                 type: boolean
 *               roleId:
 *                 type: string
 *                 format: uuid
 *               moduleId:
 *                 type: string
 *                 format: uuid
 *               status:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission id
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
