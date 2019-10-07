import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
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
		{
			path:'/messages',
			name:'Messages',
			component: ()=> import('./components/messages/Messages.vue'),
			meta:{
				requiresAuth:true,
			}
		},
		{
			path:'/room/:handle',
			name:'Room',
			component:()=> import('./components/messages/MessageDetail.vue'),
			meta:{
				requiresAuth:true,
				transitionName: 'router-anim',
				enterActive:'animated fadeIn'
			}
		},
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

	],
});
export default router;