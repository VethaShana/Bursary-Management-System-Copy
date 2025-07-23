import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const auth = (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token)
			return res
				.status(401)
				.json({ msg: 'No authentication token, access denied' })
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		if (!decoded)
			return res
				.status(401)
				.json({ msg: 'Token verification failed, you are not an admin!' })
		User.findById(decoded.id)
		next()
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export default auth
