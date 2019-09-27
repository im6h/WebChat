import Vue from 'vue';
import Router from 'vue-router';
// import store from './vuex/store';
// import axios from 'axios';
Vue.use(Router);
// let checkUserData = async next =>{
// 	if (localStorage.getItem("connect.sid")){
// 		if (store.getters.getUserData.isEmpty){
// 			let res = axios.get('/v1/user/current');
// 			if (res.data){
// 				await  store.dispatch('saveUserData',res.data);
// 				await  store.dispatch('toggleAuthState',true);
//
// 				next();
// 			}else{
// 				next();
// 			}
// 		}else{
// 			next()
// 		}
// 	}
// };
const router = new Router({
	mode: 'history',
	routes: [
		{
			path:'*',
			component:() => import('./components/error/NotFound')
		},
		{
			path: '/',
			name: 'Home',
			component: () => import('./views/Home.vue'),
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('./views/About.vue'),
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('./components/auth/Login.vue'),
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('./components/auth/Register.vue'),
			meta: {
				requiresAuth: false,
			},
		},


		// handle with user
		{
			path:'/user/:handle',
			name:'UserProfile',
			component:()=> import('./components/profile/UserProfile.vue'),
			meta: {
				requiresAuth:true,
				transactionName:'router-anim',
				enterActive: 'animated fadeIn'
			}
		},
		{
			path:'/room',
			name:'RoomList',
			component:()=> import('./components/room/RoomList.vue'),
			meta:{
				requiresAuth:true,
				transitionName: 'router-anim',
				enterActive: 'animated fadeIn'
			}
		},
	],
});
// router.beforeEach(async (to,from,next)=>{
// 	await  checkUserData(next);
// 	if (to.meta.requiresAuth){
// 		if (localStorage.getItem("connect.sid")=== null){
// 			localStorage.clear();
// 			next({
// 				name:'Login',
// 			})
// 		}else{
// 			next();
// 		}
// 	}else{
// 		next();
// 	}
// });
export default router;
