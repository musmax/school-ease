const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { classAttendanceValidation } = require('../../validations');
const { classAttendanceController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  // .get(auth('StaffAttendances.view'), StaffAttendanceController.getSchools)
  .post(
    auth('schools.manage'),
    validate(classAttendanceValidation.markStaffAttendance),
    classAttendanceController.markStaffAttendance
  );

// router
//   .route('/:id')
//   .get(validate(schoolValidation.getSchool), auth('schools.view'), schoolController.getSchoolById)
//   .patch(validate(schoolValidation.updateSchool), auth('schools.manage'), schoolController.updateSchoolById)
//   .delete(validate(schoolValidation.deleteSchool), auth('schools.manage'), schoolController.deleteSchoolById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StaffAttendances
 *   description: Staff Attendance management and retrieval
 */

/**
 * @swagger
 * /staff-attendance:
 *   get:
 *     summary: Get all StaffAttendances
 *     description: Only admins can retrieve all StaffAttendances.
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: StaffAttendance name
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
 *                     $ref: '#/components/schemas/StaffAttendanceList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: mark attendance for school staff
 *     description: Only permitted user can perform this action
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffAttendance'
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
 *                   $ref: '#/components/schemas/StaffAttendance'
 */

/**
 * @swagger
 * /StaffAttendances/me:
 *   get:
 *     summary: Get all my StaffAttendances
 *     description: Only admins can retrieve all StaffAttendances.
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: StaffAttendance name
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
 *                     $ref: '#/components/schemas/StaffAttendanceList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /StaffAttendances/{id}:
 *   get:
 *     summary: Get a StaffAttendance
 *     description: Get a StaffAttendance by ID.
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: StaffAttendance id
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
 *                   $ref: '#/components/schemas/StaffAttendanceList'
 *
 *   patch:
 *     summary: Update a StaffAttendance
 *     description: Only admins can update StaffAttendances.
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: StaffAttendance id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffAttendance'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StaffAttendance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a StaffAttendance
 *     description: Only admins can delete StaffAttendances.
 *     tags: [StaffAttendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: StaffAttendance id
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
