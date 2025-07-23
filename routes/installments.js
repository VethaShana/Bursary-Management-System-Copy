import express from 'express'
import * as InstallmentsController from '../controllers/installment.js'
import auth from '../middleware/auth.js'
import ROLES from '../utils/roles.js'

const router = express.Router()

router.get(
	'/',
	auth(ROLES.ADMIN, ROLES.DEAN),
	InstallmentsController.getInstallments
)
router.post('/', auth(ROLES.ADMIN), InstallmentsController.createInstallments)

export default router
