let initialState = {
	logInLoading: false,
	emailedOtp: false,
	maskedEmail: '',
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
	
	// Auth
	case 'LOG_IN_LOADING': {
		return {...state, logInLoading: action.bool}
	}
	case 'EMAILED_OTP': {
		return {...state, emailedOtp: action.bool}
	}
	case 'RECEIVED_MASKED_EMAIL': {
		return {...state, maskedEmail: action.email}
	}
	case 'LOG_IN_ERROR_MESSAGE': {
		return {...state, logInErrorMessage: action.message}
	}
	case 'LOG_IN_ERRORED': {
		return {...state, logInErrored: action.bool}
	}
	case 'LOG_OUT': {
		localStorage.removeItem('token')
		return {...state, ...initialState}
	}

	// User profile
	case 'GET_PROFILE_IS_LOADING': {
		return {...state, getProfileLoading: action.bool}
	}
	case 'GET_PROFILE_HAS_ERRORED': {
		return {...state, getProfileErrored: action.bool}
	}
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

	// Teams

	default:
		return state
	}
}
export default uiReducer
