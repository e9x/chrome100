var fs = require('fs'),
	path = require('path'),
	file = path.join(__dirname, 'data.json');

fs.writeFileSync(file + '.new', JSON.stringify(Object.keys(JSON.parse(fs.readFileSync(file)).codes)));