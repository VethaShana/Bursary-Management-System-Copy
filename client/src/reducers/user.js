import {
	CLEAR_USER_ERROR,
	REGISTER_USER,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SET_USER,
	CLEAR_USER,
	LOGOUT_USER
} from '../actions/types'

const initialState = {
	data: {
		_id: null,
		email: null,
		role: null
	},
	isAuthenticated: false,
	isLoading: false,
	error: null
}

export function user(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, data: action.payload, isAuthenticated: true }
		case REGISTER_USER:
			return { ...state, isLoading: true, error: null }
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				error: null,
				isAuthenticated: true
			}
		case REGISTER_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				error: action.payload
			}
		case LOGIN_USER:
			return { ...state, isLoading: true, error: null }
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				data: action.payload,
				error: null
			}
		case LOGIN_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				error: action.payload
			}
		case CLEAR_USER_ERROR:
			return { ...state, error: null }
		case CLEAR_USER:
			return {
				...state,
				isAuthenticated: false,
				data: { _id: null, email: null, role: null }
			}
		case LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				data: { _id: null, email: null, role: null }
			}
		default:
			return state
	}
}
