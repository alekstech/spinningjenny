module.exports = (sequelize, DataTypes) => {
	const AreaVolunteer = sequelize.define('AreaVolunteer', {
		joined: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
			}
		},
		left: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
			}
		},
		regular: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		floater: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		coordinator: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		trainee: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		notes: {
			type: DataTypes.STRING
		}
	})
	
	AreaVolunteer.associate = function(models) {
		AreaVolunteer.belongsTo(models.Area, {
			foreignKey: {
				primaryKey: true
			}
		})
		AreaVolunteer.belongsTo(models.Volunteer, {
			foreignKey: {
				primaryKey: true
			}
		})
	}
	
	return AreaVolunteer
}