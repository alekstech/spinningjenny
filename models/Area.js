module.exports = (sequelize, DataTypes) => {
	const Area = sequelize.define('Area', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		date: {
			type: DataTypes.DATE
		}
	})

	Area.associate = function(models) {
		Area.hasMany(models.Volunteer)
	}

	return Area
}
