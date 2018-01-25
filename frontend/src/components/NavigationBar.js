import React from 'react'
import { Link } from 'react-router-dom'
// components
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar'
import Toolbar from 'material-ui/Toolbar'
// styles
import Fade from 'material-ui/transitions/Fade'
import withStyles from 'material-ui/styles/withStyles'
// icons
import tm_logo from '../assets/tm_logo.svg'

const styles = {
	flex_container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '64px'
	},
	logoContainer: {
		maxWidth: '64px',
		maxHeight: '64px',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
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

		this.state = {
			'id': '',
			'userIsLoggedIn': false,
			'loggedInUser': { 
				'volunteerData': {}
			},
			'snackbarOpen': false,
			'snackbarText': ''
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

	closeSnackbar() {
		this.setState({
			'snackbarText': '',
			'snackbarOpen': false
		})
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

	handleChange(event) {
		event.preventDefault()
		this.setState( {id: event.target.value} )
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<AppBar position="static" color="default">
						<Toolbar>
							<div className={this.props.classes.flex_container}>

								<img src={tm_logo} alt="Textile Museum Logo" style={styles.logoImage}/>

								{this.props.user.id && 
									<Button raised color="primary" onClick={this.logOut} component={Link} to={'/'}>
										Log out
									</Button>
								}
							</div>
							<Snackbar
								open={this.state.snackbarOpen}
								onRequestClose={this.closeSnackbar}
								transition={Fade}
								SnackbarContentProps={{
									'aria-describedby': this.state.snackbarText,
								}}
								message={<span id="saveResult">{this.state.snackbarText}</span>}
								action={<Button color="accent" dense onClick={this.closeSnackbar}>Dismiss</Button>}
							/>
						</Toolbar>
					</AppBar>
			</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(NavigationBar)
