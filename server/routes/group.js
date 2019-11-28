const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const roomModel = require('../models/room');
const validateReq = require('../middlewares/validate-req');
const userModel = require('../models/user');
const { body } = require('express-validator');
// create group
router.post('/', mustAuth, async (req, res) => {
	const user = req.user;
	const userId = user._id;
	const members = [userId];
	const existedRecord = await roomModel.findExistGroup(userId);
	let id;
	if (existedRecord) {
		id = existedRecord._id;
	} else {
		const record = await roomModel.create({
			members,
			creator: userId,
			type: 'group',
		});
		id = record._id;
	}
	res.send(id);
});
// invite user to current room
router.post(
	'/invite',
	mustAuth,
	[body('userId').isString(), body('roomId').isString()],
	validateReq,
	async (req, res) => {
		const { userId, roomId } = req.body;
		const user = req.user;
		const record = await roomModel.findOneAndUpdate(
			{
				$and: [
					{
						type: 'group',
					},
					{
						_id: require('mongoose').Types.ObjectId(roomId),
					},
					{
						members: user._id,
					},
				],
			},
			{
				$addToSet: { members: require('mongoose').Types.ObjectId(userId) },
			},
		);
		const data = await userModel.findById(userId, '_id fullName username').lean();
		if (record) {
			res.send({ status: 'success', data });
		} else {
			return res.status(403).send({ status: 'error' });
		}
	},
);
// remove user from current room
router.put(
	'/remove/',
	mustAuth,
	[body('userId').isString(), body('roomId').isString()],
	validateReq,
	async (req, res) => {
		const { userId, roomId } = req.body;
		const user = req.user;
		const record = await roomModel.findOneAndUpdate(
			{
				$and: [
					{
						type: 'group',
					},
					{
						_id: require('mongoose').Types.ObjectId(roomId),
					},
					{
						members: user._id,
					},
				],
			},
			{
				$pull: { members: require('mongoose').Types.ObjectId(userId) },
			},
		);
		if (record) {
			if(record.members.length === 1) {
				await record.remove();
			}
			res.send({ status: 'success', _id: userId });
		} else {
			return res.status(403).send({ status: 'error' });
		}
	},
);
module.exports = router;
