import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<Switch>
			<Route path="/dashboard/sign-in" component={SignIn} />
			<Route path="/dashboard/sign-up" component={SignUp} />
			<ProtectedRoute path="/dashboard" component={Dashboard} />
		</Switch>
	)
}

export default App
