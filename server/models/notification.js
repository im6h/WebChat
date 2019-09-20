const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		link: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);
module.exports = mongoose.model('notification', schema);
