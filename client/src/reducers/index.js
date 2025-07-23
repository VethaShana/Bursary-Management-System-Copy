import { combineReducers } from 'redux'
import { user } from './user'
import { students } from './students'

export default combineReducers({
	user,
	students,
})
