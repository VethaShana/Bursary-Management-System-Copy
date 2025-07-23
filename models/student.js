import mongoose from 'mongoose'
import moment from 'moment'
import { titles } from '../utils/data.js'

const studentSchema = mongoose.Schema({
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
		type: String
		//   required: true,
	},
	fullName: {
		type: String,
		required: true
	},

	//permanent address
	street: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	district: {
		type: String,
		required: true
	},

	phone: {
		type: Number,
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
	course: {
		type: String,
		required: true
	},

	/*gsArea*/ gsDivision: {
		type: String,
		required: true
	},
	gsNo: {
		type: Number,
		required: true
	},
	dsDivision: {
		type: String,
		required: true
	},
	/*indexNum*/ indexNo: {
		type: String
	},
	// district: {
	// 	type: String,
	// 	required: true
	// }, - address have

	/*admin_districtAL*/ alDistrict: {
		type: String,
		required: true
	},
	siblingsUnder19: [
		{
			namesb: {
				type: String,
				required: true
			},
			dob: {
				type: Date,
				required: true
			},
			school: {
				type: String,
				required: true
			}
		}
	],
	Distance: {
		type: Number,
		required: true
	},
	siblingsUniversity: [
		{
			name: {
				type: String,
				required: true
			},
			regNo: {
				type: String,
				required: true
			},
			university: {
				type: String,
				required: true
			},
			siblingCourse: {
				type: String,
				required: true
			},
			academicYear: {
				type: String,
				required: true
			},
			isBursaryRecipient: {
				type: Boolean,
				required: true
			}
		}
	],
	incomeFromEstateFieldsLands: [
		{
			nameOfOwner: {
				type: String,
				required: true
			},
			relationship: {
				type: String,
				required: true
			},
			location: {
				type: String,
				required: true
			},
			natureOfCultivation: {
				type: String,
				required: true
			},
			extentOfLandAndDetails: {
				type: String,
				required: true
			},
			annualIncome: {
				type: Number,
				required: true
			}
		}
	],
	incomeFromHouses: [
		{
			nameOfOwner: {
				type: String,
				required: true
			},
			relationship: {
				type: String,
				required: true
			},
			assessmentNo: {
				type: String,
				required: true
			},
			noOfHouseholders: {
				type: String,
				required: true
			},
			address: {
				type: String,
				required: true
			},
			annualIncome: {
				type: Number,
				required: true
			}
		}
	],
	GSDNo: {
		type: String
		//required:true
	},
	DSDivision: {
		type: String
		//required:true
	},
	LocalAthority: {
		type: String
		//required:true
	},

	employed: {
		type: Boolean,
		required: true
	},
	employment: {
		/*establishmentName*/ establishment: {
			type: String
		},
		/*establishmentAddress*/ address: {
			street: {
				type: String
			},
			city: {
				type: String
			},
			district: {
				type: String
			}
		},
		/*post*/ designation: { type: String },
		/*salary*/ salary: { type: Number },
		/*dateOfAppointment*/ dateOfEmployment: { type: Date },
		salaryScale: {
			type: Number
		}
	},

	// employed: [
	// 	{
	// 		establishmentName: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		establishmentAddress: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		post: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		salaryScale: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		salary: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		dateOfAppointment: {
	// 			type: Date
	// 		}
	// 	}
	// ],

	married: {
		type: Boolean,
		required: true
	},
	spouse: {
		name: { type: String },
		dateOfMarriage: {
			type: Date
		},
		employment: {
			/*spouseEstablishmentName*/ establishment: { type: String },
			/*spousePost*/ designation: { type: String },
			/*spouseMonthlySalary*/ salary: { type: Number }
		}
	},

	// spouse: [
	// 	{
	// 		name: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		dateOfMarriage: {
	// 			type: Date,
	// 			required: true
	// 		},
	// 		spousePost: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		spouseEstablishmentName: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		spouseMonthlySalary: {
	// 			type: Number,
	// 			required: true
	// 		}
	// 	}
	// ],

	father: {
		/*fatherFullName*/ name: { type: String, required: true },
		/*aliveOrNot*/ living: { type: Boolean, required: true },
		/*ageYearMonth*/ age: { type: Number },
		employment: {
			/*fatherOccupation*/ occupation: { type: String },
			/**/ dateOfEmployment: { type: Date },
			/**/ salary: { type: Number },
			/*fatherWorkPlace*/ address: { type: String }
		},
		annualIncome: {
			/*fatherAnnualIncome*/ occupationOrPension: { type: Number },
			/*fatherAnnualPropertyIncome*/ houseAndProperty: { type: Number },
			/*fatherAnnualOtherIncome*/ otherSources: { type: Number }
		},
		fatherTotalAnnualIncome: {
			type: Number
		}
	},

	// father: [
	// 	{
	// 		fatherFullName: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		aliveOrNot: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		ageYearMonth: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		fatherOccupation: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		fatherWorkPlace: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		fatherAnnualIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		fatherAnnualPropertyIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		fatherAnnualOtherIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		fatherTotalAnnualIncome: {
	// 			type: Number,
	// 			required: true
	// 		}
	// 	}
	// ],

	mother: {
		/*motherFullName*/ name: { type: String, required: true },
		/*aliveOrNot*/ living: { type: Boolean, required: true },
		/*ageYearMonth*/ age: { type: Number },
		employment: {
			/*motherOccupation*/ occupation: { type: String },
			/**/ dateOfEmployment: { type: Date },
			/**/ salary: { type: Number },
			/*motherWorkPlace*/ address: { type: String }
		},
		annualIncome: {
			/*motherAnnualIncome*/ occupationOrPension: { type: Number },
			/*motherAnnualPropertyIncome*/ houseAndProperty: { type: Number },
			/*motherAnnualOtherIncome*/ otherSources: { type: Number }
		},
		motherTotalAnnualIncome: {
			type: Number
		}
	},

	// mother: [
	// 	{
	// 		motherFullName: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		aliveOrNot: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		ageYearMonth: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		motherOccupation: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		motherWorkPlace: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		motherAnnualIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		motherAnnualPropertyIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		motherAnnualOtherIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		motherTotalAnnualIncome: {
	// 			type: Number,
	// 			required: true
	// 		}
	// 	}
	// ],

	guardian: {
		/*guardianFullName*/ name: { type: String },
		/*guardianAge*/ age: { type: Number },
		/*permanentAddress*/ address: { type: String },
		/*guardianOccupation*/ post: { type: String },
		annualIncome: {
			/*guardianAnnualIncome*/ salary: { type: Number },
			/*guardianAnnualPropertyIncome*/ houseAndPropertyOrTemple: {
				type: Number
			}
		}
	},

	// guardian: [
	// 	{
	// 		guardianFullName: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		permanentAddress: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		guardianOccupation: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		guardianAnnualIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		guardianAnnualPropertyIncome: {
	// 			type: Number,
	// 			required: true
	// 		},
	// 		guardianAge: {
	// 			type: Number,
	// 			required: true
	// 		}
	// 	}
	// ],

	netAmount: {
		type: Number,
		required: true
	},
	isValidCandidate: {
		type: Boolean,
		required: true,
		default: false
	},

	installments: [
		{
			installmentId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'installment',
				required: true
			},
			noOfInstallments: {
				type: Number,
				required: true
			}
		}
	]
})

