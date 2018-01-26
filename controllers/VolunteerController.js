const {
	Area,
	AreaVolunteer,
	Volunteer
} = require("../models")
const config = require("../config")
const jwt = require('jsonwebtoken')
const app = require('../app.js')
const otplib = require('otplib')
const nodemailer = require('nodemailer')
const hotp = require('otplib/hotp')
const {
	CustomError
} = require("../modules/CustomError")

module.exports = {
	async list(req, res) {
		try {
			let data = await Volunteer.findAll();
			res.send(data);
		} catch (err) {
			console.log(err);
			res.status(500).send({
				error: err
			});
		}
	},

	async viewProfile(req, res) {
		try {

			let volunteerData = await Volunteer.findById(req.decoded.id);
			let areas = await AreaVolunteer.findAll({
				where: {
					VolunteerId: req.decoded.id
				},
				include: [{
					model: Area,
					attributes: ["name"]
				}]
			})

			res.status(200).send({
				code: 200,
				success: true,
				status: 'OK',
				message: 'Volunteer data received',
				volunteerData,
				areas
			})

		} catch (err) {

			res.status(500).send({
				code: 500,
				success: false,
				status: 'fail',
				message: 'No profile information to display.'
			})
			console.log('viewProfile() error: ', err)

		}
	},

	async editProfile(req, res) {
		try {
			let data = await Volunteer.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send({
				code: 200,
				status: 'OK',
				data
			})
		} catch (err) {
			console.log(err);
			res.status(500).send({
				error: err
			});
		}
	},

	async getOTP(req, res, next) {
		console.log('getOTP', req.body)
		try {
			if (!req.body.membershipNumber) {
				console.log('no membershipNumber')
				res.json({
					code: 422,
					success: false,
					message: 'Membership number missing'
				})
			}

			let data = await Volunteer.findOne({
				where: {
					membershipNumber: req.body.membershipNumber
				}
			})

			console.log('DATA', data)

			if (data === null) {
				console.log('sending a 401')
				next(new CustomError('We could not log you in. Please check your login information.', 401))
				console.log('sent a 401')
			} else {
				let transporter = nodemailer.createTransport(config.mail)
				let secret = otplib.authenticator.generateSecret()
				let code = hotp.generate(secret, data.hcounter++)
				let mailOptions = {
					from: config.outbound_address,
					to: [data.dataValues.email, 'z.sobieraj@gmail.com'],
					subject: 'TMC Volunteers: Login Code',
					text: 'Your single-use login code is: ' + code
				}

				console.log('code', code)
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log('sendMail error', error)
					}
					console.log('Message sent: %s', info.messageId)
					// Preview only available when sending through an Ethereal account
					console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

					// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
					// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
				})

				data.hsecret = secret
				await data.save({
					fields: ['hcounter', 'hsecret']
				})

				// return the information including token as JSON
				res.json({
					code: 200,
					status: 'OK',
					success: true,
					message: 'Email sent'
				})
				console.log('sent 200')
			}
		} catch (err) {
			console.log('sending a 500', err.stack)
			res.status(500).send({
				code: 500,
				success: false,
				message: 'An error occurred. Please try again.'
			})
		}
	},

	async checkOTP(req, res, next) {
		console.log('checkOTP', req.body)
		try {
			if (!req.body.otp) {
				console.log('no otp')
				next(new CustomError('Login code missing.', 401))
			} else if (!req.body.membershipNumber) {
				console.log('no membershipNumber')
				next(new CustomError('Membership number missing.', 401))
			}

			let data = await Volunteer.findOne({
				where: {
					membershipNumber: req.body.membershipNumber
				}
			})

			console.log('DATA', data)

			if (data === null) {
				console.log('sending a 401')
				next(new CustomError('We could not log you in. Please check your login information.', 401))
				console.log('sent a 401')
			} else {
				const payload = {
					isAdmin: data.dataValues.isAdmin,
					isStaff: data.dataValues.isStaff,
					nonAdminsCanView: data.dataValues.nonAdminsCanView,
					id: data.dataValues.id
				}

				var token = jwt.sign(payload, app.get('jwtSecret'), {
					expiresIn: '30 days'
				})

				console.log('otp', req.body.otp, 'hsecret', data.hsecret)
				if (hotp.check(req.body.otp, data.hsecret, data.hcounter - 1)) {
					await data.save({
						fields: ['hcounter']
					})
					res.json({
						code: 200,
						status: 'OK',
						success: true,
						message: 'Volunteer verified',
						token: token
					})
				} else {
					res.json({
						code: 200,
						status: 'OK',
						success: true,
						message: 'Not verified'
					})
				}


				// return the information including token as JSON

				console.log('sent 200')
			}
		} catch (err) {
			console.log('sending a 500', err.stack)
			res.status(500).send({
				code: 500,
				success: false,
				message: 'An error occurred. Please try again.'
			})
		}
	},

	async findForLogin(req, res, next) {
		console.log('findForLogin', req.body)
		try {
			if (!req.body.membershipNumber) {
				console.log('no membershipNumber')
				res.json({
					code: 422,
					success: false,
					message: 'Membership number missing'
				})
			} else if (!req.body.membershipExpiry) {
				console.log('no membershipExpiry')
				res.json({
					code: 422,
					success: false,
					message: 'Membership expiry missing'
				})
			} else if (!req.body.initial) {
				console.log('no initial')
				res.json({
					code: 422,
					success: false,
					message: 'Initial missing'
				})
			}

			let data = await Volunteer.findOne({
				where: {
					membershipNumber: req.body.membershipNumber,
					membershipExpiry: req.body.membershipExpiry,
					$or: [{
							firstName: {
								$ilike: req.body.initial + '%'
							}
						},
						{
							lastName: {
								$ilike: req.body.initial + '%'
							}
						},
					]
				}
			})

			console.log('DATA', data)

			if (data === null) {
				console.log('sending a 401')
				next(new CustomError('We could not log you in. Please check your login information.', 401))
				console.log('sent a 401')
			} else {
				const payload = {
					isAdmin: data.dataValues.isAdmin,
					isStaff: data.dataValues.isStaff,
					nonAdminsCanView: data.dataValues.nonAdminsCanView,
					id: data.dataValues.id
				}

				var token = jwt.sign(payload, app.get('jwtSecret'), {
					expiresIn: '30 days'
				})

				console.log('token', token)

				// return the information including token as JSON
				res.json({
					code: 200,
					status: 'OK',
					success: true,
					message: 'Volunteer verified',
					token: token
				})
				console.log('sent 200')
			}
		} catch (err) {
			console.log('sending a 500', err.stack)
			res.status(500).send({
				code: 500,
				success: false,
				message: 'An error occurred. Please try again.'
			})
		}
	}
};