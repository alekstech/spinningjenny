import axios from 'axios'

// ===================================================================
// Get OTP
// ===================================================================
export function logIn(resourcePath, options) {
	return (dispatch) => {

		dispatch(logInLoading(true))

		axios({
			url: resourcePath,
			method: options.method,
			headers: options.headers,
			data: options.body
		})
		.then((response) => {
			console.log('logIn', response)
			dispatch(logInLoading(false))
			dispatch(logInErrorMessage(''))
			dispatch(logInErrored(false))
			if (response.data.token) {
				dispatch(receivedToken(response.data.token))
			} else {
				dispatch(emailedOtp(true))
				dispatch(receivedMaskedEmail(response.data.email))
			}
		})
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch(logInLoading(false))
				dispatch(logInErrorMessage(error.response.data.message || 'Could not connect. Check your Internet connection and try again.'))
				dispatch(logInErrored(true))
			} else {
				console.log(error)
			}
		})
	}
}

export function logInLoading(bool) {
	return {
		type: 'LOG_IN_LOADING',
		bool
	}
}

export function receivedToken(token) {
	return {
		type: 'RECEIVED_TOKEN',
		token
	}
}

export function emailedOtp(bool) {
	return {
		type: 'EMAILED_OTP',
		bool
	}
}

export function receivedMaskedEmail(email) {
	return {
		type: 'RECEIVED_MASKED_EMAIL',
		email
	}
}

export function logInErrored(bool) {
	return {
		type: 'LOG_IN_ERRORED',
		bool
	}
}

export function logInErrorMessage(message) {
	return {
		type: 'LOG_IN_ERROR_MESSAGE',
		message
	}
}

// ===================================================================
// Get volunteer profile
// ===================================================================
export function getProfile(resourcePath, options) {
	return (dispatch) => {

		dispatch(getProfileIsLoading(true))

		axios({
			url: resourcePath,
			method: options.method,
			headers: options.headers,
			data: options.body
		})
		.then((response) => {
			if (response.status !== 200) {
				throw Error(response.message)
			} else {
				dispatch(receivedUserProfile(response.data))
			}
			dispatch(getProfileIsLoading(false))
		})
		.catch(() => dispatch(getProfileHasErrored(true)))
	}
}

export function getProfileIsLoading(bool) {
	return {
		type: 'GET_PROFILE_IS_LOADING',
		bool
	}
}

export function receivedUserProfile(data) {
	return {
		type: 'RECEIVED_USER_PROFILE',
		data
	}
}

export function getProfileHasErrored(bool) {
	return {
		type: 'GET_PROFILE_HAS_ERRORED',
		bool
	}
}

// ===================================================================
// Update profile
// ===================================================================
export function updateUserProfile(resourcePath, options) {
	return (dispatch) => {
		dispatch(updateUserProfileIsLoading(true))
		dispatch(updateUserProfileCompleted(false))
		
		axios({
			url: resourcePath,
			method: options.method,
			headers: options.headers,
			data: options.body
		})
		.then(function (response) {
			dispatch(updateUserProfileIsLoading(false))
			dispatch(updateUserProfileErrorMessage(''))
			dispatch(updateUserProfileHasErrored(false))
			dispatch(updateUserProfileCompleted(true))
			dispatch(receivedUserProfile(response.data))
		})
		.catch((error) => {
			if (error.response && error.response.data) {
				dispatch(updateUserProfileIsLoading(false))
				dispatch(updateUserProfileErrorMessage(error.response.data.message))
				dispatch(updateUserProfileHasErrored(true))
			} else {
				console.log(error)
			}
		})
	}
}
 
export function updateUserProfileIsLoading(bool) {
	return {
		type: 'UPDATE_USER_PROFILE_IS_LOADING',
		bool
	}
}

export function updateUserProfileCompleted(bool) {
	return {
		type: 'UPDATE_USER_PROFILE_COMPLETED',
		bool
	}
}

export function updateUserProfileHasErrored(bool) {
	return {
		type: 'UPDATE_USER_PROFILE_HAS_ERRORED',
		bool
	}
}

export function updateUserProfileErrorMessage(message) {
	return {
		type: 'UPDATE_USER_PROFILE_ERROR_MESSAGE',
		message
	}
}


// ===================================================================
// Log out
// ===================================================================
export function logOut() {
	return {
		type: 'LOG_OUT'
	}
}
