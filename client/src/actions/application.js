import axios from 'axios'

import {
	SET_APPLICATION,
	SUBMIT_APPLICATION,
	SUBMIT_APPLICATION_SUCCESS,
	SUBMIT_APPLICATION_FAILURE,
	SET_APPLICATION_STATUS,
	SET_APPLICATION_LOADING
} from './types'

export const setApplication = data => {
	return {
		type: SET_APPLICATION,
		payload: data
	}
}

export const getApplicationStatus = () => async (dispatch, getState) => {
	const userId = getState().user.data._id
	dispatch({
		type: SET_APPLICATION_LOADING,
		payload: true
	})
	return await axios
		.get(`/students/${userId}`)
		.then(({ data }) => {
			dispatch({
				type: SET_APPLICATION,
				payload: data
			})
			dispatch({
				type: SET_APPLICATION_STATUS,
				payload: {
					isSubmitted: true,
					isApproved: data.isApproved
				}
			})
			dispatch({
				type: SET_APPLICATION_LOADING,
				payload: false
			})
		})
		.catch(error => {
			dispatch({
				type: SET_APPLICATION_STATUS,
				payload: {
					isSubmitted: false,
					isApproved: false
				}
			})
			dispatch({
				type: SET_APPLICATION_LOADING,
				payload: false
			})
			console.log(error)
		})
}

export const submitApplication = () => async (dispatch, getState) => {
	dispatch({
		type: SET_APPLICATION_LOADING,
		payload: true
	})
	const data = getState().application.data
	return await axios
		.post('/students', data)
		.then(({ data }) => {
			dispatch({
				type: SET_APPLICATION,
				payload: data
			})
			dispatch({
				type: SUBMIT_APPLICATION_SUCCESS
			})
			dispatch({
				type: SET_APPLICATION_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_APPLICATION_LOADING,
				payload: false
			})
			dispatch({
				type: SUBMIT_APPLICATION_FAILURE,
				payload: {
					status: err.response.status,
					msg: err.response.data.error
				}
			})
		})
}
