import React from 'react'
import {
	Typography,
	List as MuiList,
	ListItem,
	ListItemText,
	ListItemAvatar,
	makeStyles,
	Avatar,
	ListItemSecondaryAction,
	IconButton,
	MenuItem,
	Divider,
	Fade,
	Grow,
	ListSubheader,
	Grid,
	Tooltip,
	Box
} from '@material-ui/core/'
import MuiMenu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, deleteStudent, deleteUser } from '../../../actions/users'
import { courses } from '../../../utils/data'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import { getInitials } from '../../../utils/helpers'

const faculties = courses.map(({ faculty }) => faculty)

const useMenuStyles = makeStyles(theme => ({
	root: {
		// backgroundColor: theme.palette.background.paper
	}
}))

function Menu(props) {
	const { idx } = props
	const classes = useMenuStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [selectedIndex, setSelectedIndex] = React.useState(idx)

	const handleClickListItem = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index)
		setAnchorEl(null)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box width={100}>
			<MuiList
				component="nav"
				aria-label="Device settings"
				style={{ padding: 0 }}
				dense
			>
				<ListItem
					button
					style={{ padding: 0 }}
					aria-haspopup="true"
					aria-controls="lock-menu"
					aria-label="when device is locked"
					onClick={handleClickListItem}
					dense
				>
					<ListItemText
						// primary="When device is locked"
						secondary={faculties[selectedIndex]}
					/>
				</ListItem>
			</MuiList>
			<MuiMenu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{faculties.map((faculty, index) => (
					<MenuItem
						dense
						key={faculty}
						disabled={index === 0}
						selected={index === selectedIndex}
						onClick={event => handleMenuItemClick(event, index)}
					>
						{faculty}
					</MenuItem>
				))}
			</MuiMenu>
		</Box>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	avatarColored: {
		color: theme.palette.getContrastText(theme.palette.secondary.main),
		backgroundColor: theme.palette.secondary.main,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize
	},
	avatarGreyed: {
		color: theme.palette.getContrastText(theme.palette.secondary.main),
		// backgroundColor: theme.palette.secondary.main,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize
	},
	approveIcon: {
		backgroundColor: 'transparent',
		'&:hover': {
			color: theme.palette.secondary.main
		}
	},
	disapproveIcon: {
		backgroundColor: 'transparent',
		'&:hover': {
			color: theme.palette.primary.main
		}
	},
	deleteIcon: {
		backgroundColor: 'transparent',
		'&:hover': {
			color: theme.palette.error.main
		}
	}
}))

function List(props) {
	const { approved } = props
	const users = useSelector(state =>
		state.users.data.filter(({ isApproved }) => isApproved === approved)
	)
	const faculties = users.map(({ faculty }) => faculty)
	const classes = useStyles()
	const dispatch = useDispatch()
	return (
		<React.Fragment>
			<Grid
				container
				// justify="space-between"
				// alignItems="center"
				style={{ padding: '16px 8px' }}
			>
				{approved && (
					<VerifiedUserRoundedIcon
						fontSize="small"
						style={{ marginRight: '8px' }}
					/>
				)}
				<Typography variant="button" color="primary" gutterBottom>
					{approved ? 'Dean' : 'Users'}
				</Typography>
				{!approved && (
					<Typography
						variant="body2"
						color="primary"
						component="span"
						gutterBottom
						style={{ marginLeft: '8px' }}
					>
						- Pending request
					</Typography>
				)}
			</Grid>
			{approved ? (
				faculties.map((faculty, idx) => (
					<MuiList
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader
								component="div"
								id="nested-list-subheader"
							>
								{faculty}
							</ListSubheader>
						}
						dense
					>
						{users
							.filter(({ faculty: x }) => x === faculty)
							.map((user, idx) => (
								<React.Fragment key={idx}>
									{/* {idx !== 0 && <Divider variant="inset" />} */}
									<Grow in={true}>
										<ListItem>
											<ListItemAvatar>
												<Avatar
													className={
														approved
															? classes.avatarColored
															: classes.avatarGreyed
													}
													alt={`${user.firstName} ${user.lastName} avatar`}
													src={user.img}
												>
													{getInitials(
														`${user.firstName} ${user.lastName}`
													)}
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={`Mr. ${user.firstName} ${user.lastName}`}
												// secondary={<Menu idx={1} />}
												secondary={user.faculty}
											/>
											<ListItemSecondaryAction>
												{!approved && (
													<IconButton
														edge="end"
														aria-label="delete"
														className={
															classes.deleteIcon
														}
														onClick={() =>
															dispatch(
																deleteUser(
																	user._id
																)
															)
														}
													>
														<Tooltip title="Delete">
															<DeleteRoundedIcon fontSize="small" />
														</Tooltip>
													</IconButton>
												)}
												<IconButton
													className={
														approved
															? classes.disapproveIcon
															: classes.approveIcon
													}
													edge="end"
													aria-label="approve"
													onClick={() =>
														dispatch(
															approveUser(
																user._id,
																approved
																	? false
																	: true
															)
														)
													}
												>
													<Tooltip
														title={
															approved
																? 'Disapprove'
																: 'Approve'
														}
													>
														<VerifiedUserRoundedIcon fontSize="small" />
													</Tooltip>
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</Grow>
								</React.Fragment>
							))}
					</MuiList>
				))
			) : (
				<React.Fragment>
					<MuiList
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						{users.map((user, idx) => (
							<React.Fragment key={idx}>
								{/* {idx !== 0 && <Divider variant="inset" />} */}
								<Grow in={true}>
									<ListItem>
										<ListItemAvatar>
											<Avatar
												className={
													approved
														? classes.avatarColored
														: classes.avatarGreyed
												}
												alt={`${user.firstName} ${user.lastName} avatar`}
												src={user.img}
											>
												{getInitials(
													`${user.firstName} ${user.lastName}`
												)}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={`${
												user.title ? 'Mr.' : ''
											} ${user.firstName} ${
												user.lastName
											}`}
											secondary={user.faculty}
											// secondary={<Menu idx={1} />}
										/>
										<ListItemSecondaryAction>
											{/* <ContextMenu
												id={user._id}
												approved={approved}
											/> */}
											<IconButton
												edge="end"
												aria-label="delete"
												style={{
													backgroundColor:
														'transparent'
												}}
												onClick={() =>
													dispatch(
														deleteUser(user._id)
													)
												}
											>
												<Tooltip title="Delete">
													<DeleteRoundedIcon fontSize="small" />
												</Tooltip>
											</IconButton>
											<IconButton
												style={{
													backgroundColor:
														'transparent'
												}}
												edge="end"
												aria-label="delete"
												onClick={() =>
													dispatch(
														approveUser(
															user._id,
															approved
																? false
																: true
														)
													)
												}
											>
												<Tooltip title="Delete">
													<VerifiedUserRoundedIcon fontSize="small" />
												</Tooltip>
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								</Grow>
							</React.Fragment>
						))}
					</MuiList>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default List
