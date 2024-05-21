import express from 'express';
import auth from '../../middlewares/auth.js';
import validate from '../../middlewares/validate.js';
import moduleValidation from '../../validations/module.validation.js';
import moduleController from '../../controllers/module.controller.js';
import sequelizeFilterValidation from '../../validations/sequelizeFilter.validation.js';

const router = express.Router();

router.route('/').post(auth('add'), validate(moduleValidation.createModule), moduleController.createModule);

router
  .route('/all')
  .post(
    auth('view'),
    validate(moduleValidation.getAllModule),
    validate(sequelizeFilterValidation.filterInput),
    moduleController.getAllModule
  );

router
  .route('/:moduleId')
  .get(auth('view'), validate(moduleValidation.getModule), moduleController.getModule)
  .put(auth('edit'), validate(moduleValidation.updateModule), moduleController.updateModule)
  .delete(auth('delete'), validate(moduleValidation.deleteModule), moduleController.deleteModule);

export default router;

/**
 * @swagger
 * tags:
 *   name: Module
 *   description: Module management
 */

/**
 * @swagger
 * /module:
 *   post:
 *     summary: Create a Module
 *     tags: [Module]
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
 *  /module/all:
 *   post:
 *     summary: Get all Module
 *     tags: [Module]
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
 *         description: Maximum number of module
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
 * /module/{id}:
 *   get:
 *     summary: Get a Module
 *     tags: [Module]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module id
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
 *     summary: Update a Module
 *     tags: [Module]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
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
 *     summary: Delete a Module
 *     tags: [Module]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module id
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
