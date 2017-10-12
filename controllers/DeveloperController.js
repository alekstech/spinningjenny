const {Developer} = require('../models')
const config = require('../config/config')

module.exports = {
	async index (req, res) {
		try {
			let devs = await Developer.findAll()
			res.send(devs)
		} catch (err) {
		    res.status(500).send({
				error: 'an error has occured trying to fetch the developers'
			})
		}
	}
}
