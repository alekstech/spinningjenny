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
					args: /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/,
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
		mambershipNumber: {
			type: DataTypes.INTEGER,
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
		interestedInAdHoc: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: [true, false],
				msg: 'Only yes or no answers'
			}
		},
		willingToTrain: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: [true, false],
				msg: 'Only yes or no answers'
			}
		},
		completedAccessibilityTraining: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: [true, false],
				msg: 'Only yes or no answers'
			}
		},
		strandNewsMailings: {
			type: DataTypes.BOOLEAN,
			validate: {
				isIn: [true, false],
				msg: 'Only yes or no answers'
			}
		},
		skills: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		student: {
			type: DataTypes.STRING
		},
		employed: {
			type: DataTypes.STRING
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
				isIn: [true, false],
				msg: 'Only yes or no answers'
			}
		}
	})

	return Volunteer
}
