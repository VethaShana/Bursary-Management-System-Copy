import { SET_USER } from '../actions/types'

const initialState = {
	data: {
		name: 'Ardil Mohamed',
	},
	isLoading: true,
}

export function user(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, data: action.payload }
		default:
			return state
	}
}
