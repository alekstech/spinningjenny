module.exports = (sequelize, DataTypes) => {
	const Volunteer = sequelize.define('Volunteer', {
		id: {
			type: DataTypes.UUID,
			unique: true
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
					args: ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$,
					msg: 'Only letters, numbers, underscores, and hyphens'
				}
			}
		},
		startDate: {
			type: DataTypes.DATEONLY,
			validate: {
					isDate: true
				}
			}
		},
		quitDate: {
			type: DataTypes.DATEONLY,
			validate: {
					isDate: true
				}
			}
		},
		quitDate: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: true,
					msg: 'Valid email addresses only'
				}
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
			type: DataTypes.String,
			validate: {
				len: {
					args: [1, 70],
					msg: 'Must be between 1 and 70 letters'
				},
				isAlpha: {
					args: true,
					msg: 'Only letters allowed'
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
	return Developer
}

Session.belongsTo(Volunteer)


Sessions
owner Volunteer.id
expiration Date
sessionToken ???

Area (Teams)?
id Int
coordinator Volunteer.id
name Str

Area_Volunteer
{
	volunteer Volunteer.id
	area Area.id
}
join Date
leave Date
regular Shift.id?
floater bool
notes Str

Shift
id Int
area Area.id
weekday Int
startTime Int
endTime Int

Schedule (instances of shifts - terrible name)
id Int
{Unique
	area Area.id
	startTime DateTime
	endTime DateTime
}

Volunteer.id <schedule join table //this might need multiple volunteers. It should probably define a max and then have a join table

Swap
initiator Schedule.id
target Schedule.id

AwardType
id Int
name Str

Award
volunteer Volunteer.id
award Award.id
awarded Year

Events
id Int
owner Volunteer.id
name Str
descriptor Str
address Str/Url