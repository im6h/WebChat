class SocketManager {
	constructor() {
		this.store = new Map();
	}
	set(key, value) {
		this._checkAndInit(key);
		this.store.get(key).add(value);
	}
	remove(key, value) {
		this._checkAndInit(key);
		this.store.get(key).delete(value);
	}
	isOnline(key) {
		this._checkAndInit(key);
		return this.store.get(key).size > 0;
	}
	_checkAndInit(key) {
		if (!this.store.has(key)) {
			this.store.set(key, new Set());
		}
	}
}
module.exports = SocketManager;
