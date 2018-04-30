import React from 'react'
import { Link } from 'react-router-dom'
// components
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import Card from 'material-ui/Card'
import CardContent from 'material-ui/Card/CardContent'
import Grid from 'material-ui/Grid'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListItemIcon from 'material-ui/List/ListItemIcon'
import ListItemText from 'material-ui/List/ListItemText'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
// styles
import grey from 'material-ui/colors/grey'
import withStyles from 'material-ui/styles/withStyles'
// icons
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import NavigationCheck from 'mdi-material-ui/Check'
import NavigationClose from 'mdi-material-ui/Close'
import Pencil from 'mdi-material-ui/Pencil'

const styles = {
	chip: {
		margin: 4,
		backgroundColor: grey[200]
	},
	row: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	skillsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	spinnerContainer: {
		display: 'flex',
		width: '100vw',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center'
	},
	marginTop10: {
		marginTop: '10px'
	}
}

class UserProfile extends React.Component {
	constructor (props) {
		super(props)
		this.formatDateMMDDYYY = this.formatDateMMDDYYY.bind(this)
		this.formatPhone = this.formatPhone.bind(this)
	}

	componentWillMount () {
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain',
				'auth-token': this.props.user.token
			}
		}

		this.props.getProfile('/api/volunteer', options)
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.user.token) {
			this.props.history.push('/')
		}
	}

	formatDateMMDDYYY(date = 'n/a') {
		if (date === 'n/a') {
			return date
		} else if (isNaN(Date.parse(date)) === false) {
			let dateObject = new Date(date)
			return dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getDate()
		} else {
			return 'n/a'
		}
	}

	formatPhone(phone = '') {
		let extension = ''
		if (phone.length > 10) {
			extension = ' ext. ' + phone.slice(10)
			phone = phone.slice(0, 10)
		}
		return phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6) + extension
	}

	render() {
		if (this.props.user.id === undefined) {
			return (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<div style={styles.spinnerContainer}>
							<CircularProgress />
						</div>
					</Grid>
				</Grid>
			)
		} else if (this.props.ui.getProfileErrored === true) {
			return (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<div style={styles.spinnerContainer}>
							<Card>
								<CardContent>
									<Typography type="headline" component="h2">
										Sorry
									</Typography>
									<Typography component="p">
									We could not load your profile.
									</Typography>
								</CardContent>
							</Card>
						</div>
					</Grid>
				</Grid>
			)
		} else {
			return (
				<Grid container spacing={0}>
					<Grid item xs={1} sm={2} md={4} lg={4} xl={4}></Grid>
					<Grid item xs={10} sm={8} md={4} lg={4} xl={4}>
						<div style={{...styles.row, ...styles.marginTop10}}>
							<Typography type="headline" gutterBottom={true}>{`${this.props.user.firstName} ${this.props.user.lastName}`}</Typography> 
							<Tooltip title="Edit">
								<Button variant="fab" color="primary" aria-label="edit" component={Link} to={`/user/edit`}>
									<Pencil />
								</Button>
							</Tooltip>
						</div>
							
							{(this.props.user.isAdmin && this.props.user.isStaff && <Typography gutterBottom={true}>Administrator, Staff Member</Typography>) || (this.props.user.isAdmin && <Typography gutterBottom={true}>Administrator</Typography>) || (this.props.user.isStaff && <Typography gutterBottom={true}>Staff Member</Typography>) || (<Typography gutterBottom={true}>Volunteer</Typography>)}

							<Typography type="body1" gutterBottom={true}>{this.props.user.email}</Typography>

							<Divider />

							<Typography type="body2">Address</Typography>
							<Typography type="body1">{this.props.user.mailingAddress1}</Typography>
							<Typography type="body1">{this.props.user.mailingAddress2}</Typography>
							<Typography type="body1">{this.props.user.city}</Typography>
							<Typography type="body1">{this.props.user.province} {this.props.user.postcode}</Typography>

							<Divider />

							<Typography type="body2">Phone</Typography>
							<Typography type="body1" gutterBottom={true}>{this.formatPhone(this.props.user.phone)}</Typography>

							<Divider />

							<Typography type="body2">Emergency contact</Typography>
							<Typography type="body1">{this.props.user.emergencyName}</Typography>
							<Typography type="body1" gutterBottom={true}>{this.formatPhone(this.props.user.emergencyPhone)}</Typography>

							<Divider />

							<Typography type="body2">Member info</Typography>
							<Typography type="body1">Membership no. {this.props.user.membershipNumber}</Typography>
							<Typography type="body1">Valid until {this.formatDateMMDDYYY(this.props.user.membershipExpiry) || 'n/a'}</Typography>
							<Typography type="body1">Member since {this.formatDateMMDDYYY(this.props.user.createdAt) || 'n/a'}</Typography>
							<Typography type="body1" gutterBottom={true}>Volunteer since {this.formatDateMMDDYYY(this.props.user.startDate)}</Typography>

							{this.props.user.skills.length > 0 &&  <Divider />}

							{this.props.user.skills.length > 0 && <Typography type="body2">Skills</Typography>}

							{this.props.user.skills && 
								<div style={styles.skillsWrapper}>
									{this.props.user.skills.map((skill, index) => {
											return <Chip label={skill} key={`skill${index}`} style={styles.chip} />
										})
									}
								</div>
							}

							<Divider />

							<Typography type="body2">Preferences</Typography>
							<List>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.interestedInAdHoc && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="Interested in ad hoc events" />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.willingToTrain && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="Willing to train others" />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.nonAdminsCanView && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="Sharing profile with team mates" />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.strandNewsMailings && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="Strand News subscriber" />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.student && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="In school" />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										{(this.props.user.employed && <NavigationCheck />) || <NavigationClose />}
									</ListItemIcon>
									<ListItemText primary="Currently employed" />
								</ListItem>
							</List>

							<Divider />

							{this.props.user.areas[0] && <Typography type="body2">Teams</Typography>}
							{this.props.user.areas[0] && <List>
								{this.props.user.areas.map((item, index) => {
									return (
										<ListItem key={index}>
											<ListItemIcon>
													<AccountMultiple />
											</ListItemIcon>
											<ListItemText primary={item.Area.name}/>
										</ListItem>
									)
								})}
							</List>}
					</Grid>
				</Grid>
			)

		}
	}
}

export default withStyles(styles)(UserProfile)
