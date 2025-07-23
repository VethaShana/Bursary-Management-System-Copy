import React from 'react'
import { Grid, makeStyles, Paper, Button, Box } from '@material-ui/core'
import clsx from 'clsx'
import Card from '../components/Card'
import Table from '../components/Table/'
import StudentChart from '../components/StudentChart'
import Instalment from '../components/Instalment'
import Title from '../components/Title'
import Toolbar from '../components/Toolbar'
import ProtectedContent from '../components/ProtectedContent'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		// height: 240,
	}
}))

function Installments() {
	const classes = useStyles()

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title="Installments"
						description="Review/Issue Installments &amp; create reports."
					/>
				</Grid>

				<ProtectedContent role="admin">
					<Grid item xs={12}>
						<Toolbar />
					</Grid>
				</ProtectedContent>

				{/* Enhanced Table */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Table.Installment />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Installments
