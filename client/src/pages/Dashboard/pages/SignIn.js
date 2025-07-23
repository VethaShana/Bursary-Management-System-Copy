import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import MuiLink from '@material-ui/core/Link'
import { Link, useHistory } from 'react-router-dom'
import Copyright from '../../../components/Copyright'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/user'
import { Formik, Form, Field } from 'formik'
import { TextField, Checkbox } from 'formik-material-ui'
import * as yup from 'yup'

const initialValues = {
	email: '',
	password: ''
}

const validationSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().required('Password is required')
})

const onSubmit =
	(action, history) =>
	(values, { setSubmitting }) => {
		action(values, history)
			.then(() => {
				history.push('/dashboard')
				// setSubmitting(false)
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
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

function SignIn({ isLoading, loginUser, ...props }) {
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
					Sign in
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit(loginUser, history)}
				>
					{({ submitForm, isSubmitting, values }) => (
						<Form className={classes.form}>
							<Field
								component={TextField}
								type="text"
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								margin="normal"
							/>
							<Field
								component={TextField}
								type="password"
								id="password"
								label="Password"
								name="password"
								autoComplete="current-password"
								margin="normal"
							/>
							{/* <FormControlLabel
								control={
									<Checkbox
										value="remember"
										color="primary"
									/>
								}
								label="Remember me"
							/> */}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<MuiLink
										to="/dashboard/sign-up"
										variant="body2"
										component={Link}
									>
										{"Don't have an account? Sign Up"}
									</MuiLink>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	error: state.user.error
})

const mapDispatchToProps = { loginUser }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
