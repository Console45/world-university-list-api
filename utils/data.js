const fs = require('fs');
require('../DataBase/DB');
const University = require('../DataBase/Model/UniversityModel');

const extractData = async () => {
	const dataBuffer = fs.readFileSync('universities_data.json');
	const dataJson = dataBuffer.toString();
	const parseData = JSON.parse(dataJson);
	for (let data of parseData) {
		const { web_pages, name, domains, country } = data;
		const universities = new University({
			name,
			country
		});
		for (let page of web_pages) {
			universities.webPages.push(page);
		}
		for (let domain of domains) {
			universities.domains.push(domain);
		}
		await universities.save();
	}
};
extractData().catch((err) => {
	console.log(err);
});
