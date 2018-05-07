import React from 'react'
import axios from 'axios'
// components
import Grid from 'material-ui/Grid'
import Table from 'material-ui/Table'
import TableBody from 'material-ui/Table/TableBody'
import TableCell from 'material-ui/Table/TableCell'
import TableHead from 'material-ui/Table/TableHead'
import TableRow from 'material-ui/Table/TableRow'
// icons
import NavigationCheck from 'mdi-material-ui/Check'
import NavigationClose from 'mdi-material-ui/Close'

class ViewTeam extends React.Component {
	constructor () {
		super()

		this.state = {
			'team': []
		}
	}

	componentWillMount() {
		const _this = this
		axios({
			method: 'GET',
			url: 'http://localhost:5035/api/teams',
			headers: {
				'Content-Type': 'text/plain',
				'auth-token': this.props.user.token
			}
		})
		.then(function (response) {
			_this.setState( {team: response.data.team} )
		})
		.catch((error) => {
			// display UI error?
		})
	}

	render() {
		return (
			<Grid item xs={12}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Floater</TableCell>
							<TableCell>Regular</TableCell>
							<TableCell>Joined</TableCell>
							<TableCell>Left</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.team.map((member, index) => {
							return (
								<TableRow key={index}>
									<TableCell>{member.Volunteer.firstName} {member.Volunteer.lastName}</TableCell>
									<TableCell>{(member.floater && <NavigationCheck />) || <NavigationClose />}</TableCell>
									<TableCell>{(member.regular && <NavigationCheck />) || <NavigationClose />}</TableCell>
									<TableCell>{member.joined}</TableCell>
									<TableCell>{member.left}</TableCell>
									<TableCell>{member.notes}</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Grid>
		)
	}
}

export default ViewTeam
