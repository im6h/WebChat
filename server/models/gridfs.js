const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { DOCKER, MONGO_URL, MONGO_DOCKER_URL } = process.env;
const docker = DOCKER === '1';
const url = docker ? MONGO_DOCKER_URL : MONGO_URL;
const conn = mongoose.createConnection(url);
module.exports.storage = new GridFsStorage({
	url,
	options: { useNewUrlParser: true },
	file(req, file) {
		return {
			metadata: file,
		};
	},
});

let gfs;
conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	console.log('connect grid fs successful');
	gfs.files.findById = function(id) {
		return this.findOne({ _id: mongoose.Types.ObjectId(id) });
	};
});

module.exports.getStreamCollection = () => gfs;
