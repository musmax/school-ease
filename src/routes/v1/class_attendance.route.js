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
  .route('/session')
  .post(auth(), validate(classAttendanceValidation.createSession), classAttendanceController.createSession)
  .get(auth(), classAttendanceController.querySchoolSession);

router
  .route('/term')
  .post(auth(), validate(classAttendanceValidation.createSessionTerm), classAttendanceController.createSessionTerm)
  .get(auth(), classAttendanceController.querySessionTerm);

router
  .route('/term/activity')
  .post(auth(), validate(classAttendanceValidation.createTermActivity), classAttendanceController.createTermActivity)
  .get(auth(), classAttendanceController.querySchoolTermActivity);

router
  .route('/term/break')
  .post(auth(), validate(classAttendanceValidation.createTermBreak), classAttendanceController.createTermBreak)
  .get(auth(), classAttendanceController.querySchoolTermBreak);

router
  .route('/:id')
  .get(auth(), classAttendanceController.getAttendance)
  .patch(auth(), classAttendanceController.updateAttendance);
router
  .route('/term/:id')
  .get(auth(), validate(classAttendanceValidation.getSessionTerm), classAttendanceController.fetchtermById)
  .patch(auth(), validate(classAttendanceValidation.updateSessionTerm), classAttendanceController.updateSessionTerm)
  .delete(auth(), validate(classAttendanceValidation.deactivateTerm), classAttendanceController.deactivateTerm);
router
  .route('/session/:id')
  .get(auth(), validate(classAttendanceValidation.getSession), classAttendanceController.getSession)
  .patch(auth(), validate(classAttendanceValidation.updateSession), classAttendanceController.updateSession)
  .delete(auth(), validate(classAttendanceValidation.deactivateSession), classAttendanceController.deactivateSession);
router
  .route('/term/activity/:id')
  .get(auth(), validate(classAttendanceValidation.getTermActivity), classAttendanceController.getTermActivity)
  .patch(auth(), validate(classAttendanceValidation.updateTermActivity), classAttendanceController.updateTermActivity)
  .delete(auth(), validate(classAttendanceValidation.deleteTermActivity), classAttendanceController.deleteTermActivity);
router
  .route('/term/break/:id')
  .get(auth(), validate(classAttendanceValidation.getTermBreak), classAttendanceController.getTermBreak)
  .patch(auth(), validate(classAttendanceValidation.updateTermBreak), classAttendanceController.updateTermBreak)
  .delete(auth(), validate(classAttendanceValidation.deleteTermBreak), classAttendanceController.deleteTermBreak);

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
 */

/**
 * @swagger
 * /class-attendance/session:
 *   get:
 *     summary: Query session
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
 *         name: title
 *         schema:
 *           type: string
 *         description: title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: isActive
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
 *                     $ref: '#/components/schemas/SchoolSessionList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Create a session for your school
 *     description: Only allowed user can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolSession'
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
 *                   $ref: '#/components/schemas/SchoolSession'
 */

/**
 * @swagger
 * /Class-Attendance/session/{id}:
 *   get:
 *     summary: View  a School Session by id
 *     description: Get a school session by ID.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: session id
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
 *                   $ref: '#/components/schemas/ SchoolSessionList'
 *
 *   patch:
 *     summary: Update a school session
 *     description: Only admins can update school sessions.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: sessionId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolSession'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SchoolSession'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Deactivate a session
 *     description: Only admins can delete sessions.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: session id
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
 * /class-attendance/term:
 *   get:
 *     summary: Query term
 *     description: Only staff with permission can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: number
 *           required: true
 *         description: sessionId
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: isActive
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: date
 *         description: startDate expected format YYYY-MM-DD
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: date
 *         description: endDate expected format YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/SchoolTermList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   post:
 *     summary: Create a term for your school sesion
 *     description: Only allowed user can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolTerm'
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
 *                   $ref: '#/components/schemas/SchoolTerm'
 */

/**
 * @swagger
 * /Class-Attendance/term/{id}:
 *   get:
 *     summary: View  a School term by id
 *     description: Get a school term by ID.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: term id
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
 *                   $ref: '#/components/schemas/SchoolTermList'
 *   patch:
 *     summary: Update a school term
 *     description: Only admins can update school terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: termId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSchoolTerm'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UpdateSchoolTerm'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Deactivate a term
 *     description: Only admins can delete terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: term id
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
 * /class-attendance/term/activity:
 *   get:
 *     summary: Query term activity
 *     description: Only staff with permission can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: termId
 *         schema:
 *           type: number
 *           required: true
 *         description: termId
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: title
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: status
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *         description: filter by date of the event expected format YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/TermActivityList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a term activity
 *     description: Only allowed user can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TermActivity'
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
 *                   $ref: '#/components/schemas/TermActivity'
 */

/**
 * @swagger
 * /Class-Attendance/term/activity/{id}:
 *   get:
 *     summary: View  a School term activity by id
 *     description: Get a school term by ID.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: term id
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
 *                   $ref: '#/components/schemas/TermActivityList'
 *   patch:
 *     summary: Update a school term activity
 *     description: Only admins can update school terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: activityId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTermActivity'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UpdateTermActivity'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a term activity
 *     description: Only admins can delete terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: activity id
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
 * /class-attendance/term/break:
 *   get:
 *     summary: Query term break
 *     description: Only staff with permission can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: termId
 *         schema:
 *           type: number
 *           required: true
 *         description: termId
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: title
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: status || observed or postponed
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *         description: filter by date of the event expected format YYYY-MM-DD
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
 *                     $ref: '#/components/schemas/TermBreakList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a term break
 *     description: Only allowed user can perform this action
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TermBreak'
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
 *                   $ref: '#/components/schemas/TermBreak'
 */

/**
 * @swagger
 * /Class-Attendance/term/break/{id}:
 *   get:
 *     summary: View  a School term break by id
 *     description: Get a school term by ID.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: term id
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
 *                   $ref: '#/components/schemas/TermBreakList'
 *   patch:
 *     summary: Update a school term break
 *     description: Only admins can update school terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: breakId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTermBreak'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UpdateTermABreak'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete a term break
 *     description: Only admins can delete terms.
 *     tags: [Class-Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: break id
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
