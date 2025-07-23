import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { state } from 'redux'
import store from './store'

import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8080/api/v1'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
