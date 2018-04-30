import React from 'react'
// components
import ConnectNavigationBar from './ConnectNavigationBar'
import EditProfile from './EditProfile'
import Login from './Login'
import NotFound from './NotFound'
import RestrictedRoute from './RestrictedRoute'
import { Route, Switch } from 'react-router-dom'
import UserProfile from './UserProfile'
import ViewTeam from './ViewTeam'

class Main extends React.Component {
	render() {
		return (
			<div>
				<ConnectNavigationBar></ConnectNavigationBar>
				<Switch>
					<Route path="/" exact render={ () => (<Login {...this.props} />) }/>
					<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/teams' component={ViewTeam} />
					<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user/edit' component={EditProfile} />
					<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user' component={UserProfile} />
					<Route component={NotFound} />
				</Switch>
			</div>
		)
	}
}

export default Main
