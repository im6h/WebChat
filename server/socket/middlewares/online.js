const onlineModel = require('../../models/online');
const SocketManager = require('../utils/SocketManager');
const socketManager = new SocketManager();
module.exports = async function(ws, fn) {
	const id = ws.id;
	const user = ws.user;
	const userId = user._id.toString();
	if (!socketManager.isOnline(userId)) {
		await onlineModel.recordOnlineTime(userId);
	}
	socketManager.set(userId, id);
	ws.socketManager = socketManager;
	fn();
};
module.exports.recordOffline = function(userId) {
	return onlineModel.recordOfflineTime(userId);
};

module.exports.socketManager = socketManager;
