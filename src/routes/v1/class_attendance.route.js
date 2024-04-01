const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { classAttendanceValidation } = require('../../validations');
const { classAttendanceController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(classAttendanceValidation.markAttendance), classAttendanceController.markAttendance)
  .get(auth(), classAttendanceController.queryClassAttendance);

router
  .route('/:id')
  .get(auth(), classAttendanceController.getAttendance)
  .patch(auth(), classAttendanceController.updateAttendance);

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
 *     summary: Query attendance
 *     description: Only staff with permission can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: schoolId
 *         schema:
 *           type: number
 *           required: true
 *         description: schoolId
 *       - in: query
 *         name: teacherId
 *         schema:
 *           type: number
 *         description: teacherId
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: number
 *         description: studentId
 *       - in: query
 *         name: classId
 *         schema:
 *           type: number
 *           required: true
 *         description: classId
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date (date created) in the form of YYYY-MM-DD
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date (date created) in the form of YYYY-MM-DD
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: page number
 *         default: 1
 *       - in: query
 *         name: paginate
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 25
 *         description: Maximum number of records per page
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
 *             $ref: '#/components/schemas/UpdateAttendance'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UpdateAttendance'
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

/**
 * @swagger
 * /subscriptions/transaction-history:
 *   get:
 *     summary: Get all subscriptions transaction history
 *     description: Only Admin can get list of subscriptions transaction history.
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriptionPlanId
 *         schema:
 *           type: number
 *         description: subscriptionPlanId
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *         description: userId
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: number
 *         description: companyId
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date (date created) in the form of YYYY-MM-DD
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date (date created) in the form of YYYY-MM-DD
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: page number
 *         default: 1
 *       - in: query
 *         name: paginate
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 25
 *         description: Maximum number of records per page
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
 *                   example: Categories fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/SubscriptionPlans'
 */
