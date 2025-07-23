import mongoose from 'mongoose'
import { titles } from '../utils/data.js'
//import studentValidationSchema from '../studentValidation.js'

const Installment = mongoose.Schema(
	{
		installmentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'installment',
			required: true
		},
		noOfInstallments: {
			type: Number,
			required: true
		},
		isApproved: {
			type: Boolean,
			default: false
		},
		approvedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	},
	{ timestamps: true }
)

const studentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
		unique: true
	},
	regNo: {
		type: String,
		required: true
	},
	nic: {
		type: String,
		required: true,
		trim: true
	},
	title: {
		type: String,
		required: true,
		enum: titles
	},
	nameWithInitials: {
		type: String,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
	address: {
		distance: { type: Number },
		street: {
			type: String
		},
		city: {
			type: String
		},
		district: {
			type: String
		},
		GSDivision: {
			type: String
		},
		DSDivision: {
			type: String
		}
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	zScore: {
		type: Number,
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
	GSDivision: {
		type: String
		// required: true
	},
	DSDivision: {
		type: String
	},
	ALDistrict: {
		type: String
	},
	ALIndexNo: {
		type: String
	},
	siblingsUnder19: [
		{
			name: String,
			dob: Date,
			age: Number,
			schoolOrInstitute: String
		}
	],
	siblingsAtUniversity: [
		{
			name: String,
			regNo: String,
			institute: String,
			course: String,
			academicYear: String,
			isBursaryOrMahapolaRecipient: Boolean
		}
	],
	incomeFromEstateFieldsLands: [
		{
			name: String,
			relationship: String,
			location: String,
			natureOfCultivation: String,
			extentOfLandAndDetails: String,
			annualIncome: Number
		}
	],
	incomeFromHouses: [
		{
			name: String,
			relationship: String,
			assessmentNo: String,
			noOfHouseholders: String,
			address: String,
			annualIncome: Number,
			rent_lease: String
		}
	],
	employed: {
		type: Boolean,
		required: true
	},
	employment: {
		establishment: String,
		address: {
			street: String,
			city: String,
			district: String
		},
		designation: String,
		salary: Number,
		dateOfEmployment: Date
		//salaryScale: Number
	},

	married: {
		type: Boolean,
		required: true
	},

	spouse: {
		name: { type: String },
		dateOfMarriage: { type: Date },
		employment: {
			establishment: {
				type: String
			},
			designation: {
				type: String
			},
			salary: {
				type: Number
			}

			//dateOfEmployment: { type: Date,  }
		}
	},

	father: {
		name: { type: String, required: true },
		living: { type: Boolean, required: true },
		age: Number,
		employment: {
			occupation: String,
			dateOfEmployment: Date,
			salary: Number,
			address: String
		},
		annualIncome: {
			occupationOrPension: { type: Number, required: true },
			houseAndProperty: { type: Number, required: true },
			otherSources: { type: Number, required: true }
		}
	},

	mother: {
		name: { type: String, required: true },
		living: { type: Boolean, required: true },
		age: Number,
		employment: {
			occupation: String,
			dateOfEmployment: Date,
			salary: Number,
			address: String
		},
		annualIncome: {
			occupationOrPension: { type: Number, required: true },
			houseAndProperty: { type: Number, required: true },
			otherSources: { type: Number, required: true }
		}
	},
	isLivingWithGuardian: {
		type: Boolean,
		required: true
	},
	guardian: {
		name: String,
		age: Number,
		address: String,
		post: String,
		annualIncome: {
			salary: String,
			houseAndPropertyOrTemple: Number
		}
	},
	netIncome: {
		type: Number,
		required: true
	},
	isValidCandidate: {
		type: Boolean,
		required: true,
		default: false
	},
	installments: [Installment],
	isApproved: {
		type: Boolean,
		default: false
	}
})

const Student = mongoose.model('student', studentSchema)

export default Student
