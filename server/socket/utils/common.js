const urlMetadata = require('url-metadata');
const validator = require('validator');
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
