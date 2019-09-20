const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		originalname: {
			type: String,
			required: true,
		},
		encoding: {
			type: String,
			required: true,
		},
		mimetype: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		filename: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		uploader: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
	},
	{ timestamps: true },
);
module.exports = mongoose.model('file', schema);
