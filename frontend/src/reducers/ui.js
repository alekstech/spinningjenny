let initialState = {
	logInLoading: false,
	emailedOtp: false,
	logInErrorMessage: '',
	logInErrored: false,
	getProfileLoading: false,
	getProfileErrored: false,
	updateProfileCompleted: false,
	updateProfileErrorMessage: '',
	updateProfileErrored: false
}

function uiReducer(state = initialState, action) {
	switch(action.type) {
	
	// Log in
	case 'LOG_IN_LOADING': {
		return {...state, logInLoading: action.bool}
	}
	case 'EMAILED_OTP': {
		return {...state, emailedOtp: action.bool}
	}
	case 'LOG_IN_ERROR_MESSAGE': {
		return {...state, logInErrorMessage: action.message}
	}
	case 'LOG_IN_ERRORED': {
		return {...state, logInErrored: action.bool}
	}

	// Get profile
	case 'GET_PROFILE_IS_LOADING': {
		return {...state, getProfileLoading: action.bool}
	}
	case 'GET_PROFILE_HAS_ERRORED': {
		return {...state, getProfileErrored: action.bool}
	}

	// Update profile
	case 'UPDATE_USER_PROFILE_IS_LOADING': {
		return {...state, updateProfileLoading: action.bool}
	}
	case 'UPDATE_USER_PROFILE_COMPLETED': {
		return {...state, updateProfileCompleted: action.bool}
	}
	case 'UPDATE_USER_PROFILE_HAS_ERRORED': {
		return {...state, updateProfileErrored: action.bool}
	}
	case 'UPDATE_USER_PROFILE_ERROR_MESSAGE': {
		return {...state, updateProfileErrorMessage: action.message}
	}

	//Log out
	case 'LOG_OUT': {
		localStorage.removeItem('token')
		return {...state, ...initialState}
	}

	default:
		return state
	}
}
export default uiReducer
