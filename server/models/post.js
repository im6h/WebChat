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
	},
	{
		timestamps: true,
	},
);
module.exports = mongoose.model('post', schema);
