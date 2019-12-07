import * as firebase from 'firebase/app';
import 'firebase/messaging';
import axios from 'axios';

const firebaseConfig = {
	apiKey: 'AIzaSyAlbK6f5ayALiOuwU6e8GBGOE0CmQv1cYI',
	authDomain: 'trueapp-19c79.firebaseapp.com',
	databaseURL: 'https://trueapp-19c79.firebaseio.com',
	projectId: 'trueapp-19c79',
	storageBucket: 'trueapp-19c79.appspot.com',
	messagingSenderId: '816028726210',
	appId: '1:816028726210:web:d2284aebd2332086e25c5b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.requestPermission().then((permission) => {
	if (permission === 'granted') {
		console.log('Notification permission granted.');
	} else {
		return console.log('Unable to get permission to notify.');
	}

});
let _token;
messaging.getToken().then((token) => {
	if (!token) return;
	_token = token;
	console.log('token', token);
});

export function registerToken() {
	axios.post('/v1/user/fcm', { token: _token }).then(() => {
		console.log('success');
	}).catch((e) => {
		// console.error(e);
		// messaging.deleteToken(_token).then(r => console.log(r));
	});
}
