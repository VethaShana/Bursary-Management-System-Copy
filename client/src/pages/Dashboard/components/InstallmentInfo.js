import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiDivider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { approveStudent } from '../../../actions/students'
import moment from 'moment'

import { useSelector } from 'react-redux'
import { List, ListItem, ListItemText } from '@material-ui/core'

const TimeAgo = props => {
	const { id } = props
	const data = useSelector(state =>
		state.installments.data.find(({ _id }) => _id === id)
	)
	return <React.Fragment>{moment(data.date).fromNow()}</React.Fragment>
}

function InstallmentInfo(props) {
	const { id } = props
	const { path, url } = useRouteMatch()
	const history = useHistory()
	const data = useSelector(state =>
		state.students.data.find(({ _id }) => _id === id)
	)
	const AllData = useSelector(state => state.students.data)
	const totalInstallments = data.totalInstallments || 30
	const installments = data.installments ? data.installments : false
	const count = installments.reduce((x, { noOfInstallments }) => {
		return x + noOfInstallments
	}, 0)

	const dispatch = useDispatch()

	return (
		<Grid container spacing={4} style={{ padding: '32px 8px' }}>
			<Grid item container xs={12} justify="space-between">
				<Grid item>
					<Typography variant="button" color="textSecondary">
						Installments
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="button" color="textSecondary">
						{count}/{totalInstallments}
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				{installments ? (
					<List dense>
						{installments.map((data, idx) => (
							<ListItem
								key={idx}
								button
								onClick={() =>
									history.push(
										`/dashboard/installments/${data.installmentId}`
									)
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
												{moment(
													data.createdAt || new Date()
												).format('dddd, MMMM Do YYYY')}
												<Typography
													variant="body2"
													component="span"
													color="textSecondary"
													style={{
														marginLeft: '10px'
													}}
												>
													<TimeAgo
														id={data.installmentId}
													/>
												</Typography>
											</Grid>
											<Grid item>
												<Typography
													variant="subtitle1"
													component="span"
													color="primary"
												>
													{data.noOfInstallments}
												</Typography>
											</Grid>
										</Grid>
									}
								/>
							</ListItem>
						))}
					</List>
				) : (
					<Grid container spacing={2}>
						No installment
					</Grid>
				)}
			</Grid>
		</Grid>
	)
}

export default InstallmentInfo
