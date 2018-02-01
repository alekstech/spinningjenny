let initialState = {
	'token': localStorage.getItem('token') || '', 
	'interestedInAdHoc': false,
	'willingToTrain': false,
	'strandNewsMailings': false,
	'nonAdminsCanView': false,
	'student': false,
	'employed': false,
	'province': ''
}

function userReducer(state = initialState, action) {
	switch(action.type) {

	case 'RECEIVED_TOKEN': {
		localStorage.setItem('token', action.token)
		return {...state, token: action.token}
	}
		
	case 'RECEIVED_USER_PROFILE': {
		let areas = action.data.areas ? action.data.areas : []
		let user = {...action.data.volunteerData, areas}
		return {...state, ...user}
	}

	case 'LOG_OUT': {
		localStorage.removeItem('token')
		return {...state, ...initialState}
	}

	default:
		return state
	}
}
export default userReducer
