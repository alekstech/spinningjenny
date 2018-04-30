const { Area, AreaVolunteer, Volunteer } = require("../models");
const config = require("../config");
const fs = require('fs')

module.exports = {
    // aka get coordinator's teams and team member info
    async viewTeam(req, res, next) {
        try {
            let areas = Areas SELECT 
                where id.coordinator = true
                fields ['name', 'id']

            let volunteers = AreaVolunteers SELECT where id IS IN areas ORDER BY name of the area

            return volunteers


            let team = await AreaVolunteer.findAll({
                where: {
                    AreaId: req.params.id
                },
                fields: ['firstName', 'lastName', 'email', 'mailingAddress1', 'mailingAddress2', 'city', 'province', 'postcode', 'phone', 'emergencyName', 'emergencyPhone', 'interestedInAdHoc', 'willingToTrain', 'strandNewsMailings', 'nonAdminsCanView', 'student', 'employed'],
                include: [{
                        model: Area,
                        attributes: ["name"]
                    },
                    {
                        model: Volunteer
                    }
                ]
            })
            res.send(team)
            return

        } catch (err) {

            next(new CustomError('We had trouble getting your team info.', 500, err))

        }
    }
};
