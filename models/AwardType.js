module.exports = (sequelize, DataTypes) => {
	const AwardType = sequelize.define('AwardType', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
		},
		multiple: {
			type: DataTypes.BOOLEAN,
		}
	})

	return AwardType
}
