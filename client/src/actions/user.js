import axios from 'axios'
import { SET_USER } from './types'

export const signup = data => async (dispatch, getState) => {
	return await axios.post('/user/auth', data).then(res => console.log(res))
}
