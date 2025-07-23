import React, { forwardRef, useImperativeHandle } from 'react'
import { default as MuiMenu } from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../actions/user'

import { getInitials } from '../../../utils/helpers'

const roles = {
	admin: 'Admin',
	dean: 'Dean'
}

const useStyles = makeStyles(theme => ({
	avatar: {
		width: theme.spacing(3.5),
		height: theme.spacing(3.5),
		color: theme.palette.getContrastText(theme.palette.secondary.main),
		backgroundColor: theme.palette.secondary.main,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize
	}
}))
const Menu = forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const dispatch = useDispatch()
	const history = useHistory()
	const classes = useStyles()
	const user = useSelector(state => state.user.data)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	useImperativeHandle(ref, () => {
		return {
			handleClick: handleClick
		}
	})

	return (
		<div>
			<MuiMenu
				id="menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				variant="selectedMenu"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				disabledItemsFocusable={false}
			>
				<MenuItem disabled dense>
					<Box display="flex" alignItems="center">
						<Box>
							<Avatar
								className={classes.avatar}
								alt={`${user.firstName} ${user.lastName} avatar`}
								src={user.img}
							>
								{getInitials(
									`${user.firstName} ${user.lastName}`
								)}
							</Avatar>
						</Box>
						<Box flex={1} ml={2}>
							<Typography variant="body2" color="initial">
								{user.firstName} {user.lastName}
							</Typography>
							<Typography
								variant="caption"
								component="p"
								color="initial"
							>
								{user.email}
							</Typography>
							{user.role && user.role !== 'admin' && (
								<Typography
									variant="caption"
									component="p"
									color="initial"
								>
									{roles[user.role]} - {user.faculty}
								</Typography>
							)}
						</Box>
					</Box>
				</MenuItem>
				<MenuItem
					onClick={() => {
						history.push('dashboard/sign-in')
						dispatch(logoutUser())
					}}
					dense
				>
					Logout
				</MenuItem>
			</MuiMenu>
		</div>
	)
})

export default Menu
