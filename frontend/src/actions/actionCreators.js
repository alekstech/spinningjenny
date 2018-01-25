import axios from 'axios'
import history from '../history'
import { apiPath } from '../config'

// ===================================================================
// Get OTP
// ===================================================================
export function logIn(resourcePath, options) {
	return (dispatch) => {
		dispatch(logInLoading(true))
		let url = apiPath + resourcePath
		axios({
			url,
			method: options.method,
			headers: options.headers,
			data: options.body
		})
		.then((response) => {
			dispatch(logInLoading(false))
			dispatch(logInErrorMessage(''))
			dispatch(logInErrored(false))
			response.data.token ? dispatch(receivedToken(response.data.token)) : dispatch(emailedOtp(response.data.message))
		})
		.catch((error) => {
			if (error.response.data) {
				dispatch(logInLoading(false))
				dispatch(logInErrorMessage(error.response.data.message))
				dispatch(logInErrored(true))
			}
		})
	}
}

export function logInLoading(bool) {
	return {
		type: 'LOG_IN_LOADING',
		isLoading: bool
	}
}

export function receivedToken(token) {
	return {
		type: 'RECEIVED_TOKEN',
		token
	}
}

export function emailedOtp(message) {
	return {
		type: 'EMAILED_OTP',
		message
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

		dispatch(itemsIsLoading(true))

		let url = apiPath + resourcePath

		axios({
			url,
			method: options.method,
			headers: options.headers,
			data: options.body
		})
		.then((response) => {
			if (response.success === false) {
				throw Error(response.message)
			}
			if (response) {
				dispatch(receivedUserProfile(response))
			}
			dispatch(itemsIsLoading(false))
		})
		.catch(() => dispatch(itemsHasErrored(true)))
	}
}

export function itemsIsLoading(bool) {
	return {
		type: 'ITEMS_IS_LOADING',
		isLoading: bool
	}
}

export function receivedUserProfile(items) {
	return {
		type: 'RECEIVED_USER_PROFILE',
		items
	}
}

export function itemsHasErrored(bool) {
	return {
		type: 'ITEMS_HAS_ERRORED',
		hasErrored: bool
	}
}

// ===================================================================
// Update profile
// ===================================================================
export function updateUserProfile(data) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true))
		
		let url = apiPath + '/api/volunteer/' + data.id + '/update'
		axios({
			url,
			method: 'post',
			headers: {'auth-token': data.token},
			data
		})
		.then(function (response) {
			if (response.status === 200) {
				history.push('/')
			} else {
				throw Error(response.statusText)
			}
			return response
		})
		.then((response) => response.json())
		.then((items) => dispatch(itemsFetchDataSuccess(items)))
		.catch(() => dispatch(itemsHasErrored(true)))
	}
}

export function itemsFetchDataSuccess(items) {
	return {
		type: 'ITEMS_FETCH_DATA_SUCCESS',
		items
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
