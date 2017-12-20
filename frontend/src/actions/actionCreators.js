import axios from 'axios'
import history from '../history'

// log out
export function logOut() {
	return {
		type: 'LOG_OUT'
	}
}

export function itemsHasErrored(bool) {
	return {
			type: 'ITEMS_HAS_ERRORED',
			hasErrored: bool
	}
}

export function itemsIsLoading(bool) {
	return {
			type: 'ITEMS_IS_LOADING',
			isLoading: bool
	}
}

export function itemsFetchDataSuccess(items) {
	return {
			type: 'ITEMS_FETCH_DATA_SUCCESS',
			items
	}
}

export function userCookieFound(cookie) {
	return {
			type: 'RECORDED_USER_COOKIE',
			cookie
	}
}

export function itemsFetchData(url, id) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true))

		let headers = new Headers()
		headers.append("id", id)
		fetch(url, {
			headers
    	})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText)
			}

			dispatch(itemsIsLoading(false))

			return response
		})
		.then((response) => response.json())
		.then((items) => dispatch(itemsFetchDataSuccess(items)))
		.catch(() => dispatch(itemsHasErrored(true)))
	}
}

export function updateUserProfile(event, data) {
	event.preventDefault()
	event.stopPropagation()
	return (dispatch) => {
		dispatch(itemsIsLoading(true))

		axios({
			url: 'http://localhost:5035/api/volunteer/' + data.id + '/update',
			method: 'post',
			headers: {'id': data.id},
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