import mongoose from 'mongoose'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ROLES from '../utils/roles.js'

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	regNo: {
		type: String,
		trim: true
		// unique: true,
	},

	firstName: {
		type: String,
		trim: true
	},

	lastName: {
		type: String,
		trim: true
	},

	faculty: {
		type: String,
		trim: true
	},

	password: {
		type: String,
		required: true
	},

	isVerified: {
		type: Boolean
	},

	isApproved: {
		type: Boolean,
		default: false
	},

	role: {
		type: String,
		required: true,
		default: ROLES.STUDENT,
		enum: ['student', 'admin', 'dean']
	}
})

userSchema.pre('save', async function (next) {
	try {
		const salt = await bycrypt.genSalt()
		this.password = await bycrypt.hash(this.password, salt)
		next()
	} catch (err) {
		console.log(err)
	}
})

userSchema.methods.createToken = async function () {
	try {
		let user = {}
		if (this.role === 'student')
			user = {
				_id: this._id,
				email: this.email,
				role: this.role
			}
		else if (this.role === 'dean') {
			user = {
				_id: this._id,
				email: this.email,
				faculty: this.faculty,
				firstName: this.firstName,
				lastName: this.lastName,
				role: this.role,
				isApproved: this.isApproved
			}
		} else
			user = {
				_id: this._id,
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				role: this.role,
				isApproved: this.isApproved
			}

		const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
			expiresIn: '1w'
		})
		return accessToken
	} catch (err) {
		console.log(err)
		return
	}
}

const User = mongoose.model('user', userSchema)

export default User
