import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import { routes } from './router'

Vue.use(VueRouter);
// axios.defaults.baseURL = 'https://wd2468178309upkmpi.wilddogio.com/'
axios.defaults.baseURL = 'https://wd9077913423avyuea.wilddogio.com/'

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
		return savedPosition
		} else {
		return { x: 0, y: 0 }
		  }
    }
})
// 全局守卫
/*router.beforeEach((to, from, next) => {
  alert('请先登录！');
  next();
  console.log(to);
  
	  if(to.path === '/login' || to.path === '/register') {
	      next();
	  } else {
	      alert('尚未登录，请先登录！');
	      next('/login');
	  }
})*/
//后置钩子
/*router.afterEach((to, from)=>{

})*/

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
