function _getJsonData(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
}
module.exports.getJsonData = _getJsonData;
function encode(data) {
	return JSON.stringify(data);
}
module.exports.encode = encode;
function decode(cipher) {
	if (typeof cipher !== 'string') return false;
	return _getJsonData(cipher);
}
module.exports.decode = decode;
