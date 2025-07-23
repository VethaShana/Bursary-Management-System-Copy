import * as yup from 'yup'
const studentValidationSchema = yup.object().shape({
	regNo: yup.string().required(),

	nic: yup
		.string()
		.trim()
		.matches(/^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/)
		.required(),

	title: yup
		.string()
		.trim()
		.oneOf(['Mr.', 'Mrs.', 'Rev.', 'Miss.'])
		.required(),

	ALIndexNo: yup
		.string()
		.matches(/^[0-9]{7}$/)
		.required(),

	nameWithInitials: yup.string().min(2).required(),

	fullName: yup.string().min(2).required(),

	address: yup.object().shape({
		distance: yup.number().min(0).max(1340).required(),
		street: yup.string().required(),
		city: yup.string().required(),
		district: yup.string().required('District is required'),
		DSDivision: yup.string().required('District is required'),
		GSDivision: yup.string().required('District is required')
	}),

	email: yup.string().required(),

	faculty: yup.string().required(),

	course: yup.string().required(),

	zScore: yup
		.string()
		// .matches(/^[0-4](\.[0-9]{2})$/)
		.min(0)
		.max(4.0)
		.required(),

	phone: yup
		.string()
		.matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/)
		.required(),

	employed: yup.boolean().required(),

	employment: yup
		.object()
		.when('employed', (employed, schema) =>
			schema.shape({
				establishment: employed
					? yup.string().required()
					: yup.string(),
				designation: employed ? yup.string().required() : yup.string(),
				salary: employed
					? yup
							.number()
							.transform(value => (isNaN(value) ? 0 : value))
							.min(0)
							.required()
					: yup.string(),
				dateOfEmployment: employed
					? yup.date().max(new Date()).required()
					: yup.date(),
				address: yup.object().shape({
					city: employed ? yup.string().required() : yup.string(),
					street: employed ? yup.string().required() : yup.string(),
					district: employed ? yup.string().required() : yup.string()
				})
			})
		)
		.strip(),

	married: yup.boolean().required(),

	spouse: yup.object().when('married', (married, schema) =>
		schema
			.shape({
				name: married ? yup.string().required() : yup.string(),
				employment: yup.object().shape({
					establishment: married
						? yup.string().required()
						: yup.string(),
					designation: married
						? yup.string().required()
						: yup.string(),
					salary: married
						? yup
								.number()
								.transform(value => (isNaN(value) ? 0 : value))
								.min(0)
								.required()
						: yup.string(),
					dateOfEmployment: married
						? yup.date().max(new Date()).required()
						: yup.date()
				})
			})
			.optional()
	),

	father: yup.object().shape({
		name: yup.string().required(),
		living: yup.boolean().required(),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.positive()
				.max(123)
				.required()
		}),
		employment: yup.object().when('living', {
			is: true,
			then: yup.object().shape({
				occupation: yup.string().required(),
				salary: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.min(0)
					.required(),
				dateOfEmployment: yup.date().max(new Date()).required(),
				address: yup.string().required()
			}),
			otherwise: yup.object().strip()
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required(),
			houseAndProperty: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required(),
			otherSources: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required()
		})
	}),
	mother: yup.object().shape({
		name: yup.string().required(),
		living: yup.boolean().required(),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.positive()
				.max(123)
				.required()
		}),
		employment: yup.object().when('living', {
			is: true,
			then: yup.object().shape({
				occupation: yup.string().required(),
				salary: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.min(0)
					.required(),
				dateOfEmployment: yup.date().max(new Date()).required(),
				address: yup.string().required()
			}),
			otherwise: yup.object().strip()
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required(),
			houseAndProperty: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required(),
			otherSources: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.min(0)
				.required()
		})
	}),
	isLivingWithGuardian: yup.boolean().required(),
	guardian: yup.object().when('isLivingWithGuardian', {
		is: true,
		then: yup.object().shape({
			name: yup.string().required(),
			living: yup.boolean().required(),
			address: yup.string().required(),
			age: yup
				.number()
				.transform(value => (isNaN(value) ? 0 : value))
				.positive()
				.max(123)
				.required(),
			post: yup.string().min(3).required(),
			annualIncome: yup.object().shape({
				houseAndPropertyOrTemple: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.default(0)
					.min(0)
					.required(),
				salary: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.default(0)
					.min(0)
					.required()
			})
		}),
		otherwise: yup.object().strip()
	}),
	siblingsUnder19: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().min(2).required(),
				dob: yup.date().max(new Date()).required(),
				age: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.positive()
					.max(123)
					.required(),
				schoolOrInstitute: yup.string().max(123).required()
			})
		)
		.optional(),
	siblingsAtUniversity: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().min(2).required(),
				regNo: yup.string().required(),
				institute: yup.string().required(),
				academicYear: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.min(new Date().getFullYear() - 7)
					.max(new Date().getFullYear())
					.required(),
				course: yup.string().required(),
				isBursaryOrMahapolaRecipient: yup.boolean().required()
			})
		)
		.optional(),
	incomeFromHouses: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().min(2).required(),
				relationship: yup.string().required(),
				assessmentNo: yup.string().required(),
				noOfHouseholders: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.required(),
				address: yup.string().required(),
				annualIncome: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.min(0)
					.required()
			})
		)
		.optional(),
	incomeFromEstateFieldsLands: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().required(),
				relationship: yup.string().required(),
				location: yup.string().required(),
				natureOfCultivation: yup.string().required(),
				extentOfLandAndDetails: yup.string().required(),
				annualIncome: yup
					.number()
					.transform(value => (isNaN(value) ? 0 : value))
					.min(0)
					.required()
			})
		)
		.optional()
})

export default studentValidationSchema
