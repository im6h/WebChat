import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';
import { object } from 'prop-types';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		authState: false,
		authUser: {},
		rooms: [],
		messagesInRoom: [],
		currentRoom: {},
		typing: false
	},
	getters: {
		getUserData: state => state.authUser,
		isAuthorized: state => state.authState,

		getRoomData: state => state.rooms,
		getCurrentRoom: state => state.currentRoom,

		getMessagesInRoom: state => state.messagesInRoom,

		isTyping: state => state.typing
	},
	mutations: {
		// handle user
		ASSIGN_USER_DATA: (state, payload) => {
			state.authUser = payload;
		},
		RESET_STATE: state => {
			state.currentUser = {};
			state.authUser = false;
		},
		TOGGLE_AUTH_STATE: (state, payload) => {
			state.authState = payload;
		},
		// handle room
		ASSIGN_ROOM_DATA: (state, payload) => {
			state.rooms = payload;
		},
		SAVE_CURRENT_ROOM: (state, payload) => {
			state.currentRoom = payload;
		},

		MESSAGES_IN_ROOM: (state, payload) => {
			state.messagesInRoom = payload;
		},

		PUSH_MESSAGE_IN_ROOM: (state, payload) => {
			let contain = _.map(state.messagesInRoom, n => {
				return n._id;
			});
			if (!_.includes(contain, payload._id)) {
				state.messagesInRoom.push(payload);
			}
		},
		UPDATE_LAST_MESSAGE: (state, payload) => {
			state.rooms.forEach(room => {
				if (room._id === payload.room) {
					room.lastMessage = payload;
				}
			});
		},
		UPDATE_UNREAD(state, roomId) {
			state.rooms.forEach(room => {
				if (room._id === roomId) {
					room.unread = (room.unread || 0) + 1;
				}
			});
		},
		CLEAR_UNREAD(state, roomId) {
			state.rooms.forEach(room => {
				if (room._id === roomId) {
					room.unread = 0;
				}
			});
		},
		ADD_MEMBER(state, {  member }) {
			state.currentRoom.members.push(member);
		},
		TYPING_MESSAGE(state,payload){
			state.typing = payload;
		}
	},
	actions: {
		// handle user
		saveUserData: (context, payload) => {
			context.commit('ASSIGN_USER_DATA', payload);
		},
		toggleAuthState: (context, payload) => {
			context.commit('TOGGLE_AUTH_STATE', payload);
		},
		resetStateDate: context => {
			axios.get('/v1/user/logout').then(() => {
				context.commit('RESET_STATE');
				localStorage.clear();
				router.push({ name: 'Login' });
			});
		},
		// handle room
		updateRoom: (context, payload) => {
			context.commit('ASSIGN_ROOM_DATA', payload);
		},
		saveCurrentRoom: (context, payload) => {
			context.commit('SAVE_CURRENT_ROOM', payload);
		},

		fetchMessages: (context, id) => {
			axios.get(`/v1/message/${id}`).then(res => {
				context.commit('MESSAGES_IN_ROOM', res.data);
			});
		},
		pushMessageInRoom: (context, payload) => {
			context.commit('PUSH_MESSAGE_IN_ROOM', payload);
		},
		updateLastMessage: (context, payload) => {
			context.commit('UPDATE_LAST_MESSAGE', payload);
		},
		updateUnread(context, room) {
			context.commit('UPDATE_UNREAD', room);
		},
		clearUnread(context, room) {
			context.commit('CLEAR_UNREAD', room);
		},
		addMember(context, payload) {
			context.commit('ADD_MEMBER', payload);
		},
		typingMessage(context, payload){
			context.commit('TYPING_MESSAGE',payload);
		}
	},
});
