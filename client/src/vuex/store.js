import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authState: false,
        authUser: {},
        rooms: [],
        messagesInRoom: [],
        currentRoom: {},
    },
    getters: {
        getUserData: state => state.authUser,
        isAuthorized: state => state.authState,

        getRoomData: state => state.rooms,
        getCurrentRoom: state => state.currentRoom,

        getMessagesInRoom: state => state.messagesInRoom,

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
            state.messagesInRoom.push(payload);
        }

    },
    actions: {
        // handle user
        saveUserData: (context, payload) => {
            context.commit("ASSIGN_USER_DATA", payload);
        },
        toggleAuthState: (context, payload) => {
            context.commit("TOGGLE_AUTH_STATE", payload)
        },
        resetStateDate: context => {
            axios.get('/v1/user/logout')
                .then(() => {
                    context.commit("RESET_STATE");
                    localStorage.clear();
                    router.push({name: 'Login'})
                })
        },
        // handle room
        updateRoom: (context, payload) => {
            context.commit('ASSIGN_ROOM_DATA', payload);
        },
        saveCurrentRoom: (context, payload) => {
            context.commit('SAVE_CURRENT_ROOM', payload);
        },

        fetchMessages: (context, id) => {
            axios.get(`/v1/message/${id}`)
                .then((res) => {
                    context.commit('MESSAGES_IN_ROOM', res.data);
                })
        },
        pushMessageInRoom: (context, payload) => {
            context.commit('PUSH_MESSAGE_IN_ROOM', payload);
        }
    }
})