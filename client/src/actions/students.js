import axios from 'axios'

import {
	SET_STUDENTS,
	SET_STUDENTS_ERRORS,
	SET_STUDENTS_LOADING,
	APPROVE_STUDENT,
	DISAPPROVE_STUDENT,
	REMOVE_STUDENT,
	APPROVE_STUDENTS,
	DISAPPROVE_STUDENTS
} from './types'

export const getStudents = () => async (dispatch, getState) => {
	dispatch({
		type: SET_STUDENTS_LOADING,
		payload: true
	})
	await axios
		.get('/students')
		.then(res => {
			dispatch({
				type: SET_STUDENTS,
				payload: res.data
			})
			dispatch({
				type: SET_STUDENTS_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const deleteStudent = id => async (dispatch, getState) => {
	await axios
		.delete(`/students/${id}`)
		.then(res => {
			dispatch({
				type: REMOVE_STUDENT,
				payload: id
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const deleteStudents = ids => async (dispatch, getState) => {
	await axios
		.delete(`/students/${ids}`)
		.then(res => {
			dispatch({
				type: REMOVE_STUDENT,
				payload: ids
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const approveStudents = ids => async (dispatch, getState) => {
	await axios
		.patch('/students', { ids, data: { isApproved: true } })
		.then(res => {
			dispatch({ type: APPROVE_STUDENTS, payload: ids })
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const approveStudent = id => async (dispatch, getState) => {
	await axios
		.patch(`/students/${id}`, { isApproved: true })
		.then(res => {
			dispatch({ type: APPROVE_STUDENT, payload: id })
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const disApproveStudents = ids => async (dispatch, getState) => {
	await axios
		.patch('/students', { ids, data: { isApproved: false } })
		.then(res => {
			dispatch({ type: DISAPPROVE_STUDENTS, payload: ids })
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const disApproveStudent = id => async (dispatch, getState) => {
	await axios
		.patch(`/students/${id}`, { isApproved: false })
		.then(res => {
			dispatch({ type: DISAPPROVE_STUDENT, payload: id })
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}
