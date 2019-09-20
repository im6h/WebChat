const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const dev = process.env.NODE_ENV !== 'production';
if (dev) {
	module.exports = session({
		secret: 'hirosume',
		saveUninitialized: false,
		resave: true,
		store: new RedisStore({
			url: process.env.REDIS_URL,
		}),
	});
} else {
	module.exports = session({
		secret: 'hirosume',
		saveUninitialized: false,
		resave: true,
	});
}
