const { Area, AreaVolunteer, Volunteer } = require("../models");
const config = require("../config");
const fs = require('fs')

module.exports = {
    async viewTeam(req, res) {
        try {
            // First, check who's asking
            let id = req.header('id')

            // If no ID, return
            if (id === undefined) {
                res.send(403, {
                    message: 'Forbidden'
                })
                return
            } else {
                // If ID, get status
                let profile = await Volunteer.findOne({
                    where: {
                        'id': id
                    },
                    attributes: [
                        'isStaff',
                        'isAdmin'
                    ]
                })
                let coordinator = await AreaVolunteer.findOne({
                    where: {
                        VolunteerId: id,
                        'AreaId': req.params.id
                    },
                    attributes: [
                        'coordinator'
                    ]
                })

                console.log('id:', id)
                console.log('profile:', profile)
                console.log('coordinator:', coordinator.dataValues.coordinator)

                // Check if isStaff or isAdmin
                if (profile.isAdmin || profile.isStaff) {
                    let team = await AreaVolunteer.findAll({
                        where: {
                            AreaId: req.params.id
                        },
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
                }
                // Check if coordinator 
                else if (coordinator.dataValues.coordinator) {
                    let team = await AreaVolunteer.findAll({
                        where: {
                            AreaId: req.params.id
                        },
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
                }
                // Or send only public info
                else {
                    let team = await AreaVolunteer.findAll({
                        where: {
                            AreaId: req.params.id
                        },
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
                }
            }

        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        }
    }

    // Edit team info
};
