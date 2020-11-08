// react
import React from 'react'
import { Link } from 'react-router-dom'
// material components
import {
	Container,
	Grid,
	makeStyles,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
	Button,
} from '@material-ui/core'
// material-icons
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined'
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined'
// assets
import bgImg from '../assets/hero-img.svg'

function ListItemLink(props) {
	const { primary, secondary, to } = props

	const CustomLink = React.useMemo(
		() =>
			React.forwardRef((linkProps, ref) => (
				<Link ref={ref} to={to} {...linkProps} />
			)),
		[to]
	)

	return (
		<ListItem button component={CustomLink}>
			<ListItemIcon>
				<InsertDriveFileOutlinedIcon />
			</ListItemIcon>
			<ListItemText primary={primary} secondary={secondary} />
			<ListItemSecondaryAction>
				<ArrowForwardOutlinedIcon />
			</ListItemSecondaryAction>
		</ListItem>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: '100vh',
		backgroundColor: '#f5f5ff',
		border: 'none',
	},
	container: {
		height: '100%',
	},
	grid: {
		height: '100%',
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(2),
		flexWrap: 'nowrap',
	},
	hero_img: {
		padding: `${theme.spacing(10)}px 0`,
		backgroundImage: 'url(' + bgImg + ')',
		backgroundSize: '40%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		width: '100%',
		minHeight: '500px',
		[theme.breakpoints.down('sm')]: {
			backgroundSize: '60%',
		},
		[theme.breakpoints.down('xs')]: {
			backgroundSize: '80%',
		},
	},
	title: {
		fontWeight: 'bold',
	},
	cta: {
		marginBottom: theme.spacing(4),
		width: '100%',
		maxWidth: '400px',
	},
	cta__faq: {
		marginBottom: theme.spacing(6),
	},
}))

function LandingPage() {
	const classes = useStyles()

	return (
		<Paper className={classes.root} elevation={0} square>
			<Container className={classes.container}>
				<Grid
					container
					direction='column'
					justify='space-between'
					alignItems='center'
					className={classes.grid}
				>
					<Grid item>
						<Typography variant='h2' color='primary' className={classes.title}>
							{' '}
							University of Jaffna
						</Typography>
						<Typography variant='h5' color='initial'>
							Bursary Department
						</Typography>
					</Grid>
					<Grid item className={classes.hero_img}>
						{/* <img src={bgImg} alt="" /> */}
					</Grid>
					<Grid item className={classes.cta}>
						<div>
							<List components='nav' aria-label='application navigation'>
								<ListItemLink
									to='/application'
									primary='Rudimentary Bursary Application'
								/>
								<ListItemLink
									to='/application'
									primary='Bursary Extension'
									secondary='Eligible only for honours degree students'
								/>
							</List>
							<Button
								color='primary'
								endIcon={<ArrowRightAltOutlinedIcon />}
								variant='text'
								fullWidth
								className={classes.cta__faq}
							>
								FAQ
							</Button>
							<footer className={classes.footer}>
								<Typography variant='body2' color='initial' align='center'>
									&copy; copyrights University of Jaffna, 2020.
								</Typography>
							</footer>
						</div>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	)
}

export default LandingPage
