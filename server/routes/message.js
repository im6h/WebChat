const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const { param } = require('express-validator');
const validateReq = require('../middlewares/validate-req');
const messageModel = require('../models/message');
const roomModel = require('../models/room');
const status = require('http-status');
router.get('/:roomId', [param('roomId').isMongoId()], validateReq, mustAuth, async (req, res) => {
	const roomId = req.params.roomId;
	const user = req.user;
	const room = await roomModel.findByIdAndUserId(roomId, user.id).lean();
	if (!room) {
		return res.status(status.NOT_FOUND).send({ message: 'Không tìm thấy phòng' });
	}
	const records = await messageModel.findInRoom(roomId);
	return res.send(records);
});
module.exports = router;
