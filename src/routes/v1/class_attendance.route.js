const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { classAttendanceValidation } = require('../../validations');
const { classAttendanceController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  // .get(auth('classAttendances.view'), classAttendanceController.getclassAttendances)
  .post(auth(), validate(classAttendanceValidation.markAttendance), classAttendanceController.markAttendance);

// router
//   .route('/:id')
//   .get(
//     validate(classAttendanceValidation.getclassAttendance),
//     auth('classAttendances.view'),
//     classAttendanceController.getclassAttendanceById
//   );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Class-Attendance
 *   description: Class-Attendance management and retrieval
 */

/**
 * @swagger
 * /class-attendance:
 *   get:
 *     summary: Get all Class-Attendances
 *     description: Only admins can retrieve all Class-Attendances.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: Class-Attendance name
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
 *                     $ref: '#/components/schemas/Class-AttendanceList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Mark attendance for your class
 *     description: Only allowed user can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassAttendance'
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
 *                   $ref: '#/components/schemas/ClassAttendance'
 */

/**
 * @swagger
 * /Class-Attendance/me:
 *   get:
 *     summary: Get all my Class-Attendances
 *     description: Only admins can retrieve all Class-Attendances.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: Class-Attendance name
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
 *                     $ref: '#/components/schemas/Class-AttendanceList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /Class-Attendance/{id}:
 *   get:
 *     summary: Get a Class-Attendance
 *     description: Get a Class-Attendance by ID.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class-Attendance id
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
 *                   $ref: '#/components/schemas/Class-AttendanceList'
 *
 *   patch:
 *     summary: Update a Class-Attendance
 *     description: Only admins can update Class-Attendances.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class-Attendance id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class-Attendance'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Class-Attendance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Class-Attendance
 *     description: Only admins can delete Class-Attendances.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class-Attendance id
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
