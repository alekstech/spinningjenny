import React from 'react'
import axios from 'axios'
// components
import Button from 'material-ui/Button'
import { DatePicker } from 'material-ui-pickers'
import Grid from 'material-ui/Grid'
import Fade from 'material-ui/transitions/Fade';
import FormControl from 'material-ui/Form/FormControl'
import FormControlLabel from 'material-ui/Form/FormControlLabel'
import FormHelperText from 'material-ui/Form/FormHelperText'
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import MenuItem from 'material-ui/Menu/MenuItem';
import Select from 'material-ui/Select';
import Snackbar from 'material-ui/Snackbar';
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField'
import TextMaskCustom from './TextMaskCustom'
// styles
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import grey from 'material-ui/colors/grey'
import indigo from 'material-ui/colors/indigo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withStyles from 'material-ui/styles/withStyles'

const theme = createMuiTheme({})

const styles = {
	avatar: {
		left: 8, 
		backgroundColor: indigo[500],
	},
	chip: {
		margin: 4,
		backgroundColor: grey[200]
	},
	row: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-bewtween',
		alignItems: 'flex-start'
	},
	skillsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	marginRight10: {
		marginRight: '10px'
	},
	fullHeight: {
		height: '100%'
	}
}

class EditProfile extends React.Component {
	constructor (props) {
		super(props)

		this.getInitials = this.getInitials.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.closeSnackbar = this.closeSnackbar.bind(this)
		this.updateMembershipExpiry = this.updateMembershipExpiry.bind(this)
		this.flipInterestedInAdHoc = this.flipInterestedInAdHoc.bind(this)
		this.flipWillingToTrain = this.flipWillingToTrain.bind(this)
		this.flipStrandNewsMailings = this.flipStrandNewsMailings.bind(this)
		this.flipNonAdminsCanView = this.flipNonAdminsCanView.bind(this)
		this.flipStudent = this.flipStudent.bind(this)
		this.flipEmployed = this.flipEmployed.bind(this)

		this.state = {
			'volunteer': {...this.props.user},
			'updateUserProfile': this.props.updateUserProfile,
			'validations': {},
			'skills': ['IT', 'people skills', 'accounting', 'library', 'project management', 'restoration', 'other'],
			'roles': ['front desk', 'docent', 'guide', 'project manager', 'other'],
			'snackbarOpen': false,
			'snackbarText': ''
		}
	}

	updateMembershipExpiry(date) {
		let newVolunteer = this.state.volunteer
		newVolunteer.membershipExpiry = date.format('YYYY-MM-DD')
		this.setState({ volunteer: newVolunteer })
	}

	closeSnackbar() {
		this.setState({
			'snackbarText': '',
			'snackbarOpen': false
		})
	}

	getInitials(first, last) {
		if (first && last) {
			return first.charAt(0) + last.charAt(0)
		} else if (first) {
			return first.charAt(0)
		} else {
			return null
		}
	}

	handleChange (event, key, data) {
		event.stopPropagation()

		var newVolunteer = Object.assign({}, this.state.volunteer)
		if (key === 'interestedInAdHoc' || key === 'willingToTrain' || key === 'strandNewsMailings' || key === 'student' || key === 'employed') {
			event.target.value === 'on' ? event.target.value = true : event.target.value = false
		}
		if (key === 'role') {
			this.state.volunteer.desiredRoles.includes(data) ? this.state.volunteer.desiredRoles.splice( this.state.volunteer.desiredRoles.indexOf(data), 1 ) : this.state.volunteer.desiredRoles.push(data)
		}
		if (key === 'skill') {
			this.state.volunteer.skills.includes(data) ? this.state.volunteer.skills.splice( this.state.volunteer.skills.indexOf(data), 1 ) : this.state.volunteer.skills.push(data)
		}
		newVolunteer[key] = event.target.value === 'true' || event.target.value === 'false' ? JSON.parse(event.target.value) : event.target.value

		this.setState({'volunteer': newVolunteer})
	}

	flipInterestedInAdHoc(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.interestedInAdHoc = value
		this.setState({ volunteer: newVolunteer })
	}
	flipWillingToTrain(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.willingToTrain = value
		this.setState({ volunteer: newVolunteer })
	}
	flipStrandNewsMailings(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.strandNewsMailings = value
		this.setState({ volunteer: newVolunteer })
	}
	flipNonAdminsCanView(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.nonAdminsCanView = value
		this.setState({ volunteer: newVolunteer })
	}
	flipStudent(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.student = value
		this.setState({ volunteer: newVolunteer })
	}
	flipEmployed(event, value) {
		let newVolunteer = this.state.volunteer
		newVolunteer.employed = value
		this.setState({ volunteer: newVolunteer })
	}

