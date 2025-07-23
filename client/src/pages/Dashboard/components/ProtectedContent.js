import React from 'react'
import { connect } from 'react-redux'

const ProtectedContent = ({
	isAuthenticated,
	isApproved,
	role,
	user,
	children
}) => {
	return isAuthenticated && isApproved && user.role === role && children
}

const mapStateToProps = state => ({
	user: state.user.data,
	isAuthenticated: state.user.isAuthenticated,
	isApproved: state.user.data.isApproved,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedContent)
