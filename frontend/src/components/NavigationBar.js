import React from 'react'
// components
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography';
// styles
import Fade from 'material-ui/transitions/Fade';
import withStyles from 'material-ui/styles/withStyles'
// icons
import Verified from 'mdi-material-ui/Verified'
import AccountCardDetails from 'mdi-material-ui/AccountCardDetails'

const styles = {
	flex_container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '100%'
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
		let cookie = localStorage.getItem('loggedInUser');
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
		localStorage.removeItem('loggedInUser');
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
			<Grid item xs={12}>
				<AppBar position="static" color="default">
					<Toolbar>
						<div className={this.props.classes.flex_container}>
							{this.props.user.id && 
								<Typography type="title" color="inherit">
									{this.props.user.firstName} {this.props.user.lastName}
								</Typography>
							}
							<div>
								{this.props.user.isAdmin && 
									<Tooltip title="Admin" placement="bottom">
										<Verified />
									</Tooltip>
								}
								{this.props.user.isStaff && 
									<Tooltip title="Staff" placement="bottom">
										<AccountCardDetails />
									</Tooltip>
								}
							</div>
							{this.props.user.id && 
								<Button type="button" onClick={this.logOut} raised color="primary">
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
		)
	}
}

export default withStyles(styles)(NavigationBar)
