module.exports = (sequelize, DataTypes) => {
	const Award = sequelize.define('Award', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		date: {
			type: DataTypes.DATE
		}
	})

	Award.associate = function(models) {
		Award.hasMany(models.AwardType)
	}

	return Award
}