	validate (event, key, required) {
		var newValidations = Object.assign({}, this.state.validations)
		let regex
		let errorMessage

		/* eslint-disable no-useless-escape */
		switch(key) {
			case 'firstName':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^[A-zÀ-ÿ-\'\s]{1,35}$')
				break;
			case 'lastName':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^[A-zÀ-ÿ-\'\s]{1,35}$')
				break;
			case 'email':
				errorMessage = 'Email addresses only'
				regex = new RegExp('\\w+@\\w+.*')
				break;
				// isAdmin
				// isStaff
			case 'mailingAddress1':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^([A-zÀ-ÿ\\d\\s:\\\\#/()"\';!?-]){1,32}$')
				break;
			case 'mailingAddress2':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^([A-zÀ-ÿ\\d\\s:\\\\#/()"\';!?-]){0,32}$')
				break;
			case 'postcode':
				errorMessage = 'Canadian postcodes only'
				regex = new RegExp('^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$')
				break;
			case 'city':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^([A-zÀ-ÿ\\s\'-]){1,35}$')
				break;
			case 'province':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^([A-z\\s]){1,35}$')
				break;
			case 'phone':
				errorMessage = 'Canadian numbers only'
				regex = new RegExp('^([\\d]){10}$')
				break;
			case 'emergencyName':
				errorMessage = 'Letters, spaces and punctuation only'
				regex = new RegExp('^[A-zÀ-ÿ-\'\s]{1,35}$')
				break;
			case 'emergencyPhone':
				errorMessage = 'Canadian numbers only'
				regex = new RegExp('^([\\d]){10}$')
				break;
			case 'membershipNumber':
				errorMessage = 'Must be seven digits'
				regex = new RegExp('^([\\d]){7}$')
				break;
			case 'membershipExpiry':
				errorMessage = 'Must be seven digits'
				regex = new RegExp('^([\\d]){7}$')
				break;
			default:
				break
		}
		/* eslint-enable no-useless-escape */

		let clean = event.target.value
		if (regex.test(clean)) {
			newValidations[key] = {
				error: false,
				errorMessage: ''
			}
			this.setState({ validations: newValidations })
		} else if (required && event.target.value === '') {
			newValidations[key] = {
				error: true,
				errorMessage: 'Cannot be empty'
			}
			this.setState({ validations: newValidations })
		} else {
			newValidations[key] = {
				error: true,
				errorMessage
			}
			this.setState({ validations: newValidations })
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const _this = this

		axios.post('http://localhost:5035/api/volunteer/' + _this.state.volunteer.id + '/update', _this.state.volunteer)
			.then(function (response) {
		    	if (response.status === 200 && response.data[0] === 1) {
		    		_this.setState({
		    			'snackbarText': 'Saved.',
		    			'snackbarOpen': true
		    		})
		    	}
			})
			.catch(function (error) {
				_this.setState( {
					'snackbarText': 'Saving failed. Please try again.',
					'snackbarOpen': true
				})
			});
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Grid container spacing={24}>
					<Grid item xs={3}></Grid>
					<Grid item xs={6}>

						<form onSubmit={e => this.props.updateUserProfile(e, this.state.volunteer)}>

							<div style={styles.row}>
								<TextField
									id="firstName"
									label="First name"
									value={this.state.volunteer.firstName || ''}
									onChange={e => this.handleChange(e, 'firstName')}
									onBlur={e => this.validate(e, 'firstName', true)} 
									margin="normal"
									error={this.state.validations.firstName ? this.state.validations.firstName.error : false}
									helperText={this.state.validations.firstName && this.state.validations.firstName.error ? this.state.validations.firstName.errorMessage : ''}
									style={styles.marginRight10}
								/>

								<TextField
									id="lastName"
									label="Last name"
									value={this.state.volunteer.lastName || ''}
									onChange={e => this.handleChange(e, 'lastName')}
									onBlur={e => this.validate(e, 'lastName', true)} 
									margin="normal"
									error={this.state.validations.lastName ? this.state.validations.lastName.error : false}
									helperText={this.state.validations.lastName && this.state.validations.lastName.error ? this.state.validations.lastName.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<TextField
									id="email"
									label="Email"
									value={this.state.volunteer.email || ''}
									onChange={e => this.handleChange(e, 'email')}
									onBlur={e => this.validate(e, 'email', true)} 
									margin="normal"
									error={this.state.validations.email ? this.state.validations.email.error : false}
									helperText={this.state.validations.email && this.state.validations.email.error ? this.state.validations.email.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<TextField
									id="mailingAddress1"
									label="Address line 1"
									value={this.state.volunteer.mailingAddress1 || ''}
									onChange={e => this.handleChange(e, 'mailingAddress1')}
									onBlur={e => this.validate(e, 'mailingAddress1', true)} 
									margin="normal"
									error={this.state.validations.mailingAddress1 ? this.state.validations.mailingAddress1.error : false}
									helperText={this.state.validations.mailingAddress1 && this.state.validations.mailingAddress1.error ? this.state.validations.mailingAddress1.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<TextField
									id="mailingAddress2"
									label="Address line 2"
									value={this.state.volunteer.mailingAddress2 || ''}
									onChange={e => this.handleChange(e, 'mailingAddress2')}
									onBlur={e => this.validate(e, 'mailingAddress2', false)} 
									margin="normal"
									error={this.state.validations.mailingAddress2 ? this.state.validations.mailingAddress2.error : false}
									helperText={this.state.validations.mailingAddress2 && this.state.validations.mailingAddress2.error ? this.state.validations.mailingAddress2.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<TextField
									id="city"
									label="City"
									value={this.state.volunteer.city || ''}
									onChange={e => this.handleChange(e, 'city')}
									onBlur={e => this.validate(e, 'city', true)} 
									margin="normal"
									error={this.state.validations.city ? this.state.validations.city.error : false}
									helperText={this.state.validations.city && this.state.validations.city.error ? this.state.validations.city.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<FormControl style={styles.fullHeight}>
									<InputLabel htmlFor="province">Province</InputLabel>
									<Select
										value={this.state.volunteer.province}
										onChange={e => this.handleChange(e, 'province')}
										onBlur={e => this.validate(e, 'province', true)} 
										input={<Input id="province" />}
									>
									<MenuItem value="">
										<em>Select province</em>
									</MenuItem>
									<MenuItem value={'Alberta'}>Alberta</MenuItem>
									<MenuItem value={'British Columbia'}>British Columbia</MenuItem>
									<MenuItem value={'Manitoba'}>Manitoba</MenuItem>
									<MenuItem value={'New Brunswick'}>New Brunswick</MenuItem>
									<MenuItem value={'Newfoundland and Labrador'}>Newfoundland and Labrador</MenuItem>
									<MenuItem value={'Northwest Territories'}>Northwest Territories</MenuItem>
									<MenuItem value={'Nova Scotia'}>Nova Scotia</MenuItem>
									<MenuItem value={'Nunavut'}>Nunavut</MenuItem>
									<MenuItem value={'Ontario'}>Ontario</MenuItem>
									<MenuItem value={'Prince Edward Island'}>Prince Edward Island</MenuItem>
									<MenuItem value={'Québec'}>Québec</MenuItem>
									<MenuItem value={'Saskatchewan'}>Saskatchewan</MenuItem>
									<MenuItem value={'Yukon'}>Yukon</MenuItem>
									<MenuItem value={'other'}>other</MenuItem>
									</Select>
								</FormControl>

								<FormControl>
									<InputLabel htmlFor="postcode" shrink={Boolean(this.state.volunteer.postcode)}>Postcode</InputLabel>
									<Input
										id="postcode"
										value={this.state.volunteer.postcode}
										inputComponent={TextMaskCustom}
										onChange={e => this.handleChange(e, 'postcode')}
										onBlur={e => this.validate(e, 'postcode', true)} 
										inputProps={{
											'aria-label': 'Phone number',
											mask: [/[ABCEGHJKLMNPRSTVXY]/, /[0-9]/, /[ABCEGHJKLMNPRSTVWXYZ]/, '  ', /[0-9]/, /[ABCEGHJKLMNPRSTVWXYZ]/, /[0-9]/],
											placeholderChar: '\u2000',
											showMask: true,
											keepCharPositions: true
										}}
										style={styles.marginRight10}
									/>
									<FormHelperText>{this.state.validations.postcode && this.state.validations.postcode.error ? this.state.validations.postcode.errorMessage : ''}</FormHelperText>
								</FormControl>
							</div>

							<div style={styles.row}>
								<FormControl>
								  <InputLabel htmlFor="phone" shrink={Boolean(this.state.volunteer.phone !== '')}>Phone</InputLabel>
								  <Input
								  	id="phone"
								  	value={this.state.volunteer.phone}
								  	inputComponent={TextMaskCustom}
								  	onChange={e => this.handleChange(e, 'phone')}
								  	onBlur={e => this.validate(e, 'phone', true)} 
								  	inputProps={{
								  		'aria-label': 'Phone number',
								  		mask: ['(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
								  		placeholderChar: '\u2000',
								  		showMask: true,
								  		keepCharPositions: true
								  	}}
								  />
								</FormControl>
							</div>

							<div style={styles.row}>
								<TextField
									id="emergencyName"
									label="Emergency contact"
									value={this.state.volunteer.emergencyName || ''}
									onChange={e => this.handleChange(e, 'emergencyName')}
									onBlur={e => this.validate(e, 'emergencyName', true)} 
									margin="normal"
									error={this.state.validations.emergencyName ? this.state.validations.emergencyName.error : false}
									helperText={this.state.validations.emergencyName && this.state.validations.emergencyName.error ? this.state.validations.emergencyName.errorMessage : ''}
								/>
							</div>

							<div style={styles.row}>
								<FormControl>
									<InputLabel htmlFor="emergencyPhone" shrink={Boolean(this.state.volunteer.emergencyPhone !== '')}>Emergency phone</InputLabel>
									<Input
										id="emergencyPhone"
										value={this.state.volunteer.emergencyPhone}
										inputComponent={TextMaskCustom}
										onChange={e => this.handleChange(e, 'emergencyPhone')}
										onBlur={e => this.validate(e, 'emergencyPhone', true)}
										inputProps={{
											'aria-label': 'Emergency phone',
											mask: ['(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
											placeholderChar: '\u2000',
											showMask: true,
											keepCharPositions: true
										}}
									/>
								</FormControl>
							</div>

							<div style={styles.row}>
								<FormControl>
								  <InputLabel htmlFor="membershipNumber" shrink={Boolean(this.state.volunteer.membershipNumber !== '')}>Membership number</InputLabel>
								  <Input
								  	id="membershipNumber"
								  	value={this.state.volunteer.membershipNumber}
								  	inputComponent={TextMaskCustom}
								  	onChange={e => this.handleChange(e, 'membershipNumber')}
								  	onBlur={e => this.validate(e, 'membershipNumber', true)}
								  	inputProps={{
								  		'aria-label': 'Membership number',
								  		mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
								  		placeholderChar: '\u2000',
								  		showMask: true,
								  		keepCharPositions: true
								  	}}
								  />
								</FormControl>
							</div>

							<div>
								<DatePicker
									value={this.state.volunteer.membershipExpiry}
									onChange={this.updateMembershipExpiry}
									format='YYYY-MM-DD'
									label="Membership expiry"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.interestedInAdHoc}
											onChange={this.flipInterestedInAdHoc}
											value={this.state.volunteer.interestedInAdHoc.toString()}
										/>
									}
									label="Interested in ad hoc events"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.willingToTrain}
											onChange={this.flipWillingToTrain}
											value={this.state.volunteer.willingToTrain.toString()}
										/>
									}
									label="Willing to train others"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.strandNewsMailings}
											onChange={this.flipStrandNewsMailings}
											value={this.state.volunteer.strandNewsMailings.toString()}
										/>
									}
									label="Strand News subscriber"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.nonAdminsCanView}
											onChange={this.flipNonAdminsCanView}
											value={this.state.volunteer.nonAdminsCanView.toString()}
										/>
									}
									label="Share my profile with team mates"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.student}
											onChange={this.flipStudent}
											value={this.state.volunteer.student.toString()}
										/>
									}
									label="In education"
								/>
							</div>

							<div style={styles.row}>
								<FormControlLabel
									control={
										<Switch
											checked={this.state.volunteer.employed}
											onChange={this.flipEmployed}
											value={this.state.volunteer.employed.toString()}
										/>
									}
									label="In employment"
								/>
							</div>

							<Button type="submit" raised color="primary">
								Save
							</Button>
						</form>

						<div>
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
						</div>
					</Grid>

				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles)(EditProfile)
