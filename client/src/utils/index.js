export function encode(data) {
	return JSON.stringify(data);
}
export function decode(cipher) {
	if (typeof cipher !== 'string') return false;
	try {
		return JSON.parse(cipher);
	} catch (e) {
		return false;
	}
}
