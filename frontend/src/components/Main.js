import React from 'react'
import { Route, Switch } from 'react-router-dom'
// components
import ConnectNavigationBar from './ConnectNavigationBar'
import NotFound from './NotFound'
import Login from './Login'
import ViewTeam from './ViewTeam'
import UserProfile from './UserProfile'
import EditProfile from './EditProfile'
import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'

class Main extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div>
				<ConnectNavigationBar></ConnectNavigationBar>
				<Switch>
					<Route path="/" exact render={ () => (<Login {...this.props} />) }/>
					<PrivateRoute {...this.props} authed={!(this.props.user.id === undefined)} path='/teams/:id' component={ViewTeam} />
					<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user/edit' component={EditProfile} />
					<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user' component={UserProfile} />
					<Route component={NotFound} />
				</Switch>
			</div>
		)
	}
}

export default Main
