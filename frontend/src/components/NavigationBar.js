import React from 'react'
import { Link } from 'react-router-dom'
// components
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar'
import SwipeableDrawer from 'material-ui/SwipeableDrawer'
import Toolbar from 'material-ui/Toolbar'
// styles
import Fade from 'material-ui/transitions/Fade'
import withStyles from 'material-ui/styles/withStyles'
// icons
import AccountIcon from 'mdi-material-ui/Account'
import AccountMultipleIcon from 'mdi-material-ui/AccountMultiple'
import CloseIcon from 'mdi-material-ui/Close'
import Logout from 'mdi-material-ui/Logout'
import Menu from 'mdi-material-ui/Menu'
import tm_logo from '../assets/tm_logo.svg'

const styles = {
	flex_container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '64px'
	},
	logoImage: {
		maxWidth: '50px',
		maxHeight: '50px'
	}
}

class NavigationBar extends React.Component {
	constructor () {
		super()

		this.handleChange = this.handleChange.bind(this)
		this.logOut = this.logOut.bind(this)
		this.closeSnackbar = this.closeSnackbar.bind(this)
		this.openDrawer = this.openDrawer.bind(this)
		this.closeDrawer = this.closeDrawer.bind(this)

		this.state = {
			'id': '',
			'userIsLoggedIn': false,
			'loggedInUser': { 
				'volunteerData': {}
			},
			'snackbarOpen': false,
			'snackbarText': '',
			'drawer': false
		}
	}

	componentWillMount() {
		let cookie = localStorage.getItem('loggedInUser')
		if (cookie) {
			let newState = this.state
			newState.loggedInUser = JSON.parse(cookie)
			newState.userIsLoggedIn = true
			this.setState(newState)
		}
	}

	openDrawer() {
		this.setState({
			'drawer': true
		})
	}

	closeDrawer() {
		this.setState({
			'drawer': false
		})
	}

	handleChange(event) {
		event.preventDefault()
		this.setState( {id: event.target.value} )
	}

	logOut(event) {		
		event.preventDefault()

		this.props.logOut()
		localStorage.removeItem('token')
		let newState = this.state
		newState.loggedInUser = { 'volunteerData': {} }
		newState.userIsLoggedIn = false
		newState.snackbarOpen = true
		newState.snackbarText = 'You\'ve been logged out'
		this.setState(newState)
	}

	closeSnackbar() {
		this.setState({
			'snackbarText': '',
			'snackbarOpen': false
		})
	}

	render() {
		return (
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<AppBar position="static" color="default">
						<Toolbar>
							<div className={this.props.classes.flex_container}>

								<img src={tm_logo} alt="Two hands with interwoven fingers" style={styles.logoImage}/>
								Textile Museum of Canada Volunteers

								{this.props.user.id && 
									<IconButton aria-label="Open menu" onClick={this.openDrawer}>
										<Menu />
									</IconButton>
								}
							</div>
							<Snackbar
								open={this.state.snackbarOpen}
								onClose={this.closeSnackbar}
								transition={Fade}
								SnackbarContentProps={{
									'aria-describedby': this.state.snackbarText,
								}}
								message={<span id="saveResult">{this.state.snackbarText}</span>}
								action={[
									<Button key="dismiss" color="secondary" size="small" onClick={this.closeSnackbar}>
										Dismiss
									</Button>,
									<IconButton
										key="close"
										aria-label="Dismiss"
										color="inherit"
										onClick={this.closeSnackbar}
									>
										<CloseIcon />
									</IconButton>,
								]}
							/>
						</Toolbar>
					</AppBar>
					<SwipeableDrawer
						anchor="right"
						open={this.state.drawer}
						onClose={this.closeDrawer}
						onOpen={this.openDrawer}
					>
						<IconButton aria-label="Close menu" onClick={this.closeDrawer}>
							<CloseIcon />
						</IconButton>

						<Button aria-label="My profile" component={Link} to={`/user`} onClick={this.closeDrawer}>
							My profile
							<AccountIcon />
						</Button>

						{this.props.user.isAdmin && 
							<Button aria-label="Teams" component={Link} to={`/teams`} onClick={this.closeDrawer}>
								Teams
								<AccountMultipleIcon />
							</Button>
						}

						<Button aria-label="Log out" href='/' onClick={this.logOut} onClick={this.closeDrawer}>
							Log out
							<Logout />
						</Button>
					</SwipeableDrawer>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(NavigationBar)
