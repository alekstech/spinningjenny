const { Area, AreaVolunteer, Volunteer } = require("../models");
const config = require("../config");
const fs = require('fs')

module.exports = {
    // aka get coordinator's teams and team member info
    async viewTeam(req, res, next) {
        console.log('viewTeam')
        try {
            let requestee = await Volunteer.findOne({
                where: {
                    'id': req.decoded.id
                }
            })

            let areas
            if (requestee.isStaff || requestee.isAdmin) {
                areas = await Areas.findAll()
            } else {
                areas = await AreaVolunteers.findAll({
                    where: {
                        'VolunteerId': req.decoded.id,
                        'coordinator': true
                    },
                    fields: ['AreaId']
                })
            }

            let volunteers = await AreaVolunteers.findAll({
                where: {
                    'id': {
                        [Op.in]: areas
                    }
                },
                include: [{
                    model: Volunteer,
                    attributes: ['firstName', 'lastName', 'email', 'mailingAddress1', 'mailingAddress2', 'city', 'province', 'postcode', 'phone', 'emergencyName', 'emergencyPhone', 'interestedInAdHoc', 'willingToTrain', 'strandNewsMailings', 'nonAdminsCanView', 'student', 'employed'],
                    
                }],
                order: {
                    {model: Task, as: 'Task'}, 'ASC'
                }
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
