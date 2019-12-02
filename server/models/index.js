const mongoose = require('mongoose');
const { DOCKER, MONGO_URL, MONGO_DOCKER_URL } = process.env;
const docker = DOCKER === '1';
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(docker ? MONGO_DOCKER_URL : MONGO_URL, () => {
	console.log('mongodb connected');
});
module.exports = () => console.log('bootstrap mongodb');
module.exports.models = [
	require('./user'),
	require('./message'),
	require('./friend'),
	require('./post'),
	require('./comment'),
	require('./notification'),
	require('./room'),
	require('./gridfs')
];
