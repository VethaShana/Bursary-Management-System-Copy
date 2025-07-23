import { Grid, makeStyles, Paper, Button } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import Title from '../../components/Title'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded'
import { useHistory, useParams } from 'react-router-dom'
import StudentInfo from '../../components/StudentInfo'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		// display: 'flex',
		overflow: 'auto'
		// flexDirection: 'column'
	}
}))

function Single(props) {
	const classes = useStyles()
	const { goBack } = useHistory()
	const { id } = useParams()

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
					<Paper className={classes.paper}>
						<StudentInfo id={id} edit={true} />
					</Paper>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Single
