import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiDivider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { approveStudent } from '../../../actions/students'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'

import { useSelector } from 'react-redux'
import moment from 'moment'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(4)
	}
}))

const Bar = props => {
	const { id } = props
	const history = useHistory()
	const students = useSelector(state =>
		state.students.data.filter(({ installments }) =>
			installments.map(x => x.installmentId === id)
		)
	)
	console.log(students)
	return students ? (
		<List dense>
			{students.map((data, idx) => (
				<ListItem
					key={idx}
					button
					onClick={() =>
						history.push(`/dashboard/students/${data._id}`)
					}
				>
					<ListItemText
						primary={
							<Grid
								container
								justify="space-between"
								alignItems="center"
							>
								<Grid item>
									<Typography
										variant="body2"
										component="span"
										color="textSecondary"
										style={{
											marginLeft: '10px'
										}}
									>
										{data.title} {data.nameWithInitials}
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant="subtitle1"
										component="span"
										color="primary"
									>
										{data.installments.find(
											({ installmentId }) =>
												installmentId === id
										) &&
											data.installments.find(
												({ installmentId }) =>
													installmentId === id
											).noOfInstallments}
									</Typography>
								</Grid>
							</Grid>
						}
					/>
				</ListItem>
			))}
		</List>
	) : (
		<React.Fragment></React.Fragment>
	)
}

function InstallmentInfo(props) {
	const { id, edit } = props
	const { path, url } = useRouteMatch()
	const classes = useStyles()
	const data = useSelector(state =>
		state.installments.data.find(({ _id }) => _id === id)
	)
	console.log(data)
	const dispatch = useDispatch()

	if (data)
		return (
			<Grid container spacing={4} style={{ padding: '32px 8px' }}>
				<Grid item xs={12}>
					<Paper variant="outlined" className={classes.paper}>
						<Grid container justify="space-between">
							<Grid item xs={12} sm={6}>
								<Typography
									variant="h6"
									component="span"
									color="inherit"
								>
									{data.faculty}
									<ChevronRightRoundedIcon
										fontSize="small"
										style={{ verticalAlign: '-3px' }}
									/>
									{data.course}
								</Typography>
								<Typography
									variant="subtitle2"
									color="textSecondary"
								>
									{data.academicYear}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography
									variant="subtitle2"
									color="inherit"
									align="right"
								>
									{moment(data.date).format(
										'dddd, MMMM Do YYYY'
									)}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									align="right"
								>
									Installment on
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Box mt={2}>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Description
									</Typography>
									<Typography
										variant="subtitle2"
										color="inherit"
									>
										{data.description}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Bar id={data._id} />
				</Grid>
			</Grid>
		)

	return (
		<Grid container spacing={12}>
			<Typography>No student Found</Typography>
		</Grid>
	)
}

export default InstallmentInfo
