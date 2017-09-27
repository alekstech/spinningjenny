module.exports = (sequelize, DataTypes) => {
	const AreaVolunteer = sequelize.define('AreaVolunteer', {
		joined: {
			type: DataTypes.DATE
		},
		left: {
			type: DataTypes.DATE
		},
		regular: {
			type: DataTypes.BOOLEAN
		},
		floater: {
			type: DataTypes.BOOLEAN
		},
		notes: {
			type: DataTypes.STRING
		}
	})
	
	AreaVolunteer.associate = function(models) {
		AreaVolunteer.belongsTo(models.Area)
	}

	AreaVolunteer.associate = function(models) {
		AreaVolunteer.belongsTo(models.Volunteer)
	}

	return AreaVolunteer
}