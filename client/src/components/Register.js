import React, { useState } from 'react'
import {
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
	Link,
	Fade,
	LinearProgress,
	Box
} from '@material-ui/core'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { registerStudent } from '../actions/user'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
	field: {
		marginBottom: theme.spacing(2)
	},
	title: {
		fontWeight: 700
	},
	btn: {
		minWidth: '120px'
	}
}))

const initialValues = {
	email: '',
	regNo: '',
	password: '',
	confirmPassword: ''
}

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	regNo: yup
		.string('Enter your Registration No.')
		.trim()
		.matches(
			/^20[0-9]{2}\/(FM|E|ET|BST|SB|SP|CSC|BAD|C|A|L|B|V|AD|AG|PHA|MLS|NUR)\/[0-9]{3}$/,
			'Enter valid Registration No.'
		)
		.required('Registration No. is required'),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Password does not match')
		.required('Confirm your password')
})
const onSubmit = (action, history) => values => {
	action(values, history).then(() => history.push('/application'))
}

function Register({
	authView,
	onAuthViewChange,
	error,
	isLoading,
	registerStudent,
	...props
}) {
	const classes = useStyles()
	const history = useHistory()
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: onSubmit(registerStudent, history)
	})

	const handleClick = e => {
		onAuthViewChange()
	}

	return (
		<Fade
			in={authView === 'register'}
			mountOnEnter
			unmountOnExit
			timeout={{ enter: 300 }}
		>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<Typography
							variant="h5"
							color="initial"
							gutterBottom
							fontWeight={700}
							className={classes.title}
						>
							Register
						</Typography>
						<Typography
							variant="body2"
							color="initial"
							gutterBottom
						>
							Register to access preliminary application
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							size="small"
							variant="outlined"
							name="regNo"
							label="Registration No."
							value={formik.values.regNo}
							onChange={formik.handleChange}
							error={
								formik.touched.regNo &&
								Boolean(formik.errors.regNo)
							}
							helperText={
								formik.touched.regNo && formik.errors.regNo
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							size="small"
							variant="outlined"
							name="email"
							label="Email"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={
								formik.touched.email &&
								Boolean(formik.errors.email)
							}
							helperText={
								formik.touched.email && formik.errors.email
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							size="small"
							variant="outlined"
							name="password"
							label="Password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password)
							}
							helperText={
								formik.touched.password &&
								formik.errors.password
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							size="small"
							variant="outlined"
							name="confirmPassword"
							label="Confirm password"
							type="password"
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword)
							}
							helperText={
								formik.touched.confirmPassword &&
								formik.errors.confirmPassword
							}
						/>
					</Grid>
					<Grid
						item
						container
						xs={12}
						alignItems="flex-end"
						style={{ marginTop: '10px' }}
					>
						<Grid item xs>
							<Link
								style={{ marginRight: '10px' }}
								onClick={handleClick}
								underline="hover"
							>
								Already have an account? Sign In
							</Link>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								size="small"
								variant="contained"
								color="secondary"
								className={classes.btn}
							>
								Register
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Box mt={2}>
					{isLoading ? <LinearProgress color="secondary" /> : null}
				</Box>
			</form>
		</Fade>
	)
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	error: state.user.error
})

const mapDispatchToProps = { registerStudent }

export default connect(mapStateToProps, mapDispatchToProps)(Register)
