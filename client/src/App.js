import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Snackbar, LinearProgress } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import Dashboard from './pages/Dashboard'
import FAQ from './pages/FAQ'

import { connect } from 'react-redux'
import store from './store'
import { setUser, logoutUser } from './actions/user'
import jwtDecode from 'jwt-decode'
import { setAuthToken } from './utils/token'

import ProtectedRoute from './components/ProtectedRoute'

if (localStorage.token) {
	setAuthToken(localStorage.token)
	const decoded = jwtDecode(localStorage.token)
	store.dispatch(setUser(decoded.user))

	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser())
		window.location.href = '/'
	}
}

const handleClose = (event, reason) => {
	if (reason === 'clickaway') {
		return
	}
}

function App({ error }) {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/application" component={Application} />
				<Route
					path="/extended-application"
					component={ExtendedApplication}
				/>
				<Route path="/faq" component={FAQ} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="*" component={() => '404 NOT FOUND'} />
			</Switch>
			<Snackbar
				open={error ? true : false}
				autoHideDuration={6000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error">
					{error && error.msg}
				</Alert>
			</Snackbar>
		</MuiThemeProvider>
	)
}

const mapStateToProps = state => ({
	error: state.user.error
})

export default connect(mapStateToProps)(App)
