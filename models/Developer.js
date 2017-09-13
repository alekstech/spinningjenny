module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    name: {
      type: DataTypes.STRING
  	}
  })
  return Developer
}
