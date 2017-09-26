module.exports = (sequelize, DataTypes) => {
	const Session = sequelize.define('Session', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		expiration: {
			type: DataTypes.DATE,
			validate: {
				isDate: true
			}
		},
		sessionToken: {
			type: DataTypes.STRING
		}
	})

	Session.associate = function(models) {
		Session.belongsTo(models.Volunteer)
	}

	return Session
}




