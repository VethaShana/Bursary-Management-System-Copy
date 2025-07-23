import User from '../models/user.js'
import bcrypt from 'bcrypt'
import ROLES from '../utils/roles.js'

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ error: 'No user found!' })
		} else {
			let valid = await bcrypt.compare(password, user.password)
			if (valid) {
				const token = await user.createToken()
				return res.status(201).json({ token })
			} else {
				return res.status(401).json({ error: 'Invalid password!' })
			}
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}

export const register = async (req, res) => {
	const { email, password, faculty, firstName, lastName } = req.body
	const { query } = req
	try {
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).json({ error: 'Email already in use.' })
		} else {
			const role =
				query && query.role === ROLES.DEAN ? ROLES.DEAN : ROLES.STUDENT
			user = await new User({
				email,
				firstName,
				lastName,
				password,
				faculty,
				role
			}).save()
			const token = await user.createToken()
			return res.status(201).json({ token })
		}
	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}

export const logout = async (req, res) => {
	try {
		return res.status(200).json({ success: 'User logged out!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error!' })
	}
}
