import React from 'react'
import { Route, Redirect } from 'react-router-dom'


function PrivateRoute ({component: Component, authed, ...rest}) {
	console.log('PrivateRoute jhgllglgljg', rest.user)
	return (
		<Route
			{...rest}
			render={(props) => authed === true
			? <Component 
				{...props} 
				user={rest.user}
				updateUserProfile={rest.updateUserProfile} 
				getProfile={rest.getProfile} />
			: <Redirect to={{pathname: '/', state: {from: props.location}}} />}
		/>
	)
}

export default PrivateRoute
