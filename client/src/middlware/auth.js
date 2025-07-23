export default store => next => action => {
	if (action.type !== 'ajax') return next(action)

	const state = store.getState()

	state.token

	//add this api check part in some other module.
	if (action.api == 'UPDATE_CLIENT') {
		method = 'post'
		url = 'some url'
	} else {
		method = 'get'
		url = 'other url'
	}

	fetch(url, {
		method: method,
		headers: 'add token here',
		body: JSON.stringify(action.body())
	})
		.then(response => response.json())
		.then(json => json) //either return result
		//OR dispatch the result
		.then(json => {
			dispatch({ type: action.next_action, payload: json })
		})
}
