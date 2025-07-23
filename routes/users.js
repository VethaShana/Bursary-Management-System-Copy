import express from 'express'
import * as UsersController from '../controllers/users.js'
import auth from '../middleware/auth.js'
import ROLES from '../utils/roles.js'

const router = express.Router()

router.delete('/:id', auth(ROLES.ADMIN), UsersController.deleteUser)
router.get('/:id', auth(ROLES.ADMIN), UsersController.getUser)
router.get('/', auth(ROLES.ADMIN, ROLES.DEAN), UsersController.getUsers)
router.patch('/:id', auth(ROLES.ADMIN), UsersController.patchUser)

export default router
