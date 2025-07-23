import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, lighten, ThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import DirectionsIcon from '@material-ui/icons/Directions'

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		backgroundColor: lighten(theme.palette.primary.main, 0.85),
		color: theme.palette.primary.main,
		fontSize: theme.typography.fonSize,
		// borderColor: lighten(theme.palette.primary.main, 0.5)
		border: 'none'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		'& ::placeholder': {
			color: lighten(theme.palette.primary.main, 0.1),
			fontSize: theme.typography.htmlFontSize
		}
	},
	iconButton: {
		padding: 8
	},
	divider: {
		height: 28,
		margin: 4,
		backgroundColor: lighten(theme.palette.primary.main, 0.5)
	}
}))

export default function TableSearch(props) {
	const { onQueryChange, placeholder = 'Search' } = props
	const classes = useStyles()

	return (
		<Paper component="form" className={classes.root}>
			<InputBase
				className={classes.input}
				placeholder={placeholder}
				inputProps={{ 'aria-label': placeholder }}
				onChange={onQueryChange}
			/>
			{/* <Divider className={classes.divider} orientation="vertical" /> */}
			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="search"
				size="small"
			>
				<SearchRoundedIcon color="primary" fontSize="small" />
			</IconButton>
		</Paper>
	)
}

TableSearch.propTypes = {
	onQueryChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string
}
