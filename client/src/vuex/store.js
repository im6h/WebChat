import Vue from 'vue';
import Vuex from 'vuex';

import file from './modules/file'
import group from './modules/group'
import message from './modules/message'
import room from './modules/room'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        file,
        group,
        message,
        room,
        user
    }
})