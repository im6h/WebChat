const isObjectId = require('mongoose').Types.ObjectId.isValid;
const toObjectId = require('mongoose').Types.ObjectId;
const userModel = require('../models/user');
const roomModel = require('../models/room');
module.exports = function(server, app) {
	function checkLogin(unAuthPath) {
		return (req, res) => {
			if (req.isAuthenticated()) {
				return app.render(req, res, req.path);
			}
			return app.render(req, res, unAuthPath || '/login');
		};
	}
	server.get('/', checkLogin());
	server.get('/chat', checkLogin());
	server.get('/chat/:roomId', async (req, res) => {
		if (!req.isAuthenticated()) {
			return app.render(req, res, '/login');
		}
		const { roomId } = req.params;
		if (!isRoomId(roomId) && req.isAuthenticated()) {
			const room = await findOrCreateRoom(roomId, req.user._id);
			if (room) return app.render(req, res, `/chat/${room._id}`);
		}
		return app.render(req, res, req.path);
	});
	server.get('/login', checkLogin());
	server.get('/logon', checkLogin('/logon'));
};
function isRoomId(roomId) {
	return isObjectId(roomId);
}
async function findOrCreateRoom(userName, myUserId) {
	const user = await userModel.findByUsername(userName).lean();
	if (!user) {
		return false;
	}
	const room = await roomModel.findByMembers([user._id, myUserId]);
	if (room) return room;
	return roomModel.create({
		members: [toObjectId(user._id), toObjectId(myUserId)],
		type: 'inbox',
		creator: toObjectId(myUserId),
	});
}
