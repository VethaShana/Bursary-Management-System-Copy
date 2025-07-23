import {
	SET_STUDENTS,
	SET_STUDENTS_LOADING,
	SET_STUDENTS_ERRORS,
} from '../actions/types'

const initialState = {
	data: [],
	isLoading: false,
	errors: undefined,
}

export function students(state = initialState, action) {
	switch (action.type) {
		case SET_STUDENTS:
			return { ...state, data: action.payload }
		case SET_STUDENTS_LOADING:
			return { ...state, isLoading: action.payload }
		case SET_STUDENTS_ERRORS:
			return { ...state, errors: action.payload }
		default:
			return state
	}
}
