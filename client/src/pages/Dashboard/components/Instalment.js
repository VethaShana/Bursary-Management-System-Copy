import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { TextField } from 'formik-material-ui'
import Title from './Title'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Grid, Button, MenuItem } from '@material-ui/core'
import { KeyboardDatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { courses } from '../../../utils/data'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles(theme => ({
	form: {
		marginTop: theme.spacing(3),
	},
	context: {
		flex: 1,
	},
	btn: {
		marginTop: theme.spacing(2),
		minWidth: '150px',
		[theme.breakpoints.down('sm')]: {
			minWidth: '100%',
		},
	},
}))

const initialValues = {
	date: new Date(),
	description: '',
	courseOfStudy: 'N/A',
}

const validationSchema = yup.object({
	date: yup.date().required(),
	courseOfStudy: yup
		.string()
		.oneOf(courses, 'Invalid Course of Study')
		.required('Select a Course of Study'),
	description: yup.string(),
})

const onSubmit = () => {}

export default function Instalment() {
	const classes = useStyles()
	return (
		<React.Fragment>
			<Typography variant='h6' color='initial'>
				Issue Installment
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ submitForm, isSubmitting, touched, errors }) => (
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Field
										component={KeyboardDatePicker}
										name='date'
										label='Date of Issue'
										format='dd/MM/yyyy'
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										type='text'
										name='courseOfStudy'
										label='Course of Study'
										select
										InputLabelProps={{
											shrink: true,
										}}
									>
										<MenuItem value='N/A'>N/A</MenuItem>
										{courses.map(option => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</Field>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										type='text'
										label='Description'
										name='description'
										placeholder='Description'
										multiline
										rows={3}
										rowsMax={4}
										// helperText=''
									/>
								</Grid>
								<Grid container item justify='flex-end' xs={12}>
									<Button
										disabled={isSubmitting}
										onClick={submitForm}
										variant='outlined'
										color='primary'
										margin='normal'
										slot='right'
										className={classes.btn}
									>
										Issue
									</Button>
								</Grid>
							</Grid>
						</Form>
					</MuiPickersUtilsProvider>
				)}
			</Formik>
		</React.Fragment>
	)
}
