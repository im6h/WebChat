const mongoose = require('mongoose');
require('dotenv').config({ path: '../.dev.env' });
const models = require('../server/models/index').models;
const fs = require('fs');
const path = require('path');
const pathData = './data';
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, async function(err, connection) {
	console.log('connected');
	for await (let model of models) {
		const records = await model.find({}).lean();
		const name = model.modelName;
		console.log(`model: ${name} has read ${records.length} records`);
		checkAndRemoveData(name);
		writeData(name, records);
		console.log(`model: ${name} has write successful`);
	}
	await connection.close();
	process.exit(0);
});
function writeData(name, records) {
	const fileName = name + '.json';
	const serializedData = JSON.stringify({
		model: name,
		documents: records,
	});
	fs.writeFileSync(path.join(pathData, fileName), serializedData, 'utf-8');
}
function checkAndRemoveData(name) {
	const fileName = name + '.json';
	if (checkExistData(fileName)) {
		fs.unlinkSync(path.join(pathData, fileName));
		return true;
	}
	return false;
}
function checkExistData(fileName) {
	return fs.existsSync(path.join(pathData, fileName));
}
