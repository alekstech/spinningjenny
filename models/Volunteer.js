module.exports = (sequelize, DataTypes) => {
	const Volunteer = sequelize.define('Volunteer', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
		},
		isStaff: {
			type: DataTypes.BOOLEAN,
		},
		firstName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 letters'
				},
				isAlpha: {
					args: true,
					msg: 'Only letters allowed'
				}
			}
		},
		otherName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 letters'
				},
				isAlpha: {
					args: true,
					msg: 'Only letters allowed'
				}
			}
		},
		preferredName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 letters'
				},
				isAlpha: {
					args: true,
					msg: 'Only letters allowed'
				}
			}
		},
		familyName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				},
				is: {
					args: /^[a-zA-Z-]+$/,
					msg: 'Only letters and hyphens'
				}
			}
		},
		startDate: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
			}
		},
		quitDate: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
			}
		},
		phone: {
			type: DataTypes.INTEGER,
			validate: {
				isInt: {
					args: true
				},
				is: {
					args: /^\d{10}$/,
					msg: 'Canadian and US numbers only'
				}
			}
		},
		emergencyName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 70],
					msg: 'Must be between 1 and 70 letters'
				},
				is: {
					args: /^[a-zA-Z-\s]+$/,
					msg: 'Only letters, hyphens and spaces allowed'
				}
			}
		},
		emergencyPhone: {
			type: DataTypes.INTEGER,
			validate: {
				isInt: {
					args: true
				},
				is: {
					args: /^\d{10}$/,
					msg: 'Canadian and US numbers only'
				}
			}
		},
		nonAdminsCanView: {
			type: DataTypes.BOOLEAN
		}
	})

	Volunteer.associate = function(models) {
		Volunteer.hasMany(models.Award)
	}

	return Volunteer
}
