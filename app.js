require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const {sequelize} = require('./models')
const config = require('./config/config')

require('./routes')(app)

sequelize.sync({force: true})
  .then(() => {
  	console.log('Postgresql connection has been established successfully.')
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })