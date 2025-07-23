import express from 'express'

import * as AuthController from '../controllers/auth.js'

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.delete('/logout', AuthController.logout)

export default router
