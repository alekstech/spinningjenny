const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const db = {}

let options = config.db.options
options.operatorsAliases = {
	$eq: Sequelize.Op.eq,
	$ne: Sequelize.Op.ne,
	$gte: Sequelize.Op.gte,
	$gt: Sequelize.Op.gt,
	$lte: Sequelize.Op.lte,
	$lt: Sequelize.Op.lt,
	$not: Sequelize.Op.not,
	$in: Sequelize.Op.in,
	$notIn: Sequelize.Op.notIn,
	$is: Sequelize.Op.is,
	$like: Sequelize.Op.like,
	$notLike: Sequelize.Op.notLike,
	$iLike: Sequelize.Op.iLike,
	$notILike: Sequelize.Op.notILike,
	$regexp: Sequelize.Op.regexp,
	$notRegexp: Sequelize.Op.notRegexp,
	$iRegexp: Sequelize.Op.iRegexp,
	$notIRegexp: Sequelize.Op.notIRegexp,
	$between: Sequelize.Op.between,
	$notBetween: Sequelize.Op.notBetween,
	$overlap: Sequelize.Op.overlap,
	$contains: Sequelize.Op.contains,
	$contained: Sequelize.Op.contained,
	$adjacent: Sequelize.Op.adjacent,
	$strictLeft: Sequelize.Op.strictLeft,
	$strictRight: Sequelize.Op.strictRight,
	$noExtendRight: Sequelize.Op.noExtendRight,
	$noExtendLeft: Sequelize.Op.noExtendLeft,
	$and: Sequelize.Op.and,
	$or: Sequelize.Op.or,
	$any: Sequelize.Op.any,
	$all: Sequelize.Op.all,
	$values: Sequelize.Op.values,
	$col: Sequelize.Op.col
}

const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	options
)


fs
	.readdirSync(__dirname)
	.filter((file) =>
		file !== 'index.js'
	)
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	})

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.AreaVolunteer.removeAttribute('id')
db.AwardType.removeAttribute('id')

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db