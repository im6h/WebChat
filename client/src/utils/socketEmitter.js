import { Subject } from 'rxjs';

function createName(name) {
	return `$ ${name}`;
}
function Emitter() {
	this.subjects = new Map();
}
Emitter.prototype.emit = function(name, data) {
	const fnName = createName(name);
	this.subjects.get(fnName) || this.subjects.set(fnName, new Subject());
	this.subjects.get(fnName).next(data);
};
Emitter.prototype.listen = function(name, handler) {
	const fnName = createName(name);
	this.subjects.get(fnName) || this.subjects.set(fnName, new Subject());
	return this.subjects.get(fnName).subscribe(handler);
};
Emitter.prototype.off = function(name) {
	const fnName = createName(name);
	if (this.subjects.has(fnName)) {
		this.subjects.get(fnName).unsubscribe();
	}
};
Emitter.prototype.dispose = function() {
	const subjects = this.subjects;
	Array.from(subjects.values()).forEach(subject => subject.unsubscribe());
};
export default Emitter;
