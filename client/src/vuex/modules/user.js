import axios from 'axios';

const state = {
    userLogin: {},
    userLogon: {},
    users: []
};
const getters = {
    userLogin(state) {
        return state.userLogin;
    },
    userLogon(state) {
        return state.userLogon;
    },
    users(state) {
        return state.users;
    }

};

const actions = {
    async PERFORM_LOGIN({commit}, user) {
        const config = {
            method: 'post',
            url: '/v1/user/login',
            data: user
        };
        let res = await axios(config)
            .then()
            .catch();
        console.log(res.data);
        commit("PERFORM_LOGIN", res.data);
    },
    async PERFORM_LOGON({commit}, user) {
        const config = {
            method: 'post',
            url: '/v1/user/logon',
            data: user
        };
        const res = await axios(config)
            .then()
            .catch();
        console.log(res.data);
        commit("PERFORM_LOGON", res.data);
    },
    async PERFORM_LOGOUT({commit}) {
        const res = await axios.get("/v1/user/logout").then().catch();
        commit("PERFORM_LOGOUT");
    },
    async USER_LOADING({commit}) {
        const res = await axios.get("/v1/user/search")
            .then()
            .catch(err => console.log(err));
        console.log(res.data);
        commit("USER_LOADING", res.data)
    },


};
const mutations = {
    PERFORM_LOGIN(state, data) {
        state.userLogin = data;
    },
    USER_LOADING(state, data) {
        state.users = data;
    },
    PERFORM_LOGON(state, data) {
        state.userLogon = data;
    },
    LOGIN_SUCCESS() {
    },
    LOGIN_FAILURE() {
    },
    LOGON_SUCCESS() {
    },
    LOGON_FAILURE() {
    },
};
export default {
    state,
    getters,
    mutations,
    actions
}