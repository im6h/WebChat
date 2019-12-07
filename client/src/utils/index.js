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

let oldTitle = document.title;
let interval;

export function blinkTitle(text) {
	closeBlink();
	interval = setInterval(() => {
		if (document.title === text) {
			document.title = oldTitle;
		} else {
			document.title = text;
		}
	}, 4000);
}

export function closeBlink() {
	clearInterval(interval);
	document.title = oldTitle;
}
