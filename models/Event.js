module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define('Event', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING
		},
		start: {
			type: DataTypes.DATE
		},
		end: {
			type: DataTypes.DATE
		},
	})

	Event.associate = function(models) {
		Event.hasMany(models.Volunteer)
	}

	return Event
}
