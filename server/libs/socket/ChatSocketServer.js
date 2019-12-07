const EventEmitter = require('events').EventEmitter;
const WebSocketServer = require('ws').Server;
const _ = require('lodash');
const utils = require('./utils');

class ChatSocketServer extends WebSocketServer {
	constructor(server) {
		super({ noServer: true });
		this.server = server;
		this.eventer = new EventEmitter();
		//http level middlewares is middlewares
		// which is called when http switch to websocket
		this.hlmMiddlewares = [];
		//websocket level middlewares is middlewares
		// whitch is called when websocket's socket connected
		this.wlmMiddlewares = [];
		this._init();
	}
	_init() {
		this._polling();
		this._event();
		this._hlmMiddleware();
	}
	_event() {
		const that = this;
		this.on('connection', ws => {
			ws.initExtension(that);
			this._runWlm(ws, err => {
				if(err) console.log(err);
				if (err) return ws.close();
				console.log('connected');
				this.eventer.emit('connection', ws);
				this._initSocketEvent(ws);
			});
			ws.on('close', () => {
				ws.eventer.emit('disconnect');
			});
		});
		this.on('error', e => {
			// throw e;
		});
	}
	_polling() {
		const that = this;
		this.interval = setInterval(() => {
			that.clients &&
				that.clients.forEach(ws => {
					if (!ws.isAlive) {
						ws.eventer.emit('disconnect');
						return ws.terminate();
					}
					ws.setNotAlive();
					ws.ping(_.noop);
				});
		}, 5000);
	}
	_hlmMiddleware() {
		this.server.on('upgrade', (req, socket, head) => {
			console.log('on upgrade');
			const mapping = {};
			this._runHlm(req, socket, mapping, err => {
				if (err) {
					console.log(err);
					return socket.destroy();
				}
				this.handleUpgrade(req, socket, head, ws => {
					for (let key of Object.keys(mapping)) {
						ws[key] = mapping[key];
					}
					this.emit('connection', ws, req);
				});
			});
		});
	}
	_runHlm(req, socket, mapping, fn) {
		const fns = this.hlmMiddlewares;
		if (!fns.length) return fn(null);
		function run(i) {
			fns[i](req, socket, mapping, function(err) {
				if (err) {
					return fn(err);
				}
				if (!fns[i + 1]) return fn(null);
				run(i + 1);
			});
		}

		run(0);
	}
	_runWlm(ws, fn) {
		const fns = this.wlmMiddlewares;
		if (!fns.length) return fn();
		function run(i) {
			fns[i](ws, function(err) {
				if (err) return fn(err);
				if (!fns[i + 1]) return fn();
				run(i + 1);
			});
		}
		run(0);
	}
	_initSocketEvent(ws) {
		ws.on('pong', ws.setIsAlive);
		ws.on('message', this._onMessage(ws));
	}
	_onMessage(ws) {
		return rawData => {
			let data = utils.decode(rawData);
			if (!data || typeof data != 'object') return;
			const { event, payload } = data;
			if (!event) return;
			ws.eventer.emit(event, payload, ws);
		};
	}

	broadcastEvent(event, payload) {
		this.clients.forEach(client => {
			if (client.isOpen()) {
				client.emitEvent(event, payload);
			}
		});
	}
	emitToRoom(room, event, payload) {
		this.clients.forEach(ws => {
			if (ws.isOpen() && ws.rooms.has(room)) {
				ws.emitEvent(event, payload);
			}
		});
	}
	onEvent(event, cb = _.noop) {
		this.eventer.on(event, cb);
	}
	useHLM(fn) {
		this.hlmMiddlewares.push(fn);
	}
	useWLM(fn) {
		this.wlmMiddlewares.push(fn);
	}
}
module.exports = ChatSocketServer;
