function userReducer(state = {}, action) {
	if(action.type === 'RECORDED_USER_COOKIE'){
		let newState = state
		newState.cookie = action.cookie
		return newState
	} else if (action.type === 'ITEMS_FETCH_DATA_SUCCESS') {
		localStorage.setItem('id', action.items.volunteerData.id)
		let newState = state
		newState = {...action.items.volunteerData}
		newState.areas = action.items.areas
		return newState
	} else if (action.type === 'LOG_OUT') {
		localStorage.removeItem('id')
		return {}
	}
	return state
}

export default userReducer