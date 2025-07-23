import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'

import { connect } from 'react-redux'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../actions/user'
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
	password: yup.string().required('Password is required')
})

const onSubmit = (action, history) => (values, formikHelpers) => {
	action(values, history, formikHelpers).then(() =>
		history.push('/application')
	)
}

function Login({ authView, onAuthViewChange, isLoading, ...props }) {
	const classes = useStyles()
	const history = useHistory()
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: onSubmit(props.loginUser, history)
	})

	const handleClick = e => {
		onAuthViewChange()
	}

	return (
		<Fade
			in={authView === 'login'}
			mountOnEnter
			unmountOnExit
			direction={'right'}
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
							Login
						</Typography>
						<Typography
							variant="body2"
							color="initial"
							gutterBottom
						>
							Login to access preliminary application/extended
							application (honours degree) or to view your
							application status
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
					<Grid item xs={12}>
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
								Don't have an account? Sign Up
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
								Login
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

const mapDispatchToProps = { loginUser }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
