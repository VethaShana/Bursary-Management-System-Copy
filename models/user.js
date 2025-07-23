import mongoose from 'mongoose'
import bycrypt from 'bcrypt'

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	type: {
		type: String,
		required: true,
	},

	isVerified: {
		type: Boolean,
		default: false,
	},
})

userSchema.pre('save', async function (next) {
	const salt = await bycrypt.genSalt()
	this.password = await bycrypt.hash(this.password, salt)
	next()
})

const User = mongoose.model('user', userSchema)

export default User
