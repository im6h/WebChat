const urlMetadata = require('url-metadata');
const validator = require('validator');
const fcm = require('../../utils/fcm');
module.exports.getUrlMetaData = function(url) {
	if (validator.isURL(url)) {
		return urlMetadata(url).then(meta => meta, () => ({}));
	} else {
		return {};
	}
};

module.exports.isImage = function(mimetype) {
	return mimetype.match('image.*');
};

module.exports.sendNotification = function(members, username, content) {
	members.forEach(async mem => {
		await fcm
			.sendMessage(mem, `${username} đã gửi tin nhắn`, content)
			.then(() => console.log('success'));
	});
};
