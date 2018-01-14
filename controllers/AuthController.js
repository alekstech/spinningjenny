const otplib = require('otplib');
const {
    Volunteer
} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
    async auth(req, res) {
        if (!req.query.initial || req.query.initial.length !== 1) {
            res.status(400).send({
                error: 'initial must be provided'
            });
            return;
        }
        if (!req.query.membershipnumber) {
            res.status(400).send({
                error: 'membership number must be provided'
            });
            return;
        }

        let initial = req.query.initial.charAt(0).toUpperCase();
        await Volunteer.findAll({
            where: {
                membershipNumber: req.query.membershipnumber.toString()
            }
        }).then(async (candidates) => {

            if (candidates.length === 0) {
                res.status(401).send({
                    error: 'incorrect login'
                });
                return;
            }
            if (req.query.otp) {
                let authenticated = candidates.filter(v => otplib.hotp.check(req.query.otp, v.hsecret, v.hcounter++) || otplib.totp.check(req.query.otp, v.tsecret));
                if (authenticated.length !== 1) {
                    res.status(401).send({
                        error: 'incorrect login'
                    });
                    return;
                }
                authenticated[0].save({
                    fields: ['hcounter']
                });
                res.send(jwt.sign({
                    volunteerId: authenticated[0].id
                }, config.jwtSecret, {
                    expiresIn: "30d"
                }));
            } else {
                let transporter = nodemailer.createTransport(config.mail);
                candidates.map(v => ({
                    from: config.outbound_address,
                    to: v.email,
                    subject: 'TMC Volunteers: Login in Code',
                    text: 'Your single-use login code is: ' + otplib.hotp.generate(v.hsecret, ++v.hcounter)
                })).forEach(m => transporter.sendMail(m));
                for (let candidate of candidates) {
                    candidate.save({
                        fields: ['hcounter']
                    });
                }
                res.status(401).send({
                    error: 'login code required'
                });
            }
        }, err => {
            res.status(500).send({
                error: 'an error has occured trying to fetch the volunteer information',
                raw: err
            });
        });
    }
}