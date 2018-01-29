// config
const config = require('./config')

// controllers
const AuthController = require('./controllers/AuthController')
const DummyDataController = require('./controllers/DummyDataController')
const VolunteerController = require('./controllers/VolunteerController')

// utils
var bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

module.exports = (app) => {
	// Allow CORS between frontend and API
	const allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', config.frontend_url)
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
		res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token')

		// Intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			res.status(204).send('')
		}
		else {
			next()
		}
	}
	app.use(allowCrossDomain)

	// Serve frontend files
	app.use(express.static(path.join(__dirname, 'frontend/build')))

	// Get a one-time password via email, verify a one-time-password and get a JSON Web Token
	app.post('/authenticate',
		bodyParser.json(),
		AuthController.authenticate
	)
	
	// Restrict access to ../api/* routes to token bearers only
	app.use('/api', function(req, res, next) {
		bodyParser.json()
		let token = req.headers['auth-token']

		if (token) {
			// Verify secret and check expiry
			jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate volunteer information.' })
				} else {
					req.decoded = decoded
					next()
				}
			})

		} else {
			// If there is no token, return an error
			return res.status(403).send({ 
				success: false, 
				message: 'You\'re not logged in' 
			})

		}
	})

	// Update a volunteer's profile information
	app.post('/api/volunteer/:id/update', 
		bodyParser.json(),
		VolunteerController.editProfile
	)

	// View a volunteers's full profile
	app.post('/api/volunteer', 
		VolunteerController.viewProfile
	)

	// Populate database with dummy data
	if (config.env === 'development') {
		app.get('/populate',
			DummyDataController.populate
		)
	}

	// Handle all remaining routes
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '.', 'frontend/build', 'index.html'))
	})

	// Handle errors
	app.use(function (err, req, res, next) {
		// Log the error
		let contents = JSON.stringify({
			'statusCode': err.statusCode,
			'message': err.message,
			'stack': err.stack,
			'timestamp': err.timestamp
		}) + ', '

		fs.appendFile('./logs/routingErrors.log', contents, function(appendError) {
			fs.writeFile('./logs/routingErrors.log', contents, function(writeError) {
				return
			})
		})

		// Delete debugging info
		if (config.env !== 'development') {
			delete err.stack
			delete err.date
		}
		
		// Send the response
		res.status(err.statusCode || 500).json(err)
	})
}
