let initialState = {
	logInLoading: false,
	emailedOtp: false
}

function uiReducer(state = initialState, action) {
	switch(action.type) {
	case 'LOG_IN_LOADING': {
		let newState = state
		newState.logInLoading = action.isLoading
		return newState
	}
	case 'EMAILED_OTP': {
		let newState = state
		newState.emailedOtp = true
		return newState
	}
	case 'LOG_IN_ERROR_MESSAGE': {
		let newState = state
		newState.logInErrorMessage = action.message
		return newState
	}
	case 'LOG_IN_ERRORED': {
		let newState = state
		newState.logInErrored = action.bool
		return newState
	}
	default:
		return state
	}
}
export default uiReducer
