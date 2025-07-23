import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({
	component: Component,
	isAuthenticated,
	role,
	user,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				return isAuthenticated && role === 'student' ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/', state: { from: props.location } }}
					/>
				)
			}}
		/>
	)
}

const mapStateToProps = state => ({
	role: state.user.data.role,
	isAuthenticated: state.user.isAuthenticated,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
