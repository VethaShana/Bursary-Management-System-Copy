import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import clsx from 'clsx'
import Card from '../components/Card'
import PendingApplicationsTable from '../components/Table/PendingApplicationsTable'
import AddIcon from '@material-ui/icons/Add'
import Title from '../components/Title'

const useStyles = makeStyles(theme => ({
	title: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 240
	}
}))

function Applications() {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title="Applications"
						description="Review/Approve bursary applications, create, edit applications."
					/>
				</Grid>
				<Grid item xs={12}>
					<Box mx={2}>
						<Typography
							component="h2"
							variant="h6"
							color="primary"
							gutterBottom
						>
							Pending Applications
						</Typography>
						<Typography
							component="h6"
							variant="body2"
							color="primary"
						>
							Applications pending for Approval
						</Typography>
					</Box>
				</Grid>
				{/* Enhanced Table */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<PendingApplicationsTable />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Applications
