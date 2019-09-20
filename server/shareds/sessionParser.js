const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { DOCKER, REDIS_URL, REDIS_DOCKER_URL, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';
const docker = DOCKER === '1';
if (dev) {
	module.exports = session({
		secret: 'hirosume',
		saveUninitialized: false,
		resave: true,
		store: new RedisStore({
			url: docker ? REDIS_DOCKER_URL : REDIS_URL,
		}),
	});
} else {
	module.exports = session({
		secret: 'hirosume',
		saveUninitialized: false,
		resave: true,
	});
}
