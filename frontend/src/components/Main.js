import React from 'react'
import { Route, Switch } from 'react-router-dom'
// components
import Grid from 'material-ui/Grid'
import ConnectNavigationBar from './ConnectNavigationBar'
import NotFound from './NotFound'
import Home from './Home'
import ViewTeam from './ViewTeam'
import UserProfile from './UserProfile'
import EditProfile from './EditProfile'
import PrivateRoute from './PrivateRoute'
// styles
import './App.css'

class Main extends React.Component {
	constructor () {
		super()
		this.state = {}
	}

	componentWillMount() {
		let cookie = localStorage.getItem('id');
		if (cookie) {
			let url = 'http://localhost:5035/api/volunteer/' + cookie
			this.props.itemsFetchData(url, cookie)
		}
	}

	render() {
		return (
			<Grid container spacing={24}>
				<ConnectNavigationBar></ConnectNavigationBar>
				<Switch>
					<Route path="/" exact render={ () => (<Home {...this.props} />) }/>
					<PrivateRoute {...this.props} authed={!(this.props.user.id === undefined)} path='/teams/:id' component={ViewTeam} />
					<PrivateRoute {...this.props} authed={!(this.props.user.id === undefined)} path='/user/:id/edit' component={EditProfile} />
					<PrivateRoute {...this.props} authed={!(this.props.user.id === undefined)} path='/user/:id' component={UserProfile} />
					<Route component={NotFound} />
				</Switch>
			</Grid>
		)
	}
}

export default Main
