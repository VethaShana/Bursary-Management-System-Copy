import {
	Button,
	Grid,
	MenuItem,
	InputAdornment,
	Typography,
	LinearProgress,
	makeStyles,
} from '@material-ui/core'
import React, { forwardRef, useImperativeHandle } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { TextField, Checkbox } from 'formik-material-ui'
import { KeyboardDatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { faculties } from '../../../../utils/data'

const useStyles = makeStyles(theme => ({
	dialogContent: {
		paddingBottom: theme.spacing(2),
	},
	dialogActions: {
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
	},
}))

const academicYears = ((year, number) =>
	Array(number)
		.fill()
		.map(() => year++))(new Date().getUTCFullYear() - 5, 5)

const initialValues = {
	date: new Date(),
	faculty: 'N/A',
	academicYear: 'N/A',
	description: '',
	installments: 1,
}

const validationSchema = yup.object({
	date: yup.date().required('Date is required'),
	faculty: yup
		.string()
		.oneOf(faculties, 'Invalid Faculty')
		.required('Faculty is required'),
	academicYear: yup
		.number()
		.typeError('Academic Year is required')
		.oneOf(academicYears, 'Invalid Academic year')
		.required('Academic year is required'),
	description: yup
		.string()
		.min(3, 'Description must be atleast 3 characters')
		.required('Description is required'),
	installments: yup
		.number()
		.min(1, 'Minimimum No. of Installments is one')
		.max(10, 'Minimimum No. of Installments is ten')
		.positive('Installment should be a positive number')
		.required('Number of installments are required'),
})

const onSubmit = () => {}

const Installment = forwardRef((props, ref) => {
	const [open, setOpen] = React.useState(false)
	const classes = useStyles()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const showDialog = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit = (values, { setSubmitting }) => {
		alert(values)
	}

	useImperativeHandle(ref, () => {
		return {
			showDialog: showDialog,
		}
	})

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullScreen={fullScreen}
			fullWidth
		>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ submitForm, isSubmitting, touched, errors, values }) => (
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DialogTitle id='form-dialog-title'>Create Installment</DialogTitle>
						<DialogContent className={classes.dialogContent}>
							{/* <DialogContentText>
									Issue Installments for students.
								</DialogContentText> */}
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12}>
										<Field
											component={TextField}
											type='text'
											name='faculty'
											label='Faculty'
											select
											InputLabelProps={{
												shrink: true,
											}}
										>
											<MenuItem key={'N/A'} value={'N/A'}>
												N/A
											</MenuItem>
											{faculties.map(option => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Field>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											type='text'
											name='academicYear'
											label='Academic Year'
											select
											InputLabelProps={{
												shrink: true,
											}}
										>
											<MenuItem key={'N/A'} value={'N/A'}>
												N/A
											</MenuItem>
											{academicYears.map(option => (
												<MenuItem key={option} value={option}>
													{option}/{++option}
												</MenuItem>
											))}
										</Field>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											type='number'
											label='No. of Installments'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>#</InputAdornment>
												),
												min: 1,
												max: 10,
											}}
											name='installments'
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											type='text'
											multiline
											rows={3}
											label='Description'
											name='description'
										/>
									</Grid>
								</Grid>
							</Form>
						</DialogContent>
						{isSubmitting && <LinearProgress />}
						<DialogActions className={classes.dialogActions}>
							<Button onClick={handleClose} variant='text' autoFocus>
								Cancel
							</Button>
							<Button
								disabled={isSubmitting}
								onClick={submitForm}
								autoFocus
								variant='contained'
								color='secondary'
							>
								Add Installment
							</Button>
						</DialogActions>
					</MuiPickersUtilsProvider>
				)}
			</Formik>
		</Dialog>
	)
})

export default Installment
