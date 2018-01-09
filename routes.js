const AuthController = require('./controllers/AuthController')
const DeveloperController = require('./controllers/DeveloperController')
const AreaController = require('./controllers/AreaController')
const DummyDataController = require('./controllers/DummyDataController')
const VolunteerController = require('./controllers/VolunteerController')
const AreaVolunteerController = require('./controllers/AreaVolunteerController')
const path = require('path')
var bodyParser = require('body-parser')
const express_jwt = require('express-jwt');
const config = require('./config/config')
const jwtAuth = express_jwt({ secret: config.jwtSecret });

module.exports = (app) => {
	// Allow CORS between frontend and API
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
		res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
		res.header('Access-Control-Allow-Headers', 'Content-Type, id')
		next()
	})

	// Get a token
	app.get('/api/auth', 
		AuthController.auth
	)

	// Get a team
	app.get('/api/teams/:id',
		AreaVolunteerController.viewTeam
	)

	// Update a volunteer's profile information
	app.post('/api/volunteer/:id/update', 
		jwtAuth,
		bodyParser.json(),
		VolunteerController.editProfile
	)

	// View a volunteers's public profile
	app.get('/api/volunteer/:id/public', jwtAuth,
		VolunteerController.viewProfile
	)

	// View a volunteers's full profile
	app.get('/api/volunteer/:id', jwtAuth,
		VolunteerController.viewProfile
	)

	// Get a list of all volunteers
	app.get('/api/volunteers/list', jwtAuth,
		VolunteerController.list
	)

	// Populate database with dummy data
	app.get('/api/populate',
		DummyDataController.populate
	)

	// Handle all remaining routes
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '.', 'frontend/public', 'index.html'))
	})
}
