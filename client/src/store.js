import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
// import auth from './middlware/auth'

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		trace: true,
		traceLimit: 25
	}) || compose

export default createStore(
	reducers,
	{},
	composeEnhancers(applyMiddleware(thunk))
)
