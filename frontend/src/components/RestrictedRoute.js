import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const RestrictedRoute = ({ component: Component, authed, ...rest }) => (
	<Route
	{...rest}
	render={props =>
	authed
		? <Component 
			{...props} 
			user={rest.user}
			updateUserProfile={rest.updateUserProfile} 
			getProfile={rest.getProfile}
		/>
		: <Redirect to={{ pathname: '/' }} />}
	/>
)

	RestrictedRoute.propTypes = {
		authed: PropTypes.bool.isRequired,
		component: PropTypes.func.isRequired
	}

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null, null, {
	pure: false
})(RestrictedRoute)