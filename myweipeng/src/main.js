// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Routes from './router';



Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

Vue.config.productionTip = false;
//导入vue-router
import vueRouter from 'vue-router';

Vue.use(vueRouter);
// 引入上下轮播插件
import scroll from 'vue-seamless-scroll';
Vue.use(scroll);

//引入ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
Vue.use(ElementUI);

// 创建路由
const router=new vueRouter({
	linkActiveClass:'mui-active',
	routes: Routes,
	mode: 'history'
})
// 发送 ajax请求
import axios from 'axios';
axios.defaults.baseURL = 'http://cs.yeshitou.com';//这里写上自己的基础url，例如www.csdn.com
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
import qs from 'qs';
Vue.prototype.qs = qs;


//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});
 
//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
//注册mint-ui
import 'mint-ui/lib/style.min.css';
import mintui from 'mint-ui';
Vue.use(mintui);

//注册mui
import '../static/mui/css/mui.css';

//导入一个当前系统的全局基本样式
import '../static/css/global.css';

//将vue-resource在vue中绑定
import vueResource from 'vue-resource';
Vue.use(vueResource);

//定义一个全局过滤器实心日期的格式化
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring);
});

//使用图片预览组件vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//引入lib-flexible
import 'lib-flexible';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
