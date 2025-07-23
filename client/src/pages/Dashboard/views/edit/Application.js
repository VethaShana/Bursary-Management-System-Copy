import { Grid, makeStyles, Paper, Button } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		// display: 'flex',
		overflow: 'auto'
		// flexDirection: 'column'
	}
}))

function Edit(props) {
	const classes = useStyles()
	const { goBack } = useHistory()
	const { id } = useParams()

	const data = useSelector(state =>
		state.students.data.find(({ _id }) => _id === id)
	)

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Button
						variant="text"
						size="small"
						className={classes.button}
						startIcon={
							<KeyboardBackspaceRoundedIcon fontSize="small" />
						}
						onClick={goBack}
					>
						Back
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>{id}</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Edit
