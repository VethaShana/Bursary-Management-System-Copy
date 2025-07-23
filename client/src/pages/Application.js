import React, { useEffect, useState } from 'react'
import { Button, Container, makeStyles } from '@material-ui/core'
import ApplicationDialog from '../components/ApplicationDialog'

import { connect } from 'react-redux'
import { setApplication, getApplicationStatus } from '../actions/application'
import ApplicationStatus from '../components/ApplicationStatus'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded'
import { useHistory } from 'react-router-dom'

import Copyright from '../components/Copyright'
import Header from '../components/Header'
import ApplicationForm from '../components/ApplicationForm'

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(4)
	},
	paper: {
		padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
		position: 'relative',
		overflow: 'hidden',
		'&::after': {
			content: "' '",
			position: 'absolute',
			display: 'block',
			backgroundColor: theme.palette.primary.main,
			width: '100%',
			height: '4px',
			top: 0,
			left: 0
		}
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	footer: {
		margin: `${theme.spacing(2)}px 0`
	},
	btn: {
		minWidth: '150px',
		[theme.breakpoints.down('sm')]: {
			minWidth: '100%'
		}
	},
	button: {
		marginBottom: theme.spacing(1)
	}
}))

function Application({ isSubmitted, getApplicationStatus }) {
	const classes = useStyles()
	const { goBack } = useHistory()

	useEffect(() => {
		getApplicationStatus()
	}, [])

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Container className={classes.root}>
			<Button
				variant="text"
				size="small"
				className={classes.button}
				startIcon={<KeyboardBackspaceRoundedIcon fontSize="small" />}
				onClick={goBack}
			>
				Back
			</Button>
			<Header
				title="Bursary Application"
				subTitle="University of Jaffna"
			/>
			{isSubmitted ? (
				<ApplicationStatus />
			) : (
				<ApplicationForm onClick={handleClickOpen} />
			)}
			<ApplicationDialog open={open} onClose={handleClose} />
			<footer className={classes.footer}>
				<Copyright />
			</footer>
		</Container>
	)
}

const mapStateToProps = state => ({
	user: state.user.data,
	isSubmitted: state.application.isSubmitted,
	isLoading: state.application.isLoading
})

export default connect(mapStateToProps, {
	setApplication,
	getApplicationStatus
})(Application)
