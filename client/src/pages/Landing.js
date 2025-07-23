import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded'
import DescriptionIcon from '@material-ui/icons/Description'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import bgImg from '../assets/bg1.svg'

import Copyright from '../components/Copyright'
import Register from '../components/Register'
import Login from '../components/Login'

// Development - Dashboard CTA
import { default as MuiSnackbar } from '@material-ui/core/Snackbar'
import { Close as CloseIcon } from '@material-ui/icons'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/user'

const Snackbar = ({ handleClick }) => {
	const [open, setOpen] = useState(true)
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<MuiSnackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			open={open}
			onClose={handleClose}
			autoHideDuration={6000}
			message="Dashboard"
			action={
				<React.Fragment>
					<IconButton
						color="secondary"
						size="small"
						onClick={handleClick}
					>
						<OpenInNewIcon fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</React.Fragment>
			}
		/>
	)
}

const useStyles = makeStyles(theme => ({
	gridHalf: {
		padding: `${theme.spacing(8)}px ${theme.spacing(3)}px`,
		[theme.breakpoints.down('sm')]: {
			paddingBottom: theme.spacing(0)
		}
	},
	banner: {
		backgroundColor: theme.palette.secondary.main,
		backgroundImage: `url(${bgImg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '400px',
		backgroundPosition: 'center bottom',
		overflow: 'hidden',
		flex: 1,
		marginTop: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(6),
		width: '100%',
		maxWidth: '600px',
		[theme.breakpoints.down('sm')]: {
			backgroundSize: '350px'
		},
		[theme.breakpoints.down('xs')]: {
			height: '500px',
			flex: 'none',
			backgroundSize: '250px',
			padding: theme.spacing(3),
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(5)
		}
	},
	authContainer: {
		maxWidth: '450px',
		overflow: 'hidden',
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(8)
		}
	}
}))

const helpMail = 'help@welfare.jfn.ac.lk'

function Landing({ history }) {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const classes = useStyles()
	const [authView, setAuthView] = useState('register')

	const handleAuthViewChange = () => {
		setAuthView(authView === 'register' ? 'login' : 'register')
	}

	return (
		<React.Fragment>
			{process.env.NODE_ENV !== 'production' && (
				<Snackbar handleClick={() => history.push('/dashboard')} />
			)}
			<Container maxWidth="lg">
				<Grid
					container
					style={{ minHeight: '100vh' }}
					spacing={3}
					direction="column"
				>
					<Grid container style={{ flex: 1 }}>
						<Grid
							container
							item
							xs={12}
							sm={6}
							direction="column"
							justify="space-between"
							className={classes.gridHalf}
						>
							<Box>
								<header>
									<Typography
										variant="h3"
										style={{ fontWeight: 'bold' }}
									>
										University of Jaffna
									</Typography>
									<Typography variant="h5">
										Welfare Department
									</Typography>
								</header>
							</Box>
							<Box className={classes.authContainer}>
								{user.isAuthenticated ? (
									<React.Fragment>
										<Box mb={2}>
											<Typography variant="h6">
												Bursary Applications
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												Select Application to continue
											</Typography>
										</Box>
										<List
											component="nav"
											aria-label="main mailbox folders"
											dense
											className={classes.list}
										>
											<ListItem
												button
												component={Link}
												to="/application"
												dense
											>
												<ListItemIcon>
													<DescriptionIcon fontSize="small" />
												</ListItemIcon>
												<ListItemText primary="Preliminary Application" />
												<ListItemSecondaryAction>
													<ArrowRightAltRoundedIcon fontSize="small" />
												</ListItemSecondaryAction>
											</ListItem>
											<Divider />
											<ListItem
												button
												component={Link}
												to="/extended-application"
											>
												<ListItemIcon>
													<InsertDriveFileIcon fontSize="small" />
												</ListItemIcon>
												<ListItemText
													primary="Extended Application"
													secondary="For Honours students"
												/>
												<ListItemSecondaryAction>
													<ArrowRightAltRoundedIcon fontSize="small" />
												</ListItemSecondaryAction>
											</ListItem>
										</List>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Register
											authView={authView}
											onAuthViewChange={
												handleAuthViewChange
											}
										/>
										<Login
											authView={authView}
											onAuthViewChange={
												handleAuthViewChange
											}
										/>
									</React.Fragment>
								)}
							</Box>
						</Grid>
						<Grid
							container
							item
							xs={12}
							sm={6}
							direction="column"
							className={classes.gridHalf}
						>
							<Grid container justify="flex-end" item>
								{user.isAuthenticated && (
									<Button
										color="primary"
										variant="contained"
										size={'small'}
										onClick={e => dispatch(logoutUser())}
									>
										Log Out
									</Button>
								)}
								<Button
									color="primary"
									endIcon={<ArrowRightAltRoundedIcon />}
									variant="text"
									style={{ marginLeft: '10px' }}
									size={'small'}
									component={Link}
									to="/faq"
								>
									FAQ
								</Button>
							</Grid>
							<Box
								className={classes.banner}
								alignSelf="flex-end"
							>
								<Typography
									variant="h5"
									color="primary"
									style={{ fontWeight: 'bold' }}
									gutterBottom
								>
									Need help?
								</Typography>
								<Typography variant="subtitle1" color="primary">
									Contact Bursary Department at{' '}
									<MuiLink
										style={{ fontWeight: '700' }}
										color="primary"
										href={'mailto:' + helpMail}
									>
										{helpMail}
									</MuiLink>
								</Typography>
							</Box>
						</Grid>
					</Grid>
					<Grid
						container
						item
						xs={12}
						direction="column"
						justify="space-between"
						style={{ height: 'min-content' }}
					>
						<footer>
							<Copyright />
						</footer>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	)
}

export default Landing
