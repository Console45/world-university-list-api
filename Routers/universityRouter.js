const { Router } = require('express'),
	University = require('../DataBase/Model/UniversityModel');

// ROUTER CONFIG
const router = Router();


const escapeRegex = text => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/universities', async (req, res) => {

	try {

		if (!(req.query.name || req.query.country)) return res.redirect('/index');
		// name search
		if (req.query.name && !req.query.country) {
			const regexName = new RegExp(escapeRegex(req.query.name), 'gi');
			const universities = await University.find({ name: regexName });
			if (universities.length === 0) return res.status(404).send({ error: 'No university found' });
			res.send(universities);
		}
		// country search
		if (req.query.country && !req.query.name) {
			const regexCountry = new RegExp(escapeRegex(req.query.country), 'gi');
			const universities = await University.find({ country: regexCountry });
			if (universities.length === 0) return res.status(404).send({ error: 'No university found' });
			res.send(universities);
		}
		// search by name and country
		if (req.query.name && req.query.country) {
			const regexName = new RegExp(escapeRegex(req.query.name), 'gi');
			const regexCountry = new RegExp(escapeRegex(req.query.country), 'gi');
			const universities = await University.find({ name: regexName, country: regexCountry });
			if (universities.length === 0) return res.status(404).send({ error: 'No university found' });
			res.send(universities);
		}
	} catch (err) {
		console.error(err)
		res.status(500).send({
			error: 'Internal Error'
		});
	}
});


module.exports = router;
