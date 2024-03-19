const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { schoolValidation } = require('../../validations');
const { schoolController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('schools.view'), schoolController.getSchools)
  .post(auth('schools.manage'), validate(schoolValidation.createSchool), schoolController.createSchool);

router
  .route('/:id')
  .get(validate(schoolValidation.getSchool), auth('schools.view'), schoolController.getSchoolById)
  .patch(validate(schoolValidation.updateSchool), auth('schools.manage'), schoolController.updateSchoolById)
  .delete(validate(schoolValidation.deleteSchool), auth('schools.manage'), schoolController.deleteSchoolById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: school management and retrieval
 */

/**
 * @swagger
 * /schools:
 *   get:
 *     summary: Get all schools
 *     description: Only admins can retrieve all schools.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: school name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SchoolList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Create another school
 *     description: Only school administrator can create a school.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: cities created successfully
 *                 data:
 *                   $ref: '#/components/schemas/School'
 */

/**
 * @swagger
 * /schools/{id}:
 *   get:
 *     summary: Get a school
 *     description: Get a school by ID.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: school id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Country fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/SchoolList'
 *
 *   patch:
 *     summary: Update a school
 *     description: Only admins can update schools.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: school id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/School'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a school
 *     description: Only admins can delete schools.
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: school id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
