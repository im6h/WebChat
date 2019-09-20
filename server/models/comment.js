const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
		post: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
		content: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);
module.exports = mongoose.model('comment', schema);
