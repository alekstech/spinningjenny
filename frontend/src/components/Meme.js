import React from 'react'
import { Link } from 'react-router-dom'
import withStyles from 'material-ui/styles/withStyles'
// components
import UserProfile from './UserProfile'

import EditProfile from './EditProfile'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import NotFound from './NotFound'

import { Route, Switch } from 'react-router-dom'


class Meme extends React.Component {
	constructor () {
		super()
	}

	render() {
		return (
			<Switch>
				<Route path="/user/:id/edit" component={EditProfile} />
				<Route path="/asdf" component={NotFound} />
				<Route path="/user/:id" component={UserProfile} />
			</Switch>
		)
	}
}

export default Meme
