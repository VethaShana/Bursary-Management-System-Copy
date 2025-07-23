import React from 'react'
import { Chip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TimerIcon from '@material-ui/icons/Timer'

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(4)
	}
}))

function Header(props) {
	const { title, subTitle } = props
	const classes = useStyles()
	return (
		<header className={classes.root}>
			<Typography variant="h3" color="initial">
				{title}
			</Typography>
			<Typography variant="subtitle1" color="initial" gutterBottom>
				{subTitle}
			</Typography>
			{/* <Chip
				label="Deadline: 10/01/2020"
				icon={<TimerIcon />}
				color="secondary"
				size="small"
			/> */}
		</header>
	)
}

export default Header
