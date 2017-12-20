import React from 'react'
// components
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
// styles
import Fade from 'material-ui/transitions/Fade';
import withStyles from 'material-ui/styles/withStyles'

const styles = {
	flex_container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	}

}

class Login extends React.Component {
	constructor () {
		super()

		this.handleChange = this.handleChange.bind(this)
		this.logIn = this.logIn.bind(this)
		this.closeSnackbar = this.closeSnackbar.bind(this)

		this.state = {
			'snackbarOpen': false,
			'snackbarText': ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.id) {
			this.props.history.push(`/user/${nextProps.user.id}`);
		}
	}

	closeSnackbar() {
		this.setState({
			'snackbarText': '',
			'snackbarOpen': false
		})
	}

	logIn(event) {
		event.preventDefault()

		let id = this.state.id
		let url = 'http://localhost:5035/api/volunteer/' + id
		this.props.itemsFetchData(url, id)	

		let newState = this.state
		delete newState.id
		this.setState(newState)
	}

	handleChange(event) {
		event.preventDefault()
		this.setState( {id: event.target.value} )
	}

	render() {
		return (
			<Grid item xs={12}>
				{!this.props.user.id && 
					<form onSubmit={this.logIn}>
						<div className={this.props.classes.flex_container}>
							<TextField
								id="volunteerId"
								label="Enter ID"
								value={this.state.id || ''}
								onChange={e => this.handleChange(e)}
								margin="normal"
							/>
							<Button type="submit" raised color="primary">
								Log in
							</Button>
						</div>
					</form>
				}
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
			</Grid>
		)
	}
}

export default withStyles(styles)(Login)
