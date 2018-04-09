let initialState = {
	'areas': [],
	'city': '',
	'email': '',
	'emergencyName': '',
	'employed': false,
	'emergencyPhone': '',
	'firstName': '',
	'interestedInAdHoc': false,
	'isAdmin': false,
	'isStaff': false,
	'lastName': '',
	'mailingAddress1': '',
	'mailingAddress2': '',
	'nonAdminsCanView': false,
	'phone': '',
	'postcode': '',
	'province': '',
	'membershipExpiry': '',
	'membershipNumber': '',
	'quitDate': '',
	'startDate': '',
	'strandNewsMailings': false,
	'student': false,
	'skills': [],
	'willingToTrain': false,
	'token': localStorage.getItem('token') || ''
}

function userReducer(state = initialState, action) {
	switch(action.type) {

	case 'RECEIVED_TOKEN': {
		localStorage.setItem('token', action.token)
		return {...state, token: action.token}
	}
		
	case 'RECEIVED_USER_PROFILE': {
		// Set null keys to initial values, except token
		Object.keys(initialState).filter(key => key !== 'token').forEach(key => {
			action.data.volunteerData[key] = action.data.volunteerData[key] || initialState[key];
		});

		let user = {...action.data.volunteerData, areas: action.data.areas ? action.data.areas : []}
		return {...state, ...user}
	}

	case 'LOG_OUT': {
		localStorage.removeItem('token')
		return {...state, ...initialState, token: ''}
	}

	default:
		return state
	}
}
export default userReducer
