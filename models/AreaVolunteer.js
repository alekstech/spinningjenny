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