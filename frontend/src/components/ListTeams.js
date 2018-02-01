import React from 'react'
import axios from 'axios'
// components
import Button from 'material-ui/Button'

class ListTeams extends React.Component {
	constructor () {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)

		this.state = {
			'volunteer': {
				'id': null
			},
			teams: [],
			snackbarText: '',
			snackbarOpen: false
		}
	}

	componentWillMount() {
		let newState = this.state
		newState.volunteer.id = localStorage.getItem('userId')
		this.setState(newState)
	}

	handleSubmit() {
		const _this = this
		axios.post('http://localhost:5035/api/viewteams/', _this.state.volunteer)
			.then(function (response) {
				if (response.status === 200) {
					_this.setState({
						teams: response.data
					})
				}
			})
			.catch(function (error) {
				_this.setState( {
					'snackbarText': 'Saving failed. Please try again.',
					'snackbarOpen': true
				})
			})
	}

	render() {
		return (
			<div>
				<Button 
					onClick={this.handleSubmit}
					type="submit" 
					raised 
					color="primary">
					See teams
				</Button>

				{this.state.teams.map((team, index) => {
					return <div key={`team${index}`}>{team.Area.name}</div>
				})}
			</div>
		)
	}
}

export default ListTeams
