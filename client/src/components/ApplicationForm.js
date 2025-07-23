import React from 'react'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import * as yup from 'yup'
import { Formik, Form, FastField, FieldArray } from 'formik'
import Alert from '@material-ui/lab/Alert'
import { TextField, Checkbox } from 'formik-material-ui'
import { KeyboardDatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
// import { DatePicker } from 'formik-material-ui-pickers'

import { connect } from 'react-redux'
import { setApplication } from '../actions/application'

import { titles, courses, districts } from '../utils/data'

import Instruction from './Instruction'

const faculties = courses.map(x => x.faculty)

const useStyles = makeStyles(theme => ({
	paper: {
		padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
		position: 'relative',
		overflow: 'hidden',
		'&::after': {
			content: "' '",
			position: 'absolute',
			display: 'block',
			backgroundColor: theme.palette.primary.main,
			width: '100%',
			height: '4px',
			top: 0,
			left: 0
		}
	},
	formControl: { margin: theme.spacing(1), minWidth: 120 },
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	footer: {
		margin: theme.spacing(2) + 'px 0'
	},
	btn: {
		minWidth: '150px',
		[theme.breakpoints.down('xs')]: {
			minWidth: '100%',
			marginTop: theme.spacing(2)
		}
	}
}))

const initialValues = {
	regNo: '',
	nic: '',
	title: '',
	nameWithInitials: '',
	fullName: '',
	address: {
		distance: '',
		street: '',
		city: '',
		district: '',
		DSDivision: '',
		GSDivision: ''
	},
	phone: '',
	email: '',
	// academic details
	faculty: '',
	course: '',
	zScore: '',
	ALDistrict: '',
	ALIndexNo: '',
	employed: false,
	employment: {
		establishment: '',
		address: {
			street: '',
			city: '',
			district: ''
		},
		designation: '',
		salary: '',
		dateOfEmployment: ''
	},
	married: false,
	spouse: {
		name: '',
		dateOfMarriage: '',
		employment: {
			establishment: '',
			designation: '',
			salary: '',
			dateOfEmployment: ''
		}
	},
	father: {
		name: '',
		living: true,
		age: '',
		employment: {
			occupation: '',
			salary: '',
			dateOfEmployment: '',
			address: ''
		},
		annualIncome: {
			occupationOrPension: '',
			houseAndProperty: '',
			otherSources: ''
		}
	},
	mother: {
		name: '',
		living: true,
		age: '',
		employment: {
			occupation: '',
			salary: '',
			dateOfEmployment: '',
			address: ''
		},
		annualIncome: {
			occupationOrPension: '',
			houseAndProperty: '',
			otherSources: ''
		}
	},
	isLivingWithGuardian: false,
	guardian: {
		name: '',
		age: '',
		address: '',
		post: '',
		annualIncome: {
			salary: '',
			houseAndPropertyOrTemple: ''
		}
	},
	siblingsUnder19: [
		// { name: '', dob: '', age: '', schoolOrInstitute: '' }
	],
	siblingsAtUniversity: [
		// {
		// 	name: '',
		// 	regNo: '',
		// 	institute: '',
		// 	academicYear: '',
		// 	course: '',
		// 	isBursaryOrMahapolaRecipient: false
		// }
	],
	incomeFromHouses: [
		// {
		// 	name: '',
		// 	relationship: '',
		// 	assessmentNo: '',
		// 	noOfHouseholders: '',
		// 	address: '',
		// 	annualIncome: ''
		// }
	],
	incomeFromEstateFieldsLands: [
		// {
		// 	name: '',
		// 	relationship: '',
		// 	location: '',
		// 	natureOfCultivation: '',
		// 	extentOfLandAndDetails: '',
		// 	annualIncome: ''
		// }
	]
}

const validationSchema = yup.object().shape({
	regNo: yup
		.string()
		.trim()
		.matches(
			/^20[0-9]{2}\/(FM|E|ET|BST|SB|SP|CSC|BAD|C|A|L|B|V|AD|AG|PHA|MLS|NUR)\/[0-9]{3}$/,
			'Enter valid Registration No.'
		)
		.required('Registration No. is required'),
	nic: yup
		.string()
		.trim()
		.matches(
			/^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/,
			'Enter a valid NIC'
		)
		.required('NIC is required'),
	ALDistrict: yup
		.string()
		.oneOf(
			districts.map(({ district }) => district),
			'Invalid district'
		)
		.required('A/L Administrative District is required'),
	ALIndexNo: yup
		.string()
		.matches(/^[0-9]{7}$/, 'Invalid Index No.')
		.required('A/L Index No. is required'),
	title: yup
		.string()
		.oneOf(titles, 'Invalid title')
		.required('Title is required'),
	nameWithInitials: yup
		.string()
		.min(2, 'Too Short')
		.required('Name with Initials is required'),
	fullName: yup
		.string()
		.min(2, 'Too Short')
		.required('Full name is required'),
	address: yup.object().shape({
		distance: yup
			.number()
			.min(0, 'Distance cannot be negative')
			.max(1340, 'Invalid distance')
			.required('Distance to University is required'),
		street: yup.string().required('Street is required'),
		city: yup.string().required('City is required'),
		district: yup
			.string()
			.oneOf(
				districts.map(({ district }) => district),
				'Invalid district'
			)
			.required('District is required'),
		DSDivision: yup.string().when('district', (value, schema) => {
			return value
				? yup
						.string()
						.oneOf(
							districts
								.find(({ district }) => district === value)
								.DSDivisions.map(({ division }) => division),
							'Invalid D. S. Division'
						)
						.required('D. S. Division is required')
				: yup.string().required('D. S. Division is required')
		}),
		GSDivision: yup
			.string()
			.when(
				['district', 'DSDivision'],
				(district, DSDivision, schema) => {
					return district &&
						DSDivision &&
						districts
							.find(({ district: x }) => x === district)
							.DSDivisions.find(
								({ division }) => division === DSDivision
							)
						? yup
								.string()
								.oneOf(
									districts
										.find(
											({ district: x }) => x === district
										)
										.DSDivisions.find(
											({ division }) =>
												division === DSDivision
										).GSDivisions,
									'Invalid G. S. Division'
								)
								.required()
						: yup.string().required('G. S. Division is required')
				}
			)
	}),
	email: yup.string().email('Invalid email').required('Email is required'),
	faculty: yup
		.string()
		.oneOf(faculties, 'Invalid faculties')
		.required('Faculty is required'),
	course: yup.string().when('faculty', (value, schema) => {
		return value
			? yup
					.string()
					.oneOf(
						courses.find(({ faculty }) => faculty === value)
							.courses,
						'Invalid course'
					)
					.required('Course of Study is required')
			: yup.string().required('Course of Study is required')
	}),
	zScore: yup
		.number('Invalid Z score')
		// .matches(/^[0-4](\.[0-9]{2})$/, 'Invalid Z score')
		.min(0.0, 'Minimum is 0.0')
		.max(4.0, 'Maximum is 4.0')
		.required('Z score is required'),
	phone: yup
		.string()
		.matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/, 'Invalid phone number.')
		.required('Phone is required'),
	employed: yup
		.boolean()
		.default(false)
		.required('State whether employed or not'),
	employment: yup.object().when(
		'employed',

		{
			is: true,
			then: yup.object().shape({
				establishment: yup
					.string()
					.required('Establishment is required'),
				designation: yup.string().required('Designation is required'),
				salary: yup
					.number()
					.min(0, 'Salary cannot be negative')
					.required('Salary is required'),
				dateOfEmployment: yup
					.date()
					.max(new Date(), 'Date of Employment cannot be in future')
					.required('Date of Employment is required'),
				address: yup.object().shape({
					city: yup.string().required('City is required'),
					street: yup.string().required('Street is required'),
					district: yup
						.string()
						.oneOf(
							districts.map(({ district }) => district),
							'Invalid district'
						)
						.required('Street is required')
				})
			}),
			otherwise: yup.object().strip()
		}
	),
	married: yup
		.boolean()
		.default(false)
		.required('State whether married or not'),
	spouse: yup.object().when('married', {
		is: true,
		then: yup.object().shape({
			name: yup.string().required('Name is required'),
			dateOfMarriage: yup
				.date()
				.max(new Date(), 'Date of Marriage cannot be in future')
				.required('Date of Marriage is required'),
			employment: yup.object().shape({
				establishment: yup
					.string()
					.required('Establishment is required'),
				designation: yup.string().required('Designation is required'),
				salary: yup
					.number()
					.min(0, 'Salary cannot be negative')
					.required('Salary is required'),
				dateOfEmployment: yup
					.date()
					.max(new Date(), 'Date of Employment cannot be in future')
					.required('Date of Employment is required')
			})
		}),
		otherwise: yup.object().strip()
	}),
	father: yup.object().shape({
		name: yup.string().required("Father's name is required"),
		living: yup.boolean().required('This field is required'),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.positive('Age cannot be negative')
				.max(
					123,
					'World record for oldest person is 122 years and 164 days :)'
				)
				.required('Age is required, if living'),
			otherwise: yup.number().strip()
		}),
		employment: yup.object().when('living', {
			is: true,
			then: yup.object().shape({
				occupation: yup.string().required('Occupation is required'),
				salary: yup
					.number()
					.min(0, 'Salary cannot be negative')
					.required('Salary is required'),
				dateOfEmployment: yup
					.date()
					.max(new Date(), 'Date of Employment cannot be in future')
					.required('Date of Employment is required'),
				address: yup.string().required('Address is required')
			}),
			otherwise: yup.object().strip()
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Occupation or pension income is required'),
			houseAndProperty: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('House & property income is required'),
			otherSources: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Income from other sources is required')
		})
	}),
	mother: yup.object().shape({
		name: yup.string().required("Mother's name is required"),
		living: yup.boolean().required('This field is required'),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.positive('Age cannot be negative')
				.max(
					123,
					'World record for oldest person is 122 years and 164 days :)'
				)
				.required('Age is required, if living'),
			otherwise: yup.number().strip()
		}),
		employment: yup.object().when('living', {
			is: true,
			then: yup.object().shape({
				occupation: yup.string().required('Occupation is required'),
				salary: yup
					.number()
					.min(0, 'Salary cannot be negative')
					.required('Salary is required'),
				dateOfEmployment: yup
					.date()
					.max(new Date(), 'Date of Employment cannot be in future')
					.required('Date of Employment is required'),
				address: yup.string().required('Address is required')
			}),
			otherwise: yup.object().strip()
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Occupation or pension income is required'),
			houseAndProperty: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('House & property income is required'),
			otherSources: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Income from other sources is required')
		})
	}),
	isLivingWithGuardian: yup.boolean().required('This field is required'),
	guardian: yup.object().when('isLivingWithGuardian', {
		is: true,
		then: yup.object().shape({
			name: yup.string().required(),
			living: yup.boolean().required(),
			address: yup.string().required(),
			age: yup
				.number()
				.positive('Age cannot be negative')
				.max(123, 'Invalid age')
				.required(),
			post: yup.string().min(3, 'Too short').required(),
			annualIncome: yup.object().shape({
				houseAndPropertyOrTemple: yup
					.number()
					.min(0, 'Income cannot be negative')
					.required(),
				salary: yup
					.number()
					.min(0, 'Income cannot be negative')
					.required()
			})
		}),
		otherwise: yup.object().strip()
	}),
	siblingsUnder19: yup
		.array()
		.of(
			yup.object().shape({
				name: yup
					.string()
					.min(2, 'Too Short')
					.required('Name is required'),
				dob: yup
					.date()
					.min(
						new Date(
							new Date().setYear(new Date().getFullYear() - 19)
						),
						'Invalid date'
					)
					.max(new Date(), 'Date of Birth cannot be in future')
					.required('Date of Birth is required'),
				age: yup
					.number()
					.positive('Age cannot be negative')
					.max(123, 'Invalid age')
					.required('Age is required'),
				schoolOrInstitute: yup
					.string()
					.max(123, 'Invalid age')
					.required('Academic year is required')
			})
		)
		.optional(),
	siblingsAtUniversity: yup
		.array()
		.of(
			yup.object().shape({
				name: yup
					.string()
					.min(2, 'Too Short')
					.required('Name is required'),
				regNo: yup.string().required('Registration No. is required'),
				institute: yup.string().required('Institute is required'),
				academicYear: yup
					.number()

					.min(new Date().getFullYear() - 7, 'Invalid Academic year')
					.max(
						new Date().getFullYear(),
						'Academic year cannot exceed current year.'
					)
					.required('Academic year is required'),
				course: yup.string().required('Course is required'),
				isBursaryOrMahapolaRecipient: yup.boolean().required()
			})
		)
		.optional(),
	incomeFromHouses: yup
		.array()
		.of(
			yup.object().shape({
				name: yup
					.string()
					.min(2, 'Too Short')
					.required('Name is required'),
				relationship: yup.string().required('Relationship is required'),
				assessmentNo: yup
					.string()
					.required('Assessment No. is required'),
				noOfHouseholders: yup
					.number()
					.required('No. of Householders is required'),
				address: yup.string().required('Address is required'),
				annualIncome: yup
					.number()

					.min(0, 'Annual income cannot be negative')
					.required('Annual Income is requied')
			})
		)
		.optional(),
	incomeFromEstateFieldsLands: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().required('Name is required'),
				relationship: yup
					.string()
					.required('Relationship No. is required'),
				location: yup.string().required('Location is required'),
				natureOfCultivation: yup
					.string()
					.required('Nature of Cultivation is required'),
				extentOfLandAndDetails: yup
					.string()
					.required('Extent of Land & Details are required'),
				annualIncome: yup
					.number()
					.min(0, 'Annual income cannot be negative')
					.required('Annual Income is requied')
			})
		)
		.optional()
})

