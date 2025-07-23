import axios from 'axios'
import {
	SET_STUDENTS,
	SET_STUDENTS_ERRORS,
	SET_STUDENTS_LOADING,
} from './types'

export const getStudents = () => async (dispatch, getState) => {
	dispatch({
		type: SET_STUDENTS_LOADING,
		payload: true,
	})
	await axios
		.get('/students')
		.then(res => {
			dispatch({
				type: SET_STUDENTS,
				payload: res.data,
			})
			dispatch({
				type: SET_STUDENTS_LOADING,
				payload: false,
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: 'ERROR: to be SET!',
			})
		})
}
