const WebSocket = require('ws');
const uniqid = require('uniqid');
const utils = require('../utils');
const Emitter = require('events').EventEmitter;
const _ = require('lodash');
WebSocket.prototype.isAlive = true;
WebSocket.prototype.rooms = undefined;
WebSocket.prototype.id = undefined;
WebSocket.prototype.join = function(rooms) {
	rooms = Array.isArray(rooms) ? rooms : [rooms];
	for (let room of rooms) {
		this.rooms.add(room);
	}
};
WebSocket.prototype.initExtension = function() {
	this.id = uniqid();
	this.isAlive = true;
	this.rooms = new Set();
	this.rooms.add(this.id);
	this.eventer = new Emitter();
};
WebSocket.prototype.isOpen = function() {
	return this.readyState === WebSocket.OPEN;
};
WebSocket.prototype.setIsAlive = function() {
	this.isAlive = true;
};
WebSocket.prototype.setNotAlive = function() {
	this.isAlive = false;
};
WebSocket.prototype.emitEvent = function(event, payload) {
	const data = utils.encode({ event, payload });
	this.send(data);
};
WebSocket.prototype.onEvent = function(event, cb = _.noop) {
	this.eventer.on(event, cb);
};
module.exports = console.log('injected extension to WebSocket');
