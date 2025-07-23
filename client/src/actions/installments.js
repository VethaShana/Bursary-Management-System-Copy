import axios from 'axios'

import {
	ADD_INSTALLMENT,
	SET_INSTALLMENTS,
	SET_INSTALLMENTS_ERRORS,
	SET_INSTALLMENTS_LOADING
} from './types'

import { getStudents } from './students'

export const setInstallments = data => {
	return {
		type: SET_INSTALLMENTS,
		payload: data
	}
}

export const getInstallments = () => async (dispatch, getState) => {
	dispatch({
		type: SET_INSTALLMENTS_LOADING,
		payload: true
	})
	await axios
		.get('/installments')
		.then(res => {
			dispatch({
				type: SET_INSTALLMENTS,
				payload: res.data
			})
			dispatch({
				type: SET_INSTALLMENTS_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_INSTALLMENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const addInstallment = data => async (dispatch, getState) => {
	await axios
		.post(`/installments`, data)
		.then(({ data }) => {
			dispatch({ type: ADD_INSTALLMENT, payload: data })
			dispatch(getStudents())
		})
		.catch(err => {
			console.log(err)
			dispatch({
				type: SET_INSTALLMENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}
