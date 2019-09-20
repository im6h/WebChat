const mongoose = require('mongoose');
const schema = new mongoose.Schema(
	{
		sender: {
			type: String,
			required: true,
		},
		senderId: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'user',
		},
		content: {
			type: mongoose.SchemaTypes.Mixed,
		},
		room: {
			type: mongoose.SchemaTypes.ObjectId,
		},
		date: {
			type: Date,
			default: () => new Date(),
		},
		type: {
			type: String,
			default: 'text',
			enum: ['text', 'file', 'image'],
		},
	},
	{},
);
schema.statics.findInRoom = function(roomId) {
	return this.find({ room: mongoose.Types.ObjectId(roomId) }, '-senderId -room').lean();
};
schema.statics.createMessage = function(sender, senderId, content, roomId, type = 'text') {
	return this.create({
		sender,
		senderId: mongoose.Types.ObjectId(senderId),
		content,
		room: mongoose.Types.ObjectId(roomId),
		type,
	});
};
module.exports = mongoose.model('message', schema);
