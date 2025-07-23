import express from 'express'
import auth from '../middleware/auth.js'
import * as StudentsController from '../controllers/students.js'
import ROLES from '../utils/roles.js'
import validate from '../middleware/validate.js'
import studentValidationSchema from '../validation/studentValidation.js'
const router = express.Router()

router.post(
	'/',
	auth(ROLES.STUDENT),
	validate({ schema: studentValidationSchema, path: 'body' }),
	StudentsController.createStudent
)
router.get(
	'/',
	auth(ROLES.ADMIN, ROLES.STUDENT, ROLES.DEAN),
	StudentsController.getStudents
)
router.get(
	'/:userId',
	auth(ROLES.ADMIN, ROLES.STUDENT, ROLES.DEAN),
	StudentsController.getStudent
)
router.get(
	'/:id/installments',
	auth(ROLES.ADMIN),
	StudentsController.getInstallments
)
router.patch('/:id', auth(ROLES.ADMIN), StudentsController.patchStudent)
router.patch('/', auth(ROLES.ADMIN), StudentsController.patchStudents)
router.delete('/:id', auth(ROLES.ADMIN), StudentsController.deleteStudent)
router.put('/:id', auth(ROLES.ADMIN), StudentsController.updateStudent)
router.get(
	'/pdf/:userId',
	auth(ROLES.ADMIN, ROLES.STUDENT),
	StudentsController.createPDF
)

export default router
