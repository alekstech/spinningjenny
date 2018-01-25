const path = require('path')

module.exports = {
	env: process.env.ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	db: {
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		options: {
			dialect: process.env.DIALECT,
			host: process.env.HOST,
			storage: path.resolve(__dirname, '../../textilemuseum.postgres'),
			logging: console.log // console.log OR false
		}
	},
	outbound_address: process.env.OUTBOUND_ADDRESS,
	mail: {
		host: process.env.SMTP_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	},
	frontend_url: process.env.FRONTEND_URL
}
