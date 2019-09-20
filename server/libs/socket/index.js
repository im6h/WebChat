require('./injectors');
const ChatSocketServer = require('./ChatSocketServer');
let wss;
module.exports.init = function(server) {
	wss = new ChatSocketServer(server);
	return wss;
};
module.exports.getWss = function() {
	return new Promise((resolve, reject) => {
		if (wss) {
			process.nextTick(() => {
				resolve(wss);
			});
		} else {
			setTimeout(() => {
				if (!wss) return reject(wss);
				resolve(wss);
			}, 50);
		}
	});
};