function ApplicationForm({ setApplication, onClick }) {
	const classes = useStyles()

	return (
		<Paper className={classes.paper}>
			<Instruction />

			<Formik
				initialValues={
					JSON.parse(localStorage.getItem('application')) ||
					initialValues
				}
				// initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log(validationSchema.cast(values))
					// localStorage.setItem('application', JSON.stringify(values))
					setApplication(validationSchema.cast(values))
					onClick()
					setSubmitting(false)
				}}
			>
				{({ submitForm, isSubmitting, values }) => (
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Form>
							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Identification
									</Typography>
									<Typography variant="body2" color="initial">
										If Index No. is not provided, please
										contact relevant department before
										filling the application
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												label="Registration No."
												name="regNo"
												placeholder="Eg. 20XX/XXX/XXX"
												helperText="If not provided, contact Welfare Dept."
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												label="NIC"
												name="nic"
												placeholder="Eg. XXXXXXXXXV"
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Academic Details
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank.
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												name="faculty"
												label="Faculty"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{faculties
													.sort()
													.map(option => (
														<MenuItem
															key={option}
															value={option}
														>
															{option}
														</MenuItem>
													))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={5}>
											<FastField
												component={TextField}
												type="text"
												name="course"
												label="Course of Study"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{values.faculty &&
													courses.find(
														({ faculty }) =>
															faculty ===
															values.faculty
													).courses &&
													courses
														.find(
															({ faculty }) =>
																faculty ===
																values.faculty
														)
														.courses.sort()
														.map(option => (
															<MenuItem
																key={option}
																value={option}
															>
																{option}
															</MenuItem>
														))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={3}>
											<FastField
												component={TextField}
												type="text"
												label="A / L Index No."
												name="ALIndexNo"
												placeholder="XXXXXXX"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												name="ALDistrict"
												label="A / L Administrative District"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{districts
													.map(
														({ district }) =>
															district
													)
													.sort()
													.map(option => (
														<MenuItem
															key={option}
															value={option}
														>
															{option}
														</MenuItem>
													))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={3}>
											<FastField
												inputProps={{
													step: '0.01'
												}}
												component={TextField}
												placeholder="Eg. X.XX"
												type="number"
												label="Z score"
												name="zScore"
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Personal Details
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank.
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={2}>
											<FastField
												component={TextField}
												type="text"
												name="title"
												label="Title"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												{titles.map(option => (
													<MenuItem
														key={option}
														value={option}
													>
														{option}
													</MenuItem>
												))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={10}>
											<FastField
												component={TextField}
												type="text"
												label="Name with Initials"
												name="nameWithInitials"
											/>
										</Grid>
										<Grid item xs={12} sm={12}>
											<FastField
												component={TextField}
												type="text"
												label="Full Name"
												name="fullName"
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Address
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank. State
										your permanent Address here.
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={8}>
											<FastField
												component={TextField}
												type="text"
												label="Street"
												name="address.street"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												label="City"
												name="address.city"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												name="address.district"
												label="District"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{districts
													.map(
														({ district }) =>
															district
													)
													.sort()
													.map(option => (
														<MenuItem
															key={option}
															value={option}
														>
															{option}
														</MenuItem>
													))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												name="address.DSDivision"
												label="D. S. Division"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{values.address.district &&
													districts.find(
														({ district }) =>
															district ===
															values.address
																.district
													) &&
													districts
														.find(
															({ district }) =>
																district ===
																values.address
																	.district
														)
														.DSDivisions.map(
															({ division }) =>
																division
														)
														.sort()
														.map(option => (
															<MenuItem
																key={option}
																value={option}
															>
																{option}
															</MenuItem>
														))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												name="address.GSDivision"
												label="G. S. Division"
												select
												InputLabelProps={{
													shrink: true
												}}
											>
												<MenuItem value="">
													N/A
												</MenuItem>
												{values.address.district &&
													values.address.DSDivision &&
													districts
														.find(
															({ district }) =>
																district ===
																values.address
																	.district
														)
														.DSDivisions.find(
															({ division }) =>
																division ===
																values.address
																	.DSDivision
														) &&
													districts
														.find(
															({ district }) =>
																district ===
																values.address
																	.district
														)
														.DSDivisions.find(
															({ division }) =>
																division ===
																values.address
																	.DSDivision
														)
														.GSDivisions.sort()
														.map(option => (
															<MenuItem
																key={option}
																value={option}
															>
																{option}
															</MenuItem>
														))}
											</FastField>
										</Grid>
										<Grid item xs={12} sm={3}>
											<FastField
												component={TextField}
												type="number"
												label="Distance to University"
												inputProps={{
													step: 1
												}}
												InputProps={{
													endAdornment: (
														<InputAdornment position="start">
															km
														</InputAdornment>
													)
												}}
												name="address.distance"
												helperText="Distance from permanent address to university in km."
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Contact
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank.
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={8}>
											<FastField
												component={TextField}
												type="text"
												label="Email"
												name="email"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FastField
												component={TextField}
												type="text"
												label="Phone"
												name="phone"
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Employment Details
									</Typography>
									<Typography variant="body2" color="initial">
										Provide your Employment details, If you
										are employed by selecting the checkbox
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid item xs={12}>
										<Box mb={2}>
											<FormControlLabel
												control={
													<FastField
														component={Checkbox}
														type="checkbox"
														name="employed"
														color="primary"
														size="small"
													/>
												}
												label="Employed"
											/>
										</Box>
									</Grid>
									<Collapse in={values.employed}>
										<Fade
											{...(values.employed
												? { timeout: 700 }
												: {})}
											in={values.employed}
										>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={7}>
													<FastField
														component={TextField}
														type="text"
														label="Name of Establishment or Department"
														name="employment.establishment"
													/>
												</Grid>
												<Grid item xs={12} sm={5}>
													<FastField
														component={TextField}
														type="text"
														label="Designation"
														name="employment.designation"
													/>
												</Grid>
												<Grid item xs={12} sm={5}>
													<FastField
														component={TextField}
														type="number"
														label="Salary"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	Rs.{' '}
																</InputAdornment>
															)
														}}
														name="employment.salary"
													/>
												</Grid>
												<Grid item xs={12} sm={7}>
													<FastField
														component={TextField}
														type="text"
														label="Street"
														name="employment.address.street"
													/>
												</Grid>
												<Grid item xs={12} sm={4}>
													<FastField
														component={TextField}
														type="text"
														label="City"
														name="employment.address.city"
													/>
												</Grid>
												<Grid item xs={12} sm={4}>
													<FastField
														component={TextField}
														type="text"
														name="employment.address.district"
														label="District"
														select
														InputLabelProps={{
															shrink: true
														}}
													>
														<MenuItem value="">
															N/A
														</MenuItem>
														{districts
															.map(
																({
																	district
																}) => district
															)
															.sort()
															.map(option => (
																<MenuItem
																	key={option}
																	value={
																		option
																	}
																>
																	{option}
																</MenuItem>
															))}
													</FastField>
												</Grid>
												<Grid item xs={12} sm={4}>
													<FastField
														component={
															KeyboardDatePicker
														}
														name="employment.dateOfEmployment"
														label="Date of Employment"
														format="dd/MM/yyyy"
													/>
												</Grid>
											</Grid>
										</Fade>
									</Collapse>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item xs={12} md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										{/* Siblings Details  */}
										Family Details
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank. To add a
										sibling click{' '}
										<AddIcon
											style={{
												fontSize: 16,
												verticalAlign: '-3px'
											}}
											color="secondary"
										/>
										and to remove a sibling click{' '}
										<DeleteIcon
											style={{
												fontSize: 16,
												verticalAlign: '-3px'
											}}
											color="secondary"
										/>
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Siblings under the age of 19
											</Typography>
											<Typography
												variant="body2"
												color="initial"
											>
												State details of siblings (or
												Rev. siblings) or children (if
												married) in school, who are 19
												years or under. You should be
												prepared to produce a birth
												certificate, if necessary.
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<FieldArray
												name="siblingsUnder19"
												render={arrayHelpers => (
													<Grid container spacing={2}>
														{values.siblingsUnder19.map(
															(
																sibling,
																index
															) => (
																<React.Fragment
																	key={index}
																>
																	<Grid
																		item
																		container
																		justify="space-between"
																		xs={12}
																	>
																		<Typography>
																			{sibling.name
																				? `${sibling.name}'s details`
																				: ''}
																		</Typography>
																		<IconButton
																			aria-label="remove-sibling"
																			color="secondary"
																			size="small"
																			onClick={() =>
																				arrayHelpers.remove(
																					index
																				)
																			}
																		>
																			<DeleteIcon fontSize="inherit" />
																		</IconButton>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={12}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Name"
																			name={`siblingsUnder19[${index}].name`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				KeyboardDatePicker
																			}
																			type="text"
																			label="Date Of Birth"
																			name={`siblingsUnder19[${index}].dob`}
																			format="dd/MM/yyyy"
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={2}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="number"
																			label="Age"
																			name={`siblingsUnder19[${index}].age`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={6}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Name of School/Institute attended"
																			name={`siblingsUnder19[${index}].schoolOrInstitute`}
																		/>
																	</Grid>
																</React.Fragment>
															)
														)}
														<Grid item xs={12}>
															<Button
																variant="contained"
																color="secondary"
																size="small"
																startIcon={
																	<AddIcon fontSize="small" />
																}
																onClick={() =>
																	arrayHelpers.push(
																		{
																			name: '',
																			dob: '',
																			age: '',
																			schoolOrInstitute:
																				''
																		}
																	)
																}
															>
																Add sibling /
																child
															</Button>
														</Grid>
													</Grid>
												)}
											/>
										</Grid>

										<Grid item xs={12}>
											<Box my={2}>
												<Divider />
											</Box>
										</Grid>

										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Siblings At University/Institute
											</Typography>
											<Typography
												variant="body2"
												color="initial"
											>
												State details of any siblings
												following courses of study at
												any university / campus /
												institute of athletic studies /
												institute of indigenous
												medicine.
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<FieldArray
												name="siblingsAtUniversity"
												render={arrayHelpers => (
													<Grid container spacing={2}>
														{values.siblingsAtUniversity.map(
															(
																sibling,
																index
															) => (
																<React.Fragment
																	key={index}
																>
																	<Grid
																		item
																		container
																		justify="space-between"
																		xs={12}
																	>
																		<Typography>
																			{sibling.name
																				? `${sibling.name}'s details`
																				: ''}
																		</Typography>
																		<IconButton
																			aria-label="remove-sibling"
																			color="secondary"
																			size="small"
																			onClick={() =>
																				arrayHelpers.remove(
																					index
																				)
																			}
																		>
																			<DeleteIcon fontSize="inherit" />
																		</IconButton>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={9}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Name"
																			name={`siblingsAtUniversity[${index}].name`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={3}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="number"
																			label="Academic Year"
																			name={`siblingsAtUniversity[${index}].academicYear`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={3}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Resiteration No."
																			name={`siblingsAtUniversity[${index}].regNo`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={5}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="University/Institute"
																			name={`siblingsAtUniversity[${index}].institute`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Course of Study"
																			name={`siblingsAtUniversity[${index}].course`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																	>
																		<FormControlLabel
																			control={
																				<FastField
																					component={
																						Checkbox
																					}
																					type="checkbox"
																					name={`siblingsAtUniversity[${index}].isBursaryOrMahapolaRecipient`}
																					color="primary"
																					size="small"
																				/>
																			}
																			label={
																				sibling.name
																					? `Yes, ${sibling.name} is a Bursary/Mahapola recipient`
																					: `Yes, sibling is a Bursary/Mahapola recipient`
																			}
																		/>
																	</Grid>
																</React.Fragment>
															)
														)}
														<Grid item xs={12}>
															<Button
																variant="contained"
																color="secondary"
																size="small"
																startIcon={
																	<AddIcon fontSize="small" />
																}
																onClick={() =>
																	arrayHelpers.push(
																		{
																			name: '',
																			regNo: '',
																			institute:
																				'',
																			academicYear:
																				'',
																			course: '',
																			isBursaryOrMahapolaRecipient: false
																		}
																	)
																}
															>
																Add sibling
															</Button>
														</Grid>
													</Grid>
												)}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							{/* Income Details */}
							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Income Details
									</Typography>
									<Typography variant="body2" color="initial">
										No Fields should be left blank. To add a
										field click{' '}
										<AddIcon
											style={{
												fontSize: 16,
												verticalAlign: '-3px'
											}}
											color="secondary"
										/>
										and to remove a field click{' '}
										<DeleteIcon
											style={{
												fontSize: 16,
												verticalAlign: '-3px'
											}}
											color="secondary"
										/>
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Income from Houses
											</Typography>
											<Typography
												variant="body2"
												color="initial"
											>
												State income from houses.
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<FieldArray
												name="incomeFromHouses"
												render={arrayHelpers => (
													<Grid container spacing={2}>
														{values.incomeFromHouses.map(
															(house, index) => (
																<React.Fragment
																	key={index}
																>
																	<Grid
																		item
																		container
																		justify="space-between"
																		xs={12}
																	>
																		<Typography>
																			{house.name
																				? `${house.name}'s House details`
																				: ''}
																		</Typography>
																		<IconButton
																			aria-label="remove-sibling"
																			color="secondary"
																			size="small"
																			onClick={() =>
																				arrayHelpers.remove(
																					index
																				)
																			}
																		>
																			<DeleteIcon fontSize="inherit" />
																		</IconButton>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={12}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Owners' Name"
																			name={`incomeFromHouses[${index}].name`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={6}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Address"
																			name={`incomeFromHouses[${index}].address`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={6}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Relationship"
																			name={`incomeFromHouses[${index}].relationship`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Assessment No."
																			name={`incomeFromHouses[${index}].assessmentNo`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="number"
																			label="No. of House-holders"
																			name={`incomeFromHouses[${index}].noOfHouseholders`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="number"
																			label="Annual Income"
																			InputProps={{
																				startAdornment:
																					(
																						<InputAdornment position="start">
																							Rs.{' '}
																						</InputAdornment>
																					)
																			}}
																			name={`incomeFromHouses[${index}].annualIncome`}
																		/>
																	</Grid>
																</React.Fragment>
															)
														)}
														<Grid item xs={12}>
															<Button
																variant="contained"
																color="secondary"
																size="small"
																startIcon={
																	<AddIcon fontSize="small" />
																}
																onClick={() =>
																	arrayHelpers.push(
																		{
																			name: '',
																			relationship:
																				'',
																			assessmentNo:
																				'',
																			noOfHouseholders:
																				'',
																			address:
																				'',
																			annualIncome:
																				''
																		}
																	)
																}
															>
																Add House
															</Button>
														</Grid>
													</Grid>
												)}
											/>
										</Grid>

										<Grid item xs={12}>
											<Divider
												style={{ margin: '24px 0' }}
											/>
										</Grid>

										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Income from property ( Estate /
												Fields / Lands )
											</Typography>
											<Typography
												variant="body2"
												color="initial"
											>
												State income from estates,
												fields, lands, etc.
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<FieldArray
												name="incomeFromEstateFieldsLands"
												render={arrayHelpers => (
													<Grid container spacing={2}>
														{values.incomeFromEstateFieldsLands.map(
															(
																property,
																index
															) => (
																<React.Fragment
																	key={index}
																>
																	<Grid
																		item
																		container
																		justify="space-between"
																		xs={12}
																	>
																		<Typography>
																			{property.name
																				? `${property.name}'s property details`
																				: ''}
																		</Typography>
																		<IconButton
																			aria-label="remove-sibling"
																			color="secondary"
																			size="small"
																			onClick={() =>
																				arrayHelpers.remove(
																					index
																				)
																			}
																		>
																			<DeleteIcon fontSize="inherit" />
																		</IconButton>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={12}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Owners' Name"
																			name={`incomeFromEstateFieldsLands[${index}].name`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={6}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Location"
																			name={`incomeFromEstateFieldsLands[${index}].location`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={6}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Relationship"
																			name={`incomeFromEstateFieldsLands[${index}].relationship`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={8}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			label="Nature of Cultivation"
																			name={`incomeFromEstateFieldsLands[${index}].natureOfCultivation`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																		sm={4}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="number"
																			label="Annual Income"
																			InputProps={{
																				startAdornment:
																					(
																						<InputAdornment position="start">
																							Rs.{' '}
																						</InputAdornment>
																					)
																			}}
																			name={`incomeFromEstateFieldsLands[${index}].annualIncome`}
																		/>
																	</Grid>
																	<Grid
																		item
																		xs={12}
																	>
																		<FastField
																			component={
																				TextField
																			}
																			type="text"
																			multiline
																			rows={
																				2
																			}
																			label="Extent Of Cultivation"
																			name={`incomeFromEstateFieldsLands[${index}].extentOfLandAndDetails`}
																		/>
																	</Grid>
																</React.Fragment>
															)
														)}
														<Grid xs={12} item>
															<Button
																variant="contained"
																color="secondary"
																size="small"
																startIcon={
																	<AddIcon fontSize="small" />
																}
																onClick={() =>
																	arrayHelpers.push(
																		{
																			name: '',
																			relationship:
																				'',
																			location:
																				'',
																			natureOfCultivation:
																				'',
																			extentOfLandAndDetails:
																				'',
																			annualIncome:
																				''
																		}
																	)
																}
															>
																Add property
															</Button>
														</Grid>
													</Grid>
												)}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{ padding: '32px 8px' }}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Marriage Details
									</Typography>
									<Typography variant="body2" color="initial">
										Provide your Marriage details, If you
										are married by selecting the checkbox
									</Typography>
								</Grid>
								<Grid container item md={9}>
									<Grid item xs={12}>
										<Box mb={2}>
											<FormControlLabel
												control={
													<FastField
														component={Checkbox}
														type="checkbox"
														name="married"
														color="primary"
														size="small"
													/>
												}
												label="Married"
											/>
										</Box>
									</Grid>
									<Collapse
										in={values.married}
										mountOnEnter
										unmountOnExit
									>
										<Fade
											{...(values.married
												? { timeout: 700 }
												: {})}
											in={values.married}
										>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<FastField
														component={TextField}
														type="text"
														label="Name of Spouse"
														name="spouse.name"
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<FastField
														component={
															KeyboardDatePicker
														}
														name="spouse.dateOfMarriage"
														label="Date of Marriage"
														format="dd/MM/yyyy"
													/>
												</Grid>
												<Grid item xs={12}>
													<Typography
														variant="subtitle1"
														color="initial"
													>
														Spouse Employment
														Details
													</Typography>
												</Grid>
												<Grid item xs={12} sm={7}>
													<FastField
														component={TextField}
														type="text"
														label="Name of Establishment or Department"
														name="spouse.employment.establishment"
													/>
												</Grid>
												<Grid item xs={12} sm={5}>
													<FastField
														component={TextField}
														type="text"
														label="Designation"
														name="spouse.employment.designation"
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<FastField
														component={TextField}
														type="number"
														label="Salary"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	Rs.{' '}
																</InputAdornment>
															)
														}}
														name="spouse.employment.salary"
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<FastField
														component={
															KeyboardDatePicker
														}
														name="spouse.employment.dateOfEmployment"
														label="Date of Employment"
														format="dd/MM/yyyy"
													/>
												</Grid>
											</Grid>
										</Fade>
									</Collapse>
								</Grid>
							</Grid>

							<Divider variant="middle" />

							<Grid
								container
								spacing={2}
								style={{
									padding: '32px 8px',
									paddingBottom: '0'
								}}
							>
								<Grid item md={3}>
									<Typography
										variant="h6"
										color="initial"
										gutterBottom
									>
										Parent/Guardian Details
									</Typography>
									<Typography
										variant="body2"
										color="initial"
										gutterBottom
									>
										No Fields should be left blank. State
										whether particular individual is living
										or not using the checkbox.
									</Typography>
									<Alert
										severity="warning"
										variant="outlined"
										size="small"
										style={{ marginTop: '16px' }}
									>
										If the particular individual is not
										living original death certificate should
										be attached
									</Alert>
								</Grid>
								<Grid container item md={9}>
									<Grid container spacing={2}>
										{/* father details */}
										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Father's Details
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<FastField
												component={TextField}
												type="text"
												label="Full name"
												name="father.name"
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControlLabel
												control={
													<FastField
														component={Checkbox}
														type="checkbox"
														name="father.living"
														color="primary"
														size="small"
													/>
												}
												label="Living"
											/>
										</Grid>
										<Grid item xs={12}>
											<Collapse
												in={values.father.living}
												mountOnEnter
												unmountOnExit
											>
												<Fade
													{...(values.father.living
														? { timeout: 700 }
														: {})}
													in={values.father.living}
												>
													<Grid container spacing={2}>
														<Grid
															item
															xs={12}
															sm={4}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Age"
																name="father.age"
																helperText="State the age, if living"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={8}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Occupation"
																name="father.employment.occupation"
																helperText="If not living  or retired, employment prior to death or retirement"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={6}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Salary"
																InputProps={{
																	startAdornment:
																		(
																			<InputAdornment position="start">
																				Rs.{' '}
																			</InputAdornment>
																		)
																}}
																name="father.employment.salary"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={6}
														>
															<FastField
																component={
																	KeyboardDatePicker
																}
																name="father.employment.dateOfEmployment"
																label="Date of Employment"
																format="dd/MM/yyyy"
															/>
														</Grid>
														<Grid item xs={12}>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Address of workplace"
																name="father.employment.address"
																helperText="State the place worked/working"
															/>
														</Grid>
													</Grid>
												</Fade>
											</Collapse>
										</Grid>
										<Grid item xs={12}>
											<Typography
												variant="body2"
												color="initial"
											>
												Father's Annual Income
											</Typography>
											<Typography
												variant="caption"
												color="textSecondary"
											>
												State annual income of
												particulars from 01
												<sup>st</sup> of January to 31
												<sup>st</sup> December{' '}
												{new Date().getFullYear()}
											</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from occupation or pension"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="father.annualIncome.occupationOrPension"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from house and property"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="father.annualIncome.houseAndProperty"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from all other sources"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="father.annualIncome.otherSources"
											/>
										</Grid>

										<Grid item xs={12}>
											<Divider
												style={{ margin: '24px 0' }}
											/>
										</Grid>

										{/* mother details */}
										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Mother's Details
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<FastField
												component={TextField}
												type="text"
												label="Full name"
												name="mother.name"
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControlLabel
												control={
													<FastField
														component={Checkbox}
														type="checkbox"
														name="mother.living"
														color="primary"
														size="small"
													/>
												}
												label="Living"
											></FormControlLabel>
										</Grid>
										<Grid item xs={12}>
											<Collapse
												in={values.mother.living}
												mountOnEnter
												unmountOnExit
											>
												<Fade
													{...(values.mother.living
														? { timeout: 700 }
														: {})}
													in={values.mother.living}
												>
													<Grid container spacing={2}>
														<Grid
															item
															xs={12}
															sm={4}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Age"
																name="mother.age"
																helperText="State the age, if living"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={8}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Occupation"
																name="mother.employment.occupation"
																helperText="If not living  or retired, employment prior to death or retirement"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={7}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Salary"
																InputProps={{
																	startAdornment:
																		(
																			<InputAdornment position="start">
																				Rs.{' '}
																			</InputAdornment>
																		)
																}}
																name="mother.employment.salary"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={5}
														>
															<FastField
																component={
																	KeyboardDatePicker
																}
																name="mother.employment.dateOfEmployment"
																label="Date of Employment"
																format="dd/MM/yyyy"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															md={12}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Address of workplace"
																name="mother.employment.address"
																helperText="State the place worked/working"
															/>
														</Grid>
													</Grid>
												</Fade>
											</Collapse>
										</Grid>
										<Grid item xs={12}>
											<Typography
												variant="body2"
												color="initial"
											>
												Mother's Annual Income
											</Typography>
											<Typography
												variant="caption"
												color="textSecondary"
											>
												State annual income of
												particulars from 01
												<sup>st</sup> of January to 31
												<sup>st</sup> December{' '}
												{new Date().getFullYear()}
											</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from occupation or pension"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="mother.annualIncome.occupationOrPension"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from house and property"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="mother.annualIncome.houseAndProperty"
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<FastField
												component={TextField}
												type="number"
												label="Income from all other sources"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															Rs.{' '}
														</InputAdornment>
													)
												}}
												name="mother.annualIncome.otherSources"
											/>
										</Grid>

										<Grid item xs={12}>
											<Divider
												style={{ margin: '24px 0' }}
											/>
										</Grid>

										{/* guardian details */}
										<Grid item xs={12}>
											<Typography
												variant="subtitle1"
												color="initial"
												style={{
													fontWeight: '500'
												}}
											>
												Guardian's Details
											</Typography>
											<Typography
												variant="caption"
												color="textSecondary"
											>
												This section should be filled by
												orphans or clergy or any other
												applicant who under the custody
												of a legal guardian
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<Box mb={2}>
												<FormControlLabel
													control={
														<FastField
															component={Checkbox}
															type="checkbox"
															name="isLivingWithGuardian"
															color="primary"
															size="small"
														/>
													}
													label="Yes, I live with a guardian"
												/>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Collapse
												in={values.isLivingWithGuardian}
											>
												<Fade
													{...(values.isLivingWithGuardian
														? { timeout: 700 }
														: {})}
													in={
														values.isLivingWithGuardian
													}
												>
													<Grid container spacing={2}>
														<Grid
															item
															xs={12}
															sm={10}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Full name"
																name="guardian.name"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={2}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Age"
																name="guardian.age"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={8}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Address"
																name="guardian.address"
																helperText="State the permanent address here"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={4}
														>
															<FastField
																component={
																	TextField
																}
																type="text"
																label="Post"
																name="guardian.post"
																helperText="State the post, if employed"
															/>
														</Grid>
														<Grid item xs={12}>
															<Typography
																variant="body2"
																color="initial"
															>
																Guardian's
																Annual Income
															</Typography>
															<Typography
																variant="caption"
																color="textSecondary"
															>
																State annual
																income of
																particulars from
																01
																<sup>st</sup> of
																January to 31
																<sup>
																	st
																</sup>{' '}
																December{' '}
																{new Date().getFullYear()}
															</Typography>
														</Grid>
														<Grid
															item
															xs={12}
															sm={5}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Salary"
																InputProps={{
																	startAdornment:
																		(
																			<InputAdornment position="start">
																				Rs.{' '}
																			</InputAdornment>
																		)
																}}
																name="guardian.annualIncome.salary"
															/>
														</Grid>
														<Grid
															item
															xs={12}
															sm={7}
														>
															<FastField
																component={
																	TextField
																}
																type="number"
																label="Income from house & property/temple"
																InputProps={{
																	startAdornment:
																		(
																			<InputAdornment position="start">
																				Rs.{' '}
																			</InputAdornment>
																		)
																}}
																name="guardian.annualIncome.houseAndPropertyOrTemple"
															/>
														</Grid>
													</Grid>
												</Fade>
											</Collapse>
										</Grid>
									</Grid>
								</Grid>
								<Grid container item justify="flex-end">
									<Button
										disabled={isSubmitting}
										onClick={submitForm}
										variant="contained"
										color="primary"
										margin="normal"
										slot="right"
										className={classes.btn}
									>
										Apply
									</Button>
								</Grid>
							</Grid>
						</Form>
					</MuiPickersUtilsProvider>
				)}
			</Formik>
		</Paper>
	)
}

const mapStateToProps = state => ({
	email: state.user.data.email
})

export default connect(mapStateToProps, {
	setApplication
})(ApplicationForm)
