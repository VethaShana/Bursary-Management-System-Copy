import mongoose from 'mongoose'

const installmentSchema = mongoose.Schema(
	{
		date: {
			type: Date,
			required: true
		},
		faculty: {
			type: String,
			required: true
		},
		course: {
			type: String,
			required: true
		},
		noOfInstallments: {
			type: Number,
			required: true
		},
		academicYear: {
			type: String,
			required: true
		},
		description: {
			type: String
		}
	},
	{ timestamps: true }
)

const Installment = mongoose.model('installment', installmentSchema)

export default Installment
