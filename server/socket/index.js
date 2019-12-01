const EventType = require('./eventTypes');
const roomModel = require('../models/room');
const messageModel = require('../models/message');
const _ = require('lodash');
const socketUtil = require('./utils/socket');
const authMiddleware = require('./middlewares/auth');
const onlineRecordMiddleware = require('./middlewares/online');
const onlineModel = require('../models/online');
const userModel = require('../models/user');
const fileModel = require('../models/file');
const commonUtil = require('./utils/common');
module.exports = wss => {
	wss.useWLM(onlineRecordMiddleware);
	wss.useHLM(authMiddleware);
	console.log('init socket');
	wss.onEvent('connection', async ws => {
		await socketUtil.joinAllRoom(ws);
		ws.onEvent(EventType.MESSAGE, async data => {
			const { roomId, content } = data;
			const user = ws.user;
			const room = await roomModel.findByIdAndUserId(roomId, user._id);
			if (!room) return ws.close();
			const message = await messageModel.createMessage(
				user.username,
				user._id,
				content,
				room._id,
			);
			room.lastMessage = message.id;
			await room.save();
			wss.emitToRoom(
				room._id.toString(),
				EventType.MESSAGE,
				_.pick(message, ['sender', 'date', 'content', '_id', 'room', 'type']),
			);
		});
		ws.onEvent(EventType.TYPING, async data => {
			const user = ws.user;
			const content= data.typing;
			const roomId = data.room;
			const room = await roomModel.findByIdAndUserId(roomId, user._id).lean();
			const message = await messageModel.createMessage(
				user.username,
				user._id,
				content,
				room._id,
			);
			if (!room) return ws.close();
			wss.emitToRoom(
				room._id.toString(), 
				EventType.MESSAGE,
				_.pick(message, ['sender', 'date', 'content', '_id', 'room', 'type'])
				);
		});
		ws.onEvent(EventType.ONLINE, async data => {
			if (!data) return;
			const record = await userModel.findByUsername(data, '_id').lean();
			if (!record) return ws.emitEvent(EventType.ONLINE, false);
			const online = await getOnlineState(record._id.toString(), ws.socketManager);
			ws.emitEvent(EventType.ONLINE, online);
		});
		ws.onEvent(EventType.FILE, async ({ fileId, roomId }) => {
			const user = ws.user;
			const room = await roomModel.findByIdAndUserId(roomId, user._id);
			const record = await fileModel.findById(fileId);
			if (!room || !record) return ws.close();
			const type = commonUtil.isImage(record.mimetype) ? 'image' : 'file';
			const content = {
				path: record.path,
				size: record.size,
				mimetype: record.mimetype,
				originalname: record.originalname,
				type,
			};
			const message = await messageModel.createMessage(
				user.username,
				user._id,
				content,
				room._id,
				type,
			);
			room.lastMessage = message.id;
			await room.save();
			wss.emitToRoom(
				room._id.toString(),
				EventType.MESSAGE,
				_.pick(message, ['sender', 'date', 'content', '_id', 'room', 'type']),
			);
		});
		ws.onEvent(EventType.JOIN, async ({ roomId }) => {
			await socketUtil.joinRoom(ws, roomId);
			//
		});
		ws.onEvent('disconnect', async () => {
			console.log(ws.user.username, 'disconnected');
			ws.socketManager.remove(ws.user._id.toString(), ws.id);
			setTimeout(() => {
				if (!ws.socketManager.isOnline(ws.user._id.toString())) {
					onlineRecordMiddleware.recordOffline(ws.user._id);
				}
			}, 2000);
		});
	});
};

async function getOnlineState(userId, socketManager) {
	if (socketManager.isOnline(userId)) {
		return true;
	}
	const record = await onlineModel.getLastOnlineRecord(userId);
	return record && record.createdAt;
}
