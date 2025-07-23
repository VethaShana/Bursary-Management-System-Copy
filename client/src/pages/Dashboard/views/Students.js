import { Grid, makeStyles, Paper, Button } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import Card from '../components/Card'
import Table from '../components/Table'
import Title from '../components/Title'
import AddIcon from '@material-ui/icons/Add'
import StudentChart from '../components/StudentChart'
import ProtectedContent from '../components/ProtectedContent'

const useStyles = makeStyles(theme => ({
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

function Students() {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title="Applications"
						description="Review bursary recipients."
					/>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Paper className={fixedHeightPaper}>
						<Card />
					</Paper>
				</Grid>
				{/* Chart */}
				<Grid item xs={12} md={8} lg={9}>
					<Paper className={fixedHeightPaper}>
						<StudentChart />
					</Paper>
				</Grid>

				<ProtectedContent role="admin">
					<Grid
						item
						container
						xs={12}
						display="flex"
						justify="flex-end"
					>
						<Button
							variant="contained"
							color="primary"
							size="small"
							startIcon={<AddIcon fontSize="small" />}
						>
							Add Student
						</Button>
					</Grid>
				</ProtectedContent>

				{/* Enhanced Table */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Table.Student />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Students
