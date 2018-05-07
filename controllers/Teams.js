const { Area, AreaVolunteer, Volunteer, Sequelize } = require("../models");
const config = require("../config");
const fs = require('fs')
const CustomError = require('../modules/CustomError')

module.exports = {
    // aka get coordinator's teams and team member info
    async viewTeam(req, res, next) {
        try {
            let requestee = await Volunteer.findOne({
                where: {
                    'id': req.decoded.id
                }
            })

            let areas
            if (requestee.isStaff || requestee.isAdmin) {
                areas = await Area.findAll()
            } else {
                areas = await AreaVolunteers.findAll({
                    where: {
                        'VolunteerId': req.decoded.id,
                        'coordinator': true
                    },
                    fields: ['AreaId']
                })
            }

            console.log(areas[0].id)
            let volunteers = await AreaVolunteer.findAll({
                where: {
                    'AreaId': {
                        [Sequelize.Op.in]: areas.map(area => area.id)
                    }
                },
                include: [{
					model: Volunteer,
					attributes: ["firstName", "lastName"]
				}]
            })

            console.log('volunteers', volunteers)

            res.send({
                code: 200,
                status: 'OK',
                team: volunteers
            })
        } catch (err) {

            next(new CustomError('We had trouble getting your team info.', 500, err))

        }
    }
};
