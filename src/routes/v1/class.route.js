const express = require('express');
const auth = require('../../middlewares/auth');
const { classController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { classValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(auth(), classController.fetchAllClasses)
  .post(auth(), validate(classValidation.createClass), classController.createClass);
router.route('/assign-teacher').post(auth(), validate(classValidation.assignTeacher), classController.assignTeacher);
router.route('/re-assign-teacher').post(auth(), validate(classValidation.reassignTeacher), classController.reAssignTeacher);
router.route('/assign-student').post(auth(), validate(classValidation.assignStudent), classController.assignAStudent);
router.route('/re-assign-student').post(auth(), validate(classValidation.reAssignStudent), classController.reAssignStudent);
router.route('/make-captain').post(auth(), validate(classValidation.makeCaptain), classController.makeCaptain);
router.route('/delete-captain').post(auth(), classController.deleteCaptain);

router
  .route('/:id')
  .get(auth(), classController.getClasseById)
  .patch(auth(), classController.updateClasseById)
  .delete(auth(), classController.deleteClasseById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management and retrieval
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a class for your school
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Class'
 *   get:
 *     summary: Get all Classs
 *     description: Only admins can retrieve all Classs.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: schoolId
 *        required: true
 *        schema:
 *          type: string
 *          description: Class schoolId
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
 *                     $ref: '#/components/schemas/ClassList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get a Class
 *     description: Get a Class by ID.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class id
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
 *                   $ref: '#/components/schemas/ClassList'
 *
 *   patch:
 *     summary: Update a Class
 *     description: Only admins can update Classs.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClass'
 *             example:
 *               name: lastName
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UpdateClass'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Class
 *     description: Only admins can delete Classs.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Class id
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
 * /class/assign-teacher:
 *   post:
 *     summary: Assign a teacher
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignTeacher'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/AssignTeacher'
 */
/**
 * @swagger
 * /class/re-assign-teacher:
 *   post:
 *     summary: Reassign a teacher to another class
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReAssignTeacher'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/AssignTeacher'
 */

/**
 * @swagger
 * /class/re-assign-student:
 *   post:
 *     summary: promote or demote  a student in the class hierarchy
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReAssignStudent'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/AssignStudent'
 */

/**
 * @swagger
 * /class/make-captain:
 *   post:
 *     summary: Create a class captain
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MakeCaptain'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/MakeCaptain'
 */

/**
 * @swagger
 * /class/delete-captain:
 *   post:
 *     summary: delete a class captain for a class
 *     description: Only admins can create a cities.
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MakeCaptain'
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
 *                   example: Class created successfully
 *                 data:
 *                   $ref: '#/components/schemas/MakeCaptain'
 */
