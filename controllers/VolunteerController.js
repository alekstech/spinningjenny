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
const CustomError = require('../modules/CustomError')

module.exports = {
	async viewProfile(req, res, next) {
		try {

			let volunteerData = await Volunteer.findById(req.decoded.id)
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

			next(new CustomError('We had trouble looking up your account data.', 500, err))

		}
	},

	async editProfile(req, res, next) {
		try {
			let volunteerData = await Volunteer.update(req.body, {
				where: {
					id: req.decoded.id
				},
				fields: ['firstName', 'lastName', 'email', 'mailingAddress1', 'mailingAddress2', 'city', 'province', 'postcode', 'phone', 'emergencyName', 'emergencyPhone', 'interestedInAdHoc', 'willingToTrain', 'strandNewsMailings', 'nonAdminsCanView', 'student', 'employed'],
				returning: true
			})

			res.send({
				code: 200,
				status: 'OK',
				volunteerData: volunteerData[1][0]
			})
		} catch (err) {

			next(new CustomError('We had trouble saving your profile.', 500, err))

		}
	}
}