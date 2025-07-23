import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import SignIn from './pages/Dashboard/pages/SignIn'
import SignUp from './pages/Dashboard/pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path='/' component={Landing} />
				<ProtectedRoute path='/application' component={Application} />
				<ProtectedRoute
					path='/extended-application'
					component={ExtendedApplication}
				/>
				<Route path='/dashboard/sign-in' component={SignIn} />
				<Route path='/dashboard/sign-up' component={SignUp} />
				<ProtectedRoute path='/dashboard' component={Dashboard} />
				<Route path='*' component={() => '404 NOT FOUND'} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App
