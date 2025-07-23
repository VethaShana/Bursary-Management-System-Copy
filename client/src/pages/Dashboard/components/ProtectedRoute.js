import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({
	component: Component,
	isAuthenticated,
	isApproved,
	role,
	user,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				return isAuthenticated &&
					isApproved &&
					(role === 'admin' || role === 'dean') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/dashboard/sign-up',
							state: { from: props.location }
						}}
					/>
				)
			}}
		/>
	)
}

const mapStateToProps = state => ({
	role: state.user.data.role,
	isAuthenticated: state.user.isAuthenticated,
	isApproved: state.user.data.isApproved,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
