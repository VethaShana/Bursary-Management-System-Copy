import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles(theme => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbarTitle: {
		flex: 1
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto'
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0
	}
}))

export default function Header(props) {
	const classes = useStyles()
	const { sections, title } = props

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>
				<Typography
					component="h2"
					variant="h5"
					color="primary"
					align="center"
					noWrap
					className={classes.toolbarTitle}
				>
					{title}
				</Typography>

				<Button
					component={Link}
					to="/"
					variant="contained"
					size="small"
					color="primary"
					align="left"
				>
					Back
				</Button>
			</Toolbar>
			<Toolbar
				component="nav"
				variant="dense"
				className={classes.toolbarSecondary}
			></Toolbar>
		</React.Fragment>
	)
}

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string
}
