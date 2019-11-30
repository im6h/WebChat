const dev = process.env.NODE_ENV !== 'production';
require('dotenv').config({ path: dev ? '.dev.env' : '.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const passport = require('passport');
const port = process.env.PORT || 3000;
require('./server/models')();
require('./server/passport/localStrategy')();
const sessionParser = require('./server/shareds/sessionParser');

_init();
function _init() {
	const expressServer = _initExpress();
	const httpServer = http.createServer(expressServer);
	const wss = require('./server/libs/socket').init(httpServer);
	require('./server/socket')(wss);
	httpServer.listen(port, () => {
		console.log(`server ready on : ${port}`);
	});
}
function _initExpress() {
	const server = express();
	_initBaseMiddleware(server);
	_initRouter(server);
	return server;
}
function _initBaseMiddleware(server) {
	server.use(express.static(path.join(__dirname, 'public')));
	server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
	server.use(logger('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: false }));
	server.use(cookieParser());
	server.use(sessionParser);
	server.use(passport.initialize());
	server.use(passport.session());
}
function _initRouter(server) {
	server.use('/v1', require('./server/routes'));
	server.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
	});
}
