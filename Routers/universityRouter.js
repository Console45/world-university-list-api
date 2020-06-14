const { Router } = require('express');
const University = require('../DataBase/Model/UniversityModel');

// ROUTER CONFIG
const router = Router();

//******************************************************************************************
// 										GET ROUTE
//******************************************************************************************
router.get('/universities', async (req, res) => {
	try {
		let dataHolder = [];
		if (!(req.query.name || req.query.country)) return res.redirect('/index');
		// *********************************************************************************
		//  							SEARCH BY NAME
		// *********************************************************************************
		if (req.query.name && !req.query.country) {
			const universities = await University.find({ name: req.query.name });
			if (universities.length === 0) return res.status(404).send({ error: 'No university found' });
			for (let university of universities) {
				const { webPages: web_pages, domains, name, country } = university;
				dataHolder.push({ web_pages, domains, name, country });
			}
			res.send(dataHolder);
		}
		// **********************************************************************************
		// 								SEARCH BY COUNTRY
		// **********************************************************************************
		if (req.query.country && !req.query.name) {
			const universities = await University.find({ country: req.query.country });
			if (universities.length === 0) return res.status(404).send({ error: 'No university found' });
			for (let university of universities) {
				const { webPages: web_pages, domains, name, country } = university;

				dataHolder.push({ web_pages, domains, name, country });
			}
			res.send(dataHolder);
		}
		// **********************************************************************************
		//  						SEARCH BY NAME AND COUNTRY
		// **********************************************************************************
		if (req.query.name && req.query.country) {
			const university = await University.findOne({ name: req.query.name, country: req.query.country });
			if (!university) return res.status(404).send({ error: 'No university found' });
			const { webPages: web_pages, domains, name, country } = university;
			res.send({ web_pages, domains, name, country });
		}
	} catch (err) {
		res.status(500).send({
			error: 'Internal Error'
		});
	}
});

module.exports = router;
