import React from 'react'
import { Link } from 'react-router-dom'
// components
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Chip from 'material-ui/Chip'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListItemIcon from 'material-ui/List/ListItemIcon'
import ListItemText from 'material-ui/List/ListItemText'
import ListSubheader from 'material-ui/List/ListSubheader'
import Typography from 'material-ui/Typography'
// styles
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import grey from 'material-ui/colors/grey'
import indigo from 'material-ui/colors/indigo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withStyles from 'material-ui/styles/withStyles';
// icons
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import NavigationCheck from 'mdi-material-ui/Check'
import NavigationClose from 'mdi-material-ui/Close'
import Pencil from 'mdi-material-ui/Pencil'

const theme = createMuiTheme({});

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
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	skillsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
}

class UserProfile extends React.Component {
	constructor () {
		super()

		this.formatDateMMDDYYY = this.formatDateMMDDYYY.bind(this)
		this.formatPhone = this.formatPhone.bind(this)
	}

	formatDateMMDDYYY(date = 'n/a') {
		if (date === 'n/a') {
			return date
		} else {
			let dateObject = new Date(date)
			return dateObject.getFullYear() + '-' + (dateObject.getMonth() + 1) + '-' + dateObject.getDate()
		}
	}

	formatPhone(phone = '') {
		return phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6)
	}

	render() {

		return (
			<MuiThemeProvider theme={theme}>
				<Grid container spacing={24}>
					<Grid item xs={3}></Grid>
					<Grid item xs={6}>

					<div style={styles.row}>
						<Typography type="headline" gutterBottom={true}>{`${this.props.user.firstName} ${this.props.user.lastName}`}</Typography> 
						<Link to={`${this.props.match.url}/edit`}>
							<Button raised>
								Edit
								<Pencil />
							</Button>
						</Link>
					</div>
						
						{(this.props.user.isAdmin && this.props.user.isStaff && <Typography gutterBottom={true}>Administrator, Staff Member</Typography>) || (this.props.user.isAdmin && <Typography gutterBottom={true}>Administrator</Typography>) || (this.props.user.isStaff && <Typography gutterBottom={true}>Staff Member</Typography>) || (<Typography gutterBottom={true}>Volunteer</Typography>)}

						<Typography type="body1" gutterBottom={true}>{this.props.user.email}</Typography>

						<Divider />

						<Typography type="body2">Address</Typography>
						<Typography type="body1">{this.props.user.mailingAddress1}</Typography>
						<Typography type="body1">{this.props.user.mailingAddress2}</Typography>
						<Typography type="body1">{this.props.user.city}</Typography>
						<Typography type="body1">{this.props.user.province} {this.props.user.postcode}</Typography>
						<Typography type="body1" gutterBottom={true}>{this.formatPhone(this.props.user.phone)}</Typography>

						<Divider />

						<Typography type="body2">Emergency contact</Typography>
						<Typography type="body1">{this.props.user.emergencyName}</Typography>
						<Typography type="body1" gutterBottom={true}>{this.formatPhone(this.props.user.emergencyPhone)}</Typography>

						<Divider />

						<Typography type="body2">Member info</Typography>
						<Typography type="body1">Membership no. {this.props.user.membershipNumber}</Typography>
						<Typography type="body1">Member since {this.formatDateMMDDYYY(this.props.user.createdAt) || 'n/a'}</Typography>
						<Typography type="body1" gutterBottom={true}>Valid until {this.formatDateMMDDYYY(this.props.user.membershipExpiry) || 'n/a'}</Typography>

						<Divider />

						<Typography type="body2">Volunteer info</Typography>
						<Typography type="body1">Volunteer since {this.formatDateMMDDYYY(this.props.user.startDate)}</Typography>

						<Divider />

						<Typography type="body2">Skills</Typography>

						{this.props.user.skills && 
							<div style={styles.skillsWrapper}>
								{this.props.user.skills.map((skill, index) => {
										return <Chip label={skill} key={`skill${index}`} style={styles.chip} />
									})
								}
							</div>
						}

						<Divider />

						<List subheader={<ListSubheader>Preferences</ListSubheader>}>
							<ListItem>
								<ListItemText primary="Interested in ad hoc events" />
								<ListItemIcon>
									{(this.props.user.interestedInAdHoc && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemText primary="Willing to train others" />
								<ListItemIcon>
									{(this.props.user.willingToTrain && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemText primary="Sharing profile with team mates" />
								<ListItemIcon>
									{(this.props.user.nonAdminsCanView && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemText primary="Strand News subscriber" />
								<ListItemIcon>
									{(this.props.user.strandNewsMailings && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemText primary="In education" />
								<ListItemIcon>
									{(this.props.user.student && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemText primary="In employment" />
								<ListItemIcon>
									{(this.props.user.employed && <NavigationCheck />) || <NavigationClose />}
								</ListItemIcon>
							</ListItem>
						</List>

						<Divider />

						{this.props.user.areas[0] && <List subheader={<ListSubheader>Areas</ListSubheader>}>
							{this.props.user.areas.map((item, index) => {
									return (
										<Link to={`/teams/${item.AreaId}`}  key={`area${index}`}>
											<ListItem button>
												<ListItemIcon>
														<AccountMultiple />
												</ListItemIcon>
												<ListItemText primary={item.Area.name}/>
											</ListItem>
										</Link>
									)
								})
							}
						</List>}
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles)(UserProfile)
