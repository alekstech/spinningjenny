module.exports = (sequelize, DataTypes) => {
	const AreaVolunteer = sequelize.define('AreaVolunteer', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
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
		AreaVolunteer.hasOne(models.Area)
	}

	AreaVolunteer.associate = function(models) {
		AreaVolunteer.hasMany(models.Volunteer)
	}

	return AreaVolunteer
}