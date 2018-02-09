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
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		firstName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 letters'
				},
				is: {
					args: /^[a-zA-Z-'\s]+$/,
					msg: 'Only letters, hyphens, apostrophes and spaces allowed'
				}
			}
		},
		lastName: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				},
				is: {
					args: /^[a-zA-Z-'\s]+$/,
					msg: 'Only letters, hyphens, apostrophes and spaces allowed'
				}
			}
		},
		mailingAddress1: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				}
			}
		},
		mailingAddress2: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [0, 35],
					msg: 'No more than 35 characters'
				}
			}
		},
		postcode: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				},
				is: {
					args: /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ]([0-9][ABCEGHJKLMNPRSTVWXYZ][0-9])?/,
					msg: 'Canadian postcodes only'
				}
			}
		},
		city: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				}
			}
		},
		province: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [1, 35],
					msg: 'Must be between 1 and 35 characters'
				}
			}
		},
		membershipNumber: {
			type: DataTypes.STRING,
			validate: {
				isInt: {
					args: true,
					msg: 'Numbers only'
				}
			}
		},
		membershipExpiry: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
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
			type: DataTypes.STRING,
			validate: {
				isInt: {
					args: true
				},
				is: {
					args: /^\d{10,16}$/,
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
					args: /^[a-zA-Z-'\s]+$/,
					msg: 'Only letters, hyphens, apostrophes and spaces allowed'
				}
			}
		},
		emergencyPhone: {
			type: DataTypes.STRING,
			validate: {
				isInt: {
					args: true
				},
				is: {
					args: /^\d{10,16}$/,
					msg: 'Canadian and US numbers only'
				}
			}
		},
		interestedInAdHoc: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		willingToTrain: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		strandNewsMailings: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		skills: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		student: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		employed: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		motivation: {
			type: DataTypes.STRING
		},
		goals: {
			type: DataTypes.STRING
		},
		howDidYouHearAboutUs: {
			type: DataTypes.STRING
		},
		additionalInfo: {
			type: DataTypes.STRING
		},
		desiredRoles: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		nonAdminsCanView: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: 'Only yes or no answers'
				}
			}
		},
		tsecret: {
			type: DataTypes.STRING
		},
		hsecret: {
			type: DataTypes.STRING
		},
		hcounter: {
			type: DataTypes.INTEGER
		},
	})

	return Volunteer
}
