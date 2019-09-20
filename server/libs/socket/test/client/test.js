const assert = require('assert');
const ws = require('websocket');
const mocha = require('mocha');
let describe = mocha.describe;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
let connection;

describe('Websocket', function() {
	step('init', () => {
		connection = new ws.w3cwebsocket('ws://localhost:3000');
		connection.binaryType = 'arraybuffer';
	});
	step('2', () => {
		describe('#binary type', function() {
			it('binary type should equal arraybuffer', function() {
				assert.equal(connection.binaryType, 'arraybuffer');
			});
		});
	});
	step('wait 1s', async () => {
		this.timeout(1000);
		return wait(200);
	});
	step('end', () => {
		describe('#connection', () => {
			it('should be connected after one second', function() {
				assert.equal(connection.readyState, connection.OPEN);
			});
		});
		const fs = require('fs');
		let message = fs.readFileSync('./test.js');
		describe('#send with pson', () => {
			const cipher = pson.encode(message);
			connection.send(cipher.buffer);
			this.timeout(3000);
			it('should be receive same message', function() {
				connection.onmessage = function(e) {
					assert.notEqual(message, e.data);
				};
			});
			describe('#send string', () => {
				const message = "dsfdsfdsfdsf";
				connection.send(message);
				it('should be receive another message', function() {
					connection.onmessage = function(e) {
						assert.notEqual(message, e.data);
					};
				});
				describe('#send object', () => {
					let message = { event: 1, payload: 'b' };
					connection.send(pson.encode(message).buffer);
					it('should be receive another message', function() {
						connection.onmessage = function(e) {
							assert.deepEqual(message, pson.decode(e.data));
						};
					});
				});
			});
		});
	});
});
