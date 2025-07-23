import {
	ADD_INSTALLMENT,
	SET_INSTALLMENTS,
	REMOVE_INSTALLMENT,
	SET_INSTALLMENTS_ERRORS,
	SET_INSTALLMENTS_LOADING
} from '../actions/types'

const initialState = {
	data: [],
	isLoading: false,
	errors: undefined
}

export function installments(state = initialState, action) {
	switch (action.type) {
		case SET_INSTALLMENTS:
			return { ...state, data: action.payload }
		case ADD_INSTALLMENT:
			return { ...state, data: [...state.data, action.payload] }
		case SET_INSTALLMENTS_LOADING:
			return { ...state, isLoading: action.payload }
		case SET_INSTALLMENTS_ERRORS:
			return { ...state, errors: action.payload }
		case REMOVE_INSTALLMENT:
			return {
				...state,
				data: state.data.filter(({ _id }) => _id !== action.payload)
			}
		default:
			return state
	}
}
