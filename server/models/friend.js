const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		owner: mongoose.SchemaTypes.ObjectId,
		ref: mongoose.SchemaTypes.ObjectId,
	},
	{ timestamps: true },
);
module.exports = mongoose.model('friend', schema);
