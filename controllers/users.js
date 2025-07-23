import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

// @desc DELTE users/:id
export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		res.status(200).json(user)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// @desc GET /users/:id
export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json(user)
	} catch {
		res.status(400).json({ error: err.message })
	}
}

//desc GET /users
export const getUsers = async (req, res) => {
	try {
		const { query } = req
		let users = []
		if (query) users = await User.find(query)
		else users = await User.find()
		res.status(200).json(users)
	} catch {
		res.status(400).json({ error: err.message })
	}
}

export const patchUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id).set(req.body)
		res.status(200).json(user)
	} catch (error) {
		res.status(200).json({ message: error.message })
	}
}
