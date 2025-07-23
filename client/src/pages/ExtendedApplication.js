import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import LabelIcon from '@material-ui/icons/Label'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link1 from '@material-ui/core/Link'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link1 color="inherit" href="http://www.jfn.ac.lk/">
				University of Jaffna
			</Link1>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
	}
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function ExtendedApplication() {
	const classes = useStyles()

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar>
					<LabelIcon className={classes.icon} />
					<Typography variant="h6" color="inherit" noWrap>
						Extended Application - For Honours Students
					</Typography>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h3"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Extended Application
						</Typography>
						<Typography
							variant="h4"
							align="center"
							color="textSecondary"
							gutterBottom
						>
							For Honours students
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							Extended Application is not available now!!! <br />
							You need to contact with,
							<br /> <b>
								Welfare Branch , University of Jaffna
							</b>{' '}
							Administrator
							<br /> to update your information and details.
							<br />
							<i>
								&apos;&apos;don&apos;t forget to
								contact!!&apos;&apos;
							</i>
							<br />
							<br />
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button
										component={Link}
										to="/"
										variant="contained"
										color="primary"
									>
										Back to Home
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	)
}

export default ExtendedApplication
