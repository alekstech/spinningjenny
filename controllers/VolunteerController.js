const { Area, AreaVolunteer, Volunteer } = require("../models");
const config = require("../config/config");

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
  		let volunteerData = await Volunteer.findById(req.params.id);
      let areas = await AreaVolunteer.findAll(
        {
          where: {
            VolunteerId: req.params.id
          },
          include: [
            {
              model: Area,
              attributes: ["name"]
            }
          ]
        }
      )
      res.send({volunteerData, areas});
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  },

  async editProfile(req, res) {
    console.log('editProfile', req.body)
    try {
        let data = await Volunteer.update(req.body, { 
          where: { id: req.body.id }
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
  }
};
