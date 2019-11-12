import { w3cwebsocket as W3CWebSocket } from 'websocket';
import _ from 'lodash';
import { decode, encode } from './index';
import { message } from 'antd';
import Emitter from './socketEmitter';

// const sock = new SockJs('http://localhost:8081/ws');
// const stompClient = StompJs.Stomp.over(sock);
// stompClient.connect({}, function() {
// 	console.log('connected');
// }, function(err) {
// 	console.log(err);
// });

function url() {
	const l = window.location;
	return (l.protocol === 'https:' ? 'wss://' : 'ws://') + "localhost:" + "8080" + l.pathname;
}

export let connection;

export function getConnection() {
	let queue = [];
	if (connection) return connection;
	connection = new W3CWebSocket(url());
	const emitter = new Emitter();
	connection.emitEvent = function(event, payload) {
		if (this.readyState !== 1) {
			queue.push(encode({ event, payload }));
			return;
		}
		const data = encode({ event, payload });
		this.send(data);
	};
	connection.onEvent = function(event, cb = _.noop) {
		emitter.listen(event, cb);
		return this;
	};
	connection.dispose = () => emitter.dispose();
	connection.off = event => emitter.off(event);
	connection.onopen = function() {
		if (queue.length) {
			const temp = queue;
			queue = [];
			temp.forEach(e => this.send(e));
		}
		if (process.browser) {
			message.success('Kết nối thành công');
		}
	};
	connection.onerror = error => {
		console.log('Looxi', error.message);
		if (process.browser) {
			message.error('Kết nối thất bại');
		}
	};
	connection.onmessage = function(e) {
		const rawData = e.data;
		const data = decode(rawData);
		if (!data || !data.event) return;
		emitter.emit(data.event, data.payload);
	};

	return connection;
}
