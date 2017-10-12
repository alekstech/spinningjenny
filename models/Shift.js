module.exports = (sequelize, DataTypes) => {
	const Shift = sequelize.define('Shift', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		weekday: {
			type: DataTypes.INTEGER,
			validate: {
				is: {
					args: /^[0-6]+$/
				}
			}
		},
		sessionToken: {
			type: DataTypes.STRING,
		},
		startTime: {
			type: DataTypes.DATE,
			validate: {
				isDate: true
			}
		},
		endTime: {
			type: DataTypes.DATE,
			validate: {
				isDate: true
			}
		}
	})

	Shift.associate = function(models) {
		Shift.hasMany(models.Volunteer)
	}

	Shift.associate = function(models) {
		Shift.belongsTo(models.Area)
	}

	return Shift
}
