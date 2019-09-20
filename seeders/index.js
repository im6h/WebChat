require('dotenv').config({ path: '../.dev.env' });
const seeder = require('mongoose-seed');
const fs = require('fs');
const path = require('path');
const models = ['user', 'room', 'post', 'notification', 'message', 'friend', 'comment'];
seeder.connect(process.env.MONGO_URL, function() {
	seeder.loadModels(getModels(...models));
	seeder.clearModels(models, function() {
		// console.log(data)
		// // Callback to populate DB once collections have been cleared
		seeder.populateModels(data, function() {
			seeder.disconnect();
		});
	});
});
let data = models.map(model => readData(model));
function readData(name) {
	const dataPath = './data';
	return JSON.parse(fs.readFileSync(path.join(dataPath, name + '.json'), 'utf-8'));
}
function getModels(...names) {
	return names.map(name => {
		return `../server/models/${name}`;
	});
}
