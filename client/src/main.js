import './fcm';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import { EmojiPickerPlugin } from 'vue-emoji-picker/src/main';
import { DateFilter } from './filters/date.filter';
import { FileSize } from './filters/file-size.filter';

Vue.config.productionTip = false;
Vue.use(EmojiPickerPlugin);
Vue.filter('date', DateFilter);
Vue.filter('fileSize', FileSize);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
