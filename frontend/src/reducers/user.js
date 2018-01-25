let initialState = {
	'token': localStorage.getItem('token') || '', 
	'emailedOtp': false,
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
	case 'RECORDED_USER_COOKIE': {
		let newState = state
		newState.cookie = action.cookie
		return newState
	}
	case 'RECEIVED_USER_PROFILE': {
		let areas = action.items.data.areas ? action.items.data.areas : []
		let user = {...action.items.data.volunteerData, areas}
		return {...state, ...user}
	}
	case 'RECEIVED_TOKEN': {
		localStorage.setItem('token', action.token)
		return {...state, token: action.token}
	}
	case 'LOG_OUT': {
		localStorage.removeItem('token')
		return {'token': ''}
	}
	case 'LOG_IN_ERRORED': {
		return {...state, loginError: action.message}
	}
	case 'EMAILED_OTP': {
		let newState = state
		newState.emailedOtp = true
		return {...state}
	}
	default:
		return state
	}
}
export default userReducer
