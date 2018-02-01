import React from 'react'
// components
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
// styles
import Fade from 'material-ui/transitions/Fade'
import withStyles from 'material-ui/styles/withStyles'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

const styles = {
	screenCover: {
		height: 'calc(100vh - 64px)',
		width: '100vw'
	},
	displayBlock: {
		display: 'block'
	},
	fullHeightColumn: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
}

class Login extends React.Component {
	constructor () {
		super()

		this.logIn = this.logIn.bind(this)
		this.closeSnackbar = this.closeSnackbar.bind(this)
		this.updateMembershipNumber = this.updateMembershipNumber.bind(this)
		this.updateInitial = this.updateInitial.bind(this)
		this.updateOtp = this.updateOtp.bind(this)
		this.validateMembershipNumber = this.validateMembershipNumber.bind(this)
		this.buttonIsDisabled = this.buttonIsDisabled.bind(this)
		this.validateOtp = this.validateOtp.bind(this)
		this.validateInitial = this.validateInitial.bind(this)

		this.state = {
			'membershipNumber': '',
			'initial': '',
			'otp': '',
			'validations': {
				membershipNumber: {
					error: false,
					errorMessage: ''
				},
				initial: {
					error: false,
					errorMessage: ''
				},
				otp: {
					error: false,
					errorMessage: ''
				}
			}
		}
	}

	componentWillMount() {
		if (this.props.user.token) {
			this.props.history.push('/user')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.token) {
			this.props.history.push('/user')
		}
	}

	updateMembershipNumber(event) {
		event.preventDefault()
		this.setState( {membershipNumber: event.target.value}, () => {
			if (this.state.membershipNumber.length) {
				this.validateMembershipNumber()
			}
		})
	}

	validateMembershipNumber() {
		let newState = this.state
		if (!this.state.membershipNumber.length) {
			newState.validations.membershipNumber.error = true
			newState.validations.membershipNumber.errorMessage = 'Cannot be blank'
		} else {
			newState.validations.membershipNumber.error = false
			newState.validations.membershipNumber.errorMessage = ''
		}
		this.setState(newState)
	}

	updateInitial(event) {
		event.preventDefault()
		event.target.value = event.target.value.slice(0, 1)
		this.setState( {initial: event.target.value}, () => {
			if (this.state.initial.length) {
				this.validateInitial()
			}
		})
	}

	validateInitial() {
		let newState = this.state
		if (!this.state.initial.length || !(/[A-Za-zÀ-öø-ʯ]/.test(this.state.initial))) {
			newState.validations.initial.error = true
			newState.validations.initial.errorMessage = 'Cannot be blank'
		} else {
			newState.validations.initial.error = false
			newState.validations.initial.errorMessage = ''
		}
		this.setState(newState)
	}

	updateOtp(event) {
		event.preventDefault()
		this.setState( {otp: event.target.value}, () => {
			if (this.state.otp.replace(/\D/g, '').length === 6) {
				this.validateOtp()
			}
		})
	}

	validateOtp() {
		let newState = this.state
		if (!(/(\d){6}/.test(this.state.otp.replace(/\D/g, '')))) {
			newState.validations.otp.error = true
			newState.validations.otp.errorMessage = 'Must be six digits'
		} else {
			newState.validations.otp.error = false
			newState.validations.otp.errorMessage = ''
		}
		this.setState(newState)
	}


	buttonIsDisabled() {
		if (this.props.ui.logInLoading) { 
			return true 
		} else if (!this.props.ui.emailedOtp && (this.state.validations.membershipNumber.error || this.state.validations.initial.error)) {
			return true
		} else if (this.props.ui.emailedOtp && this.state.validations.otp.error) {
			return true
		} else {
			return false
		}
	}

	logIn(event) {
		event.preventDefault()

		let options = {
			method: 'POST',
			body: JSON.stringify({
				'membershipNumber': this.state.membershipNumber.toString(),
				'initial': this.state.initial,
				'otp': this.state.otp
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}

		this.props.logIn('/authenticate', options)
	}

	closeSnackbar() {
		this.props.logInErrorMessage('')
		this.props.logInErrored(false)
	}

	render() {
		const items = () => {
			if (!this.props.ui.emailedOtp) {
				return (
					<form onSubmit={this.logIn} key='a'>
						<div>
							<Typography type="headline" gutterBottom>
								Log in
							</Typography>
						</div>
						<div>
							<Typography type="subheading" gutterBottom>
							Enter your Membership Number and first initial to log in.
							</Typography>
						</div>
						<div>
							<Divider />
						</div>
						<div>
							<TextField
								inputRef={(input) => { this.membershipNumber = input }}
								autoFocus={true}
								id="membershipNumber"
								label="Membership Number"
								value={this.state.membershipNumber || ''}
								onChange={e => this.updateMembershipNumber(e)}
								onBlur={e => this.validateMembershipNumber(e)}
								helperText={this.state.validations.membershipNumber.errorMessage}
								error={this.state.validations.membershipNumber.error}
								margin="normal"
							/>
						</div>

						<div>
							<TextField
								inputRef={(input) => { this.initial = input }}
								id="initial"
								label="Initial"
								value={this.state.initial || ''}
								onChange={e => this.updateInitial(e)}
								onBlur={e => this.validateInitial(e)}
								helperText={this.state.validations.initial.errorMessage}
								error={this.state.validations.initial.error}
								margin="normal"
							/>
						</div>

						<Button 
							type="submit" 
							raised 
							color="primary"
							disabled={this.buttonIsDisabled()}>
							Next
						</Button>
					</form>
				)
			} else {
				return (
					<form onSubmit={this.logIn} key='b'>
						<Typography type="title" gutterBottom>
						Check your email
						</Typography>
						<Typography type="subheading" gutterBottom>
						We sent an email with a Login Code to your address. Check your inbox and enter the Login Code below.
						</Typography>
						<Divider />
						<TextField
							inputRef={(input) => { this.loginCode = input }}
							autoFocus={true}
							style={styles.displayBlock}
							id="otp"
							label="Login Code"
							value={this.state.otp}
							onChange={e => this.updateOtp(e)}
							onBlur={e => this.validateOtp(e)}
							margin="normal"
							helperText={this.state.validations.otp.errorMessage}
							error={this.state.validations.otp.error}	
						/>

						<Button 
							type="submit" 
							raised 
							color="primary"
							disabled={this.buttonIsDisabled()}>
							Next
						</Button>
					</form>
				)
			}
		}

		return (
			<Grid container spacing={24} style={styles.screenCover}>
				<Grid item xs={1} sm={2} md={4} lg={4} xl={4}></Grid>
				<Grid item xs={10} sm={8} md={4} lg={4} xl={4} style={styles.screenCover}>
					<div style={styles.fullHeightColumn}>

						<ReactCSSTransitionReplace 
							transitionName="fade" 
							transitionEnterTimeout={500} 
							transitionLeaveTimeout={300}>
							{items()}
						</ReactCSSTransitionReplace>

						</div>
						<Snackbar
							open={this.props.ui.logInErrored}
							transition={Fade}
							SnackbarContentProps={{
								'aria-describedby': this.props.ui.logInErrorMessage
							}}
							autoHideDuration={5000}
							message={<span>{this.props.ui.logInErrorMessage}</span>}
							action={<Button color="accent" dense onClick={this.closeSnackbar}>Dismiss</Button>}
						/>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(Login)
