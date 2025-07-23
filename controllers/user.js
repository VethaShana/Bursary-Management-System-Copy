import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//@desc register user
export const registerUser = async (req, res) => {
	try {
		let { email, password, passwordCheck, userName, usertype } = req.body
		// validate
		if (!email || !password || !passwordCheck || !usertype)
			return res.status(400).json({ msg: 'Not all fields have been entered.' })

		if (password.length < 8)
			return res
				.status(400)
				.json({ msg: 'The password needs to be at least 8 characters long.' })

		if (password !== passwordCheck)
			return res
				.status(400)
				.json({ msg: 'Enter the same password twice for verification.' })

		const existingUser = await User.findOne({ email: email })
		if (existingUser)
			return res
				.status(400)
				.json({ msg: 'An account with this email already exists.' })

		if (!userName) userName = email
		const salt = await bcrypt.genSalt()
		const newUser = new User({
			email,
			password,
			userName,
			usertype,
		})
		const savedUser = await newUser.save()
		res.json(savedUser)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

//@desc login user
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res.status(400).json({ msg: 'Not all fields have been entered.' })

		const user = await User.findOne({ email: email })
		if (!user)
			return res
				.status(400)
				.json({ msg: 'No account with this email has been registered.' })

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })
		//const stu = await compare(usertype,user.usertype,"student");

		if (user.role != 'student') {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
			res.json({
				token,
				id: user._id,
			})
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
		res.json({
			token,
			user: {
				id: user._id,
				userName: user.userName,
			},
		})
		console.log('Successfully login')
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// @desc delete user data
export const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user)
		res.json(deletedUser)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// @desc get user data
export const getUser = async (req, res) => {
	const user = await User.findById(req.user)
	res.json({
		userName: user.userName,
		id: user._id,
	})
}
