import {
	SET_APPLICATION,
	SUBMIT_APPLICATION_SUCCESS,
	SUBMIT_APPLICATION_FAILURE,
	SET_APPLICATION_STATUS,
	SET_APPLICATION_LOADING
} from '../actions/types'

const initialState = {
	data: {},
	isSubmitted: false,
	isApproved: false,
	isLoading: false,
	errors: undefined
}

export function application(state = initialState, action) {
	switch (action.type) {
		case SET_APPLICATION:
			return { ...state, data: action.payload }
		case SUBMIT_APPLICATION_SUCCESS:
			return { ...state, isSubmitted: true }
		case SET_APPLICATION:
			return { ...state, isSubmitted: false, errors: action.payload }
		case SET_APPLICATION_STATUS:
			return { ...state, ...action.payload }
		case SET_APPLICATION_LOADING:
			return { ...state, isLoading: action.payload }
		case SUBMIT_APPLICATION_FAILURE:
			return { ...state, errors: action.payload }
		default:
			return state
	}
}
