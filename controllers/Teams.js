const { Area, AreaVolunteer, Volunteer, Sequelize } = require("../models");
const config = require("../config");
const fs = require('fs')
const CustomError = require('../modules/CustomError')

module.exports = {
    // aka get coordinator's teams and team member info
    viewTeam: async (req, res, next) => {
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
                    fields: ['AreaId', 'name']
                })
            }

            let volunteers = await AreaVolunteer.findAll({
                where: {
                    'AreaId': {
                        [Sequelize.Op.in]: areas.map(area => area.id)
                    }
                },
                include: [
                    {
					    model: Volunteer,
					    attributes: ["firstName", "lastName"]
                    }
                ]
            })

            res.send({
                code: 200,
                status: 'OK',
                team: volunteers,
                teams: areas
            })
        } catch (err) {

            next(new CustomError('We had trouble getting your team info.', 500, err))

        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            let requestee = await Volunteer.findOne({
                where: {
                    'id': req.decoded.id
                }
            })

            let users
            if (!requestee.isStaff || !requestee.isAdmin) {
                res.send({
                    code: 401,
                    status: 'OK',
                    message: 'Only Staff and Administrators can remove users from a team.'
                })
            } else {
                const deletions = req.body.users.map(async (user) => {
                    await AreaVolunteers.update(req.body, {
                        where: {
                            VolunteerId: user.VolunteerId,
                            AreaId: user.AreaId
                        },
                        fields: ['left']
                    })
                })

                sequelize.transaction(function () {
                    return Promise.all(deletions)
                }).then(
                    res.send({
                        code: 200,
                        status: 'OK',
                        message: 'Users deleted'
                    })
                )

            }

            let volunteers = await AreaVolunteer.findAll({
                where: {
                    'AreaId': {
                        [Sequelize.Op.in]: areas.map(area => area.id)
                    }
                },
                include: [
                    {
					    model: Volunteer,
					    attributes: ["firstName", "lastName"]
                    }
                ]
            })

            res.send({
                code: 200,
                status: 'OK',
                team: volunteers,
                teams: areas
            })
        } catch (err) {

            next(new CustomError('We had trouble getting your team info.', 500, err))

        }
    }
};
