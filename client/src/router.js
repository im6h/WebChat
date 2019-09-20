import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue';
import Register from '@/views/register/register.vue';
import Home from '@/views/home/home.vue';
import About from '@/views/about/about.vue';
Vue.use(Router);

const router =  new Router({
  mode:'history',
  routes: [
    {
      path:'*',
      redirect: '/login'
    },
    {
      path: '/login',
      name:'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/chat',
      name:'Home',
      component:Home,
      meta:{
        requiresAuth:true,
      }
    },
    {
      path:'/about',
      name:'About',
      component:About,
      meta:{
        requiresAuth: true
      }
    }
  ]
});
// router.beforeEach((to,from,next)=>{
//   let check = to.matched.some(recorded => recorded.meta.requiresAuth);
//   if (check){
//     next('/login');
//   }else{
//     next();
//   }
// });
export default router;
