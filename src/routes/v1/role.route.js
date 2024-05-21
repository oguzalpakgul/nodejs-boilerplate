import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import roleValidation from '../../validations/role.validation.js';
import roleController from '../../controllers/role.controller.js';
import sequelizeFilterValidation from '../../validations/sequelizeFilter.validation.js';

const router = express.Router();

router.route('/').post(auth('rolee:add'), validate(roleValidation.createRole), roleController.createRole);

router
  .route('/all')
  .post(
    auth('rolee:view'),
    validate(roleValidation.getAllRole),
    validate(sequelizeFilterValidation.filterInput),
    roleController.getAllRole
  );

router
  .route('/:roleId')
  .get(auth('rolee:view'), validate(roleValidation.getRole), roleController.getRole)
  .put(auth('rolee:edit'), validate(roleValidation.updateRole), roleController.updateRole)
  .delete(auth('rolee:delete'), validate(roleValidation.deleteRole), roleController.deleteRole);

export default router;

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management
 */

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a Role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               score:
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
 *  /role/all:
 *   post:
 *     summary: Get all Role
 *     tags: [Role]
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
 *         description: Maximum number of role
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
 * /role/{id}:
 *   get:
 *     summary: Get a Role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role id
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
 *     summary: Update a Role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               score:
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
 *     summary: Delete a Role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role id
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
