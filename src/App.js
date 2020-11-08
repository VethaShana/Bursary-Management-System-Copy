import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from './utils/theme'

import LandingPage from './Pages/LandingPage'
import ApplicationPage from './Pages/ApplicationPage'

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/application' component={ApplicationPage} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App
