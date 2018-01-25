const otplib = require('otplib');
const {
    Volunteer
} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const CustomError = require("../modules/CustomError")
const app = require('../app.js')

module.exports = {
    async authenticate(req, res, next) {
        console.log('authenticate', 'initial', req.body.initial)
        if (!req.body.initial || req.body.initial.length !== 1) {
            next(new CustomError('Please provide an initial.', 401))
        }
        if (!req.body.membershipNumber) {
            next(new CustomError('Please provide the membership number.', 401))
        }

        await Volunteer.findAll({
            where: {
                membershipNumber: req.body.membershipNumber.toString(),
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
        }).then(async (volunteers) => {
            if (volunteers.length === 0) {
                next(new CustomError('We could not log you in. Please check your login information.', 401))
            }

            if (req.body.otp) {
                let otp = req.body.otp.replace(/\s/g, '')
                console.log('volunteers', volunteers)
                console.log('otp', otp)
                console.log('hsecret', volunteers[0].hsecret, 'hcounter', volunteers[0].hcounter)
                let authenticated = volunteers.filter(v => otplib.hotp.check(otp, v.hsecret, v.hcounter - 1) || otplib.totp.check(req.body.otp, v.tsecret))

                console.log('authenticated', authenticated, authenticated.length)
                if (authenticated.length !== 1) {
                    next(new CustomError('We could not log you in. Please check your login information.', 401))
                }

                const payload = {
                    isAdmin: authenticated[0].isAdmin,
                    isStaff: authenticated[0].isStaff,
                    nonAdminsCanView: authenticated[0].nonAdminsCanView,
                    id: authenticated[0].id
                }

                const token = jwt.sign(
                    payload,
                    app.get('jwtSecret'), {
                        expiresIn: '30 days'
                    }
                )

                res.json({
                    code: 200,
                    status: 'OK',
                    success: true,
                    message: 'Volunteer verified',
                    token: token
                })
            } else {
                volunteers.forEach((volunteer) => {
                    let transporter = nodemailer.createTransport(config.mail)
                    volunteer.hsecret = otplib.authenticator.generateSecret()
                    let hotp = otplib.hotp.generate(volunteer.hsecret, volunteer.hcounter++)
                    let logger = (error, info) => {
                        if (error) {
                            return console.log('sendMail error', error)
                        }
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                    }

                    transporter.sendMail({
                        from: config.outbound_address,
                        to: volunteer.email,
                        subject: 'TMC Volunteers: Login Code',
                        text: 'Your single-use Login Code is: ' + [hotp.slice(0, 3) + ' ' + hotp.slice(3)]
                    }, logger)

                    volunteer.save({
                        fields: ['hcounter', 'hsecret']
                    })
                })

                res.status(200).send({
                    success: true,
                    message: 'Login code sent.'
                })
            }
        }, err => {
            next(new CustomError('We had trouble looking up your information. Please try again.', 500))
        })
    }
}