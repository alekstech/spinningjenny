require('dotenv').config()
const express = require('express')
const app = module.exports = express()
const {sequelize} = require('./models')
const config = require('./config')
var pjson = require('./package.json')

require('./routes')(app)
app.set('jwtSecret', config.jwtSecret)

sequelize.sync({force: false, logging: console.log}) // {force: true} to clear db
	.then(() => {
		console.log('Postgresql connection has been established successfully.')
		app.listen(config.port)
		console.log(`Express server from repo '${pjson.name}' active on port ${config.port}`)
	})
