import {
	SET_STUDENTS,
	SET_STUDENTS_LOADING,
	SET_STUDENTS_ERRORS,
	REMOVE_STUDENT,
	APPROVE_STUDENT,
	APPROVE_STUDENTS
} from '../actions/types'

const initialState = {
	data: [],
	isLoading: false,
	errors: undefined
}

export function students(state = initialState, action) {
	switch (action.type) {
		case SET_STUDENTS:
			return { ...state, data: action.payload }
		case SET_STUDENTS_LOADING:
			return { ...state, isLoading: action.payload }
		case APPROVE_STUDENT:
			const index = state.data.findIndex(
				student => student._id === action.payload
			)
			return {
				...state,
				data: [
					...state.data.slice(0, index),
					{
						...state.data[index],
						isApproved: true
					},
					...state.data.slice(index + 1)
				]
			}
		case APPROVE_STUDENTS:
			const students = state.data.filter(student =>
				action.payload.includes(student._id)
			)
			students.forEach(student => (student.isApproved = true))
			return {
				...state,
				data: [
					...state.data.filter(
						student => !action.payload.includes(student._id)
					),
					...students
				]
			}
		case SET_STUDENTS_ERRORS:
			return { ...state, errors: action.payload }
		case REMOVE_STUDENT:
			return {
				...state,
				data: state.data.filter(({ _id }) => _id !== action.payload)
			}
		default:
			return state
	}
}
