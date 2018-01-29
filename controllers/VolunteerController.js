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
			res.status(500).send({
				error: err
			});
		}
	}
}