import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles({
	context: {
		flex: 1,
	},
})

export default function Card() {
	const classes = useStyles()
	return (
		<React.Fragment>
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				Total Students
			</Typography>
			<Typography component='p' variant='h4'>
				3, 099
			</Typography>
			<Typography color='textSecondary' className={classes.context}>
				on 15 March, 2021
			</Typography>
			<div>
				<Link color='primary' href='#' onClick={preventDefault}>
					View Statics
				</Link>
			</div>
		</React.Fragment>
	)
}
