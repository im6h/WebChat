const userModel = require('../models/user');
const roomModel = require('../models/room');
const toObjectId = require('mongoose').Types.ObjectId;
async function _searchRoom(text, currentId, currentUsername) {
	const reg = new RegExp(text);
	let result = await userModel
		.find({ $or: [{ username: reg }, { fullName: reg }] }, '_id')
		.limit(3)
		.lean();
	result = await Promise.all(
		result.map(async usr => {
			const room = await _findRoomWithMember([currentId, usr._id].map(toObjectId));
			if (!room) return null;
			return {
				...room,
				..._getRoomAliasAndAvt(room, currentUsername),
			};
		}),
	);
	return result.filter(e => e);
}
function _findRoomWithMember(members) {
	return roomModel
		.findOne({
			$and: [
				{ members: { $all: members } },
				{
					members: {
						$size: 2,
					},
				},
				{
					type: 'inbox',
				},
			],
		})
		.populate('lastMessage')
		.populate('members', '-hashPassword -updatedAt -createdAt')
		.lean();
}
module.exports.searchRoom = _searchRoom;
module.exports.getRoomAliasAndAvt = _getRoomAliasAndAvt;
function _getRoomAliasAndAvt(room, userName) {
	const members = room.members;
	if (room.type === 'inbox') {
		return _getInboxRoomAliasAndAvt(members, userName);
	} else {
		return _getGroupRoomAliasAndAvt(members, userName);
	}
}
function _getInboxRoomAliasAndAvt(members, userName) {
	let friend = members[0];
	for (let member of members) {
		if (member.username !== userName) {
			friend = member;
			break;
		}
	}
	return {
		name: friend.fullName,
		avatar: friend.fullName.substring(0, 2).toUpperCase(),
	};
}
function _getGroupRoomAliasAndAvt(members, userName) {
	const fullNames = (members.length !== 1
		? members.filter(m => m.username !== userName)
		: members
	).map(m => m.fullName);
	let name = fullNames.reduce((acc, fullName) => {
		const a = '' + fullName.toUpperCase().charAt(0);
		return acc + a;
	}, '');
	return {
		avatar: name,
	};
}
