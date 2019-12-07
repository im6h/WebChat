const admin = require('firebase-admin');
const crypto = require('crypto');
const serviceAccount = require('./fcm.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://trueapp-19c79.firebaseio.com',
});
const messaging = admin.messaging();

function createUserHash(username) {
	return crypto.createHash('md5').update(username).digest('hex');
}

module.exports.subscribe = function(username, token) {
	const hash = createUserHash(username);
	console.log(hash);
	return messaging.subscribeToTopic(token, hash);
};
module.exports.sendMessage = function(username, title, body) {
	const hash = createUserHash(username);
	return messaging.sendToTopic(hash, {
		notification: {
			title, body,
		},
	});
};
