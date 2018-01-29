const AuthController = require('./controllers/AuthController')
const DeveloperController = require('./controllers/DeveloperController')
const AreaController = require('./controllers/AreaController')
const DummyDataController = require('./controllers/DummyDataController')
const VolunteerController = require('./controllers/VolunteerController')
const AreaVolunteerController = require('./controllers/AreaVolunteerController')
const path = require('path')
var bodyParser = require('body-parser')
const express = require('express')
const express_jwt = require('express-jwt')
const config = require('./config')
const jwtAuth = express_jwt({ secret: config.jwtSecret })
const jwt = require('jsonwebtoken')

module.exports = (app) => {
	// Allow CORS between frontend and API
	var allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', config.frontend_url)
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
		res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token')

		// intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			console.log('OPTIONS')
			res.send(204, '')
		}
		else {
			next()
		}
	}

	app.use(express.static(path.join(__dirname, 'frontend/build')))
	app.use(allowCrossDomain)

	// Get a token
	app.post('/authenticate',
		bodyParser.json(),
		AuthController.authenticate
	)

	// Get a token
	app.post('/checkOTP', 
		bodyParser.json(),
		VolunteerController.checkOTP
	)
	
	// Restrict access to ../api/* routes to token bearers only
	app.use('/api', function(req, res, next) {
		bodyParser.json()
		console.log('method', req.method)
		console.log('headers', req.headers)
		console.log('body', req.body)
		let token = req.headers['auth-token']

		if (token) {
			// verifies secret and checks expiry
			jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate volunteer information.' })
				} else {
					console.log('decoded', decoded)
					req.decoded = decoded
					next()
				}
			})

		} else {
			// if there is no token
			// return an error
			return res.status(403).send({ 
				success: false, 
				message: 'You\'re not logged in' 
			})

		}
	})

	// Get a team
	app.get('/api/teams/:id',
		AreaVolunteerController.viewTeam
	)

	// Update a volunteer's profile information
	app.post('/api/volunteer/:id/update', 
		// jwtAuth,
		bodyParser.json(),
		VolunteerController.editProfile
	)

	// View a volunteers's public profile
	app.get('/api/volunteer/:id/public', jwtAuth,
		VolunteerController.viewProfile
	)

	// View a volunteers's full profile
	app.post('/api/volunteer', 
		VolunteerController.viewProfile
	)

	// Get a list of all volunteers
	app.get('/api/volunteers/list', jwtAuth,
		VolunteerController.list
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

	app.use(function (err, req, res, next) {
		// log the error
		console.log('statusCode')
		console.log('statusCode', err.statusCode)
		console.log('message', err.message)
		console.log('stack', err.stack)

		// delete debugging info
		if (config.env !== 'development') {
			delete err.stack
			delete err.date
		}
		
		// send the response
		res.status(err.statusCode || 500).json(err)
	})
}




