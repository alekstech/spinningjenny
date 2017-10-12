const {Volunteer} = require('../models')

module.exports = {
	populate () {
		Volunteer.bulkCreate(Volunteers, {
			validate: true
		}).catch(function (errors) {
			console.log(errors)
		})
	}
}


const Volunteers = [
	{
		isAdmin: true,
		isStaff: true,
		firstName: 'Micky',
		familyName: 'Mouse',
		startDate: '2017-07-01',
		phone: 1234567890,
		emergencyName: 'Justin',
		emergencyPhone: 1234567890,
		nonAdminsCanView: true
	}
]