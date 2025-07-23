import React from 'react'
import { Box, Grid, makeStyles, Paper } from '@material-ui/core'
import clsx from 'clsx'
import Title from '../components/Title'
import List from '../components/List'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		// height: 240
	}
}))

function Users() {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Title
						title="Users"
						description="Create users, assign roles or delete users."
					/>
				</Grid>

				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Paper className={fixedHeightPaper}>
								<List approved={true} />
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper className={fixedHeightPaper}>
								<List approved={false} />
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Users