const Student = mongoose.model('student', studentSchema)

export default Student

/*
	regNo: '',ok
	indexNo: '',ok
	nic: '',ok
	title: titles[0],ok
	nameWithInitials: '',ok
	fullName: '',ok
	street: '',// for address - ok 
	city: '',// for address - ok
	district: 'N/A',// for address and require one - ok
	gsDivision: 'N/A',ok

  dsDivision //didn't add - ok
  gsNo //didn't add - ok

	alDistrict: '',ok
	phone: '',ok
	email: '',ok
	course: 'N/A',ok
	zScore: '',ok

  siblingsUnder19 //didn't add -ok
  Distance //didn't add -ok
  siblingsUniversity //didn't add -ok
  incomeFromEstateFieldsLands //didn't add -ok
  incomeFromHouses //didn't add -ok
  GSDNo //didn't add -ok
  DSDivision //didn't add -ok
  LocalAthority //didn't add -ok
 
	employed: false,ok
	employment: {
		establishment: '',ok
		address: {
			street: '',ok
			city: '',ok
			district: 'N/A',ok
		},
		designation: '',ok
		salary: '',ok
		dateOfEmployment: new Date(),ok
    salaryScale //didn't add -ok
	},
	married: false, ok
	spouse: {
		name: '', ok
		//date of marriage ok
		employment: {
			establishment: '',ok
			designation: '',ok
			salary: '',ok
			dateOfEmployment: new Date(), //no need
		},
	},
	father: {
		name: '', ok
		living: true, ok
		age: '', ok
		employment: {
			occupation: '', ok
			salary: '', //no need - ok
			dateOfEmployment: new Date(),//no need - ok
			address: '', ok
		},
		annualIncome: {
			occupationOrPension: '', ok
			houseAndProperty: '', ok
			otherSources: '', ok
		},
    fatherTotalAnnualIncome //didn't add -ok
	},
	mother: {
		name: '',ok
		living: true,ok
		age: '',ok
		employment: {
			occupation: '',ok
			salary: '',//no need - ok
			dateOfEmployment: new Date(),//no need - ok
			address: '',ok
		},
		annualIncome: {
			occupationOrPension: '',ok
			houseAndProperty: '',ok
			otherSources: '',ok
		},
    motherTotalAnnualIncome //didn't add -ok
	},
	guardian: {
		name: '',ok
		age: '',ok
		address: '',ok
		post: '',ok
		annualIncome: {
			salary: '',ok
			houseAndPropertyOrTemple: '',ok
		},
	},
*/
