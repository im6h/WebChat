const roomModel = require('../../models/room');
module.exports.joinAllRoom = async ws => {
	const userId = ws.user._id;
	const records = await roomModel.find({ members: userId }, '_id');
	ws.join(records.map(record => record._id.toString()));
};
