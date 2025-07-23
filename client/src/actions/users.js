import axios from 'axios'

import {
	APPROVE_USER,
	REMOVE_USERS,
	SET_USERS,
	SET_USERS_ERRORS,
	SET_USERS_LOADING
} from './types'

export const getUsers = () => async (dispatch, getState) => {
	dispatch({
		type: SET_USERS_LOADING,
		payload: true
	})
	await axios
		.get('/users?role=dean')
		.then(({ data }) => {
			dispatch({
				type: SET_USERS,
				payload: data
			})
			dispatch({
				type: SET_USERS_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_USERS_LOADING,
				payload: false
			})
			dispatch({
				type: SET_USERS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const approveUser =
	(id, isApproved = true) =>
	async (dispatch, getState) => {
		await axios
			.patch(`/users/${id}`, { isApproved })
			.then(res => {
				dispatch({ type: APPROVE_USER, payload: { id, isApproved } })
			})
			.catch(err => {
				dispatch({
					type: SET_USERS_ERRORS,
					payload: err.response.data.error
				})
			})
	}

export const deleteUser = id => async (dispatch, getState) => {
	await axios
		.delete(`/users/${id}`)
		.then(res => {
			dispatch({
				type: REMOVE_USERS,
				payload: id
			})
		})
		.catch(err => {
			dispatch({
				type: SET_USERS_ERRORS,
				payload: err.response.data.error
			})
		})
}
