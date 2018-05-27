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
import ReactCSSTransitionReplace from 'react-css-transition-replace'

class Main extends React.Component {
	render() {
		return (
			<div>
				<ConnectNavigationBar></ConnectNavigationBar>
				<ReactCSSTransitionReplace 
					transitionName="fade" 
					transitionEnterTimeout={500} 
					transitionLeaveTimeout={300}
				>
					<div key={this.props.routing.location.pathname}>
						<Switch location={this.props.routing.location}>
							<Route path="/" exact render={ () => (<Login {...this.props} />) }/>
							<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/teams' component={ViewTeam} />
							<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user/edit' component={EditProfile} />
							<RestrictedRoute {...this.props} authed={this.props.user.token.length !== 0} path='/user' component={UserProfile} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</ReactCSSTransitionReplace>
			</div>
		)
	}
}

export default Main
