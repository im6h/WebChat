const roomModel = require('../../models/room');
const mongoose = require('mongoose');
module.exports.joinAllRoom = async ws => {
	const userId = ws.user._id;
	const records = await roomModel.find({ members: userId }, '_id');
	ws.join(records.map(record => record._id.toString()));
};
module.exports.joinRoom = async (ws, roomId) => {
	const userId = ws.user._id;
	const record = await roomModel.findOne(
		{ members: userId, _id: mongoose.Types.ObjectId(roomId) },
		'_id',
	);
	if (record) {
		ws.join(String(record._id));
	}
};
