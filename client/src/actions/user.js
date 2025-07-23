import axios from 'axios'
import {
	SET_USER,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGOUT_USER,
	CLEAR_USER_ERROR,
	CLEAR_USER
} from './types'
import jwtDecode from 'jwt-decode'
import { setAuthToken } from '../utils/token'

export const setUser = data => {
	return {
		type: SET_USER,
		payload: data
	}
}

export const registerStudent =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: REGISTER_USER
		})
		return await axios
			.post('/auth/register', data)
			.then(({ data: { token } }) => {
				localStorage.setItem('token', token)
				const decoded = jwtDecode(token)
				setAuthToken(token)
				dispatch({
					type: REGISTER_USER_SUCCESS,
					payload: decoded.user
				})
			})
			.catch(err => {
				dispatch({
					type: REGISTER_USER_FAILURE,
					payload: {
						status: err.response.status,
						msg: err.response.data.error
					}
				})
				setTimeout(() => {
					dispatch({ type: CLEAR_USER_ERROR })
				}, 6000)
			})
	}

export const registerUser = data => async (dispatch, getState) => {
	dispatch({
		type: REGISTER_USER
	})
	return await axios
		.post('/auth/register?role=dean', data)
		.then(({ data: { token } }) => {
			localStorage.setItem('token', token)
			const decoded = jwtDecode(token)
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: decoded.user
			})
		})
		.catch(err => {
			dispatch({
				type: REGISTER_USER_FAILURE,
				payload: {
					status: err.response.status,
					msg: err.response.data.error
				}
			})
			setTimeout(() => {
				dispatch({ type: CLEAR_USER_ERROR })
			}, 6000)
		})
}

export const loginUser =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: LOGIN_USER
		})
		return await axios
			.post('/auth/login', data)
			.then(({ data: { token } }) => {
				localStorage.setItem('token', token)
				console.log(token)
				setAuthToken(token)
				const decoded = jwtDecode(token)
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: decoded.user
				})
			})
			.catch(err => {
				dispatch({
					type: LOGIN_USER_FAILURE,
					payload: {
						status: err.response.status,
						msg: err.response.data.error
					}
				})
				setTimeout(() => {
					dispatch({ type: CLEAR_USER_ERROR })
				}, 6000)
			})
	}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('token')
	setAuthToken(false)
	dispatch({
		type: LOGOUT_USER
	})
}
