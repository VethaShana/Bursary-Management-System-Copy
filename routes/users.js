import express from 'express'
import {
	deleteUser,
	loginUser,
	registerUser,
	// tokenIsValid,
	getUser,
} from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.delete('/delete', auth, deleteUser)
// router.post('/tokenIsValid', tokenIsValid)
router.get('/', auth, getUser)

export default router
