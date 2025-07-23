import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		// backgroundColor: theme.palette.primary.main,
		// backgroundColor: theme.palette.accent.main,
		backgroundColor: theme.palette.background.default,
	},
}))

export default function Title({ title, description }) {
	const classes = useStyles()
	return (
		<Paper className={classes.paper}>
			<Typography component='h2' variant='h6' gutterBottom>
				{title}
			</Typography>
			<Typography component='h2' variant='body2' gutterBottom>
				{description}
			</Typography>
		</Paper>
	)
}

Title.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
}
