const DeveloperController = require('./controllers/DeveloperController')
const DummyDataController = require('./controllers/DummyDataController')
const path = require('path')

module.exports = (app) => {
	// Allow CORS between frontend and API
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
		next()
	})

	// Put all API endpoints under '/api'
	app.get('/api/main', (req, res) => {
		res.send('Welcome to the TM Volunteer Center API server')
	})

	app.get('/api/developers',
		DeveloperController.index
	)

	app.get('/api/populate',
		DummyDataController.populate
	)

	// Handle all remaining routes
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '.', 'frontend/public', 'index.html'))
	})
}