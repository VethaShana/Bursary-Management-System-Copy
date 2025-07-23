import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import MuiLink from '@material-ui/core/Link'
import { Link } from 'react-router-dom'
import Copyright from '../../../components/Copyright'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/user'
import { Formik, Form, Field } from 'formik'
import { TextField, Checkbox } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
import { courses } from '../../../utils/data'

import * as yup from 'yup'

const faculties = courses.map(x => x.faculty)

const initialValues = {
	firstName: '',
	lastName: '',
	faculty: '',
	email: '',
	password: ''
}

const validationSchema = yup.object().shape({
	firstName: yup
		.string()
		.trim()
		.min(3, 'Too short')
		.required('First name is required'),
	lastName: yup
		.string()
		.trim()
		.min(3, 'Too short')
		.required('Last name is required'),
	faculty: yup
		.string()
		.oneOf(faculties, 'Invalid faculties')
		.required('Faculty is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required')
})

const onSubmit =
	(action, history) =>
	(values, { setSubmitting }) => {
		action(values)
			.then(() => {
				console.log(history)
				history.push('/dashboard')
				setSubmitting(false)
			})
			.catch(() => setSubmitting(false))
	}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

function SignUp({ isLoading, registerUser, ...props }) {
	const classes = useStyles()
	const history = useHistory()

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit(registerUser, history)}
				>
					{({ submitForm, isSubmitting, values }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Field
										component={TextField}
										type="text"
										name="firstName"
										autoComplete="fname"
										id="firstName"
										label="First Name"
										// autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										component={TextField}
										type="text"
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										type="text"
										id="faculty"
										name="faculty"
										label="Faculty"
										autoComplete="faculty"
										select
										InputLabelProps={{
											shrink: true
										}}
									>
										<MenuItem value="">N/A</MenuItem>
										{faculties.sort().map(option => (
											<MenuItem
												key={option}
												value={option}
											>
												{option}
											</MenuItem>
										))}
									</Field>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										type="text"
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										type="password"
										id="password"
										label="Password"
										name="password"
										autoComplete="current-password"
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Sign Up
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<MuiLink
										to="/dashboard/sign-in"
										variant="body2"
										component={Link}
									>
										Already have an account? Sign in
									</MuiLink>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	)
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	error: state.user.error
})

const mapDispatchToProps = { registerUser }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
