module.exports = (sequelize, DataTypes) => {
	const AwardType = sequelize.define('AwardType', {
		name: {
			type: DataTypes.STRING,
		}
	})
	return AwardType
}
