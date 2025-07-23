import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default (...roles) => {
	return (req, res, next) => {
		const token = req.get('x-auth-token')
		if (!token) {
			return res
				.status(401)
				.json({ error: 'Access denied, token missing!' })
		} else {
			try {
				const payload = jwt.verify(token, process.env.JWT_SECRET)
				if (roles && !roles.includes(payload.user.role)) {
					res.status(403).json({ message: 'Forbidden' })
				} else {
					req.user = payload.user
					next()
				}
			} catch (error) {
				if (error.name === 'TokenExpiredError') {
					return res
						.status(401)
						.json({ error: 'Session timed out,please login again' })
				} else if (error.name === 'JsonWebTokenError') {
					return res
						.status(401)
						.json({ error: 'Invalid token,please login again!' })
				} else {
					//catch other unprecedented errors
					console.error(error)
					return res.status(400).json({ error })
				}
			}
		}
	}
}
