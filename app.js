require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const {sequelize} = require('./models')
const config = require('./config/config')
const DummyDataController = require('./controllers/DummyDataController')
var pjson = require('./package.json');

require('./routes')(app)

sequelize.sync({force: false}) // {force: true} to clear db
	.then(() => {
	  	console.log('Postgresql connection has been established successfully.')
		app.listen(config.port)
		console.log(`Express server from repo '${pjson.name}' active on port ${config.port}`)
	})