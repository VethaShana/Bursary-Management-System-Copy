import { combineReducers } from 'redux'
import { user } from './user'
import { students } from './students'
import { application } from './application'
import { installments } from './installments'
import { users } from './users'

export default combineReducers({
	user,
	students,
	application,
	installments,
	users
})
