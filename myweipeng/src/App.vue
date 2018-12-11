<template>
  <div id="app">
    <img class="App_bjt" v-if="seen" src="http://qn.hangjie888.com/mylogo.png">
    <!--利用mint-ui中的header组件实现整个系统的头部-->
     <!--
    <mt-header fixed title="微朋天下"></mt-header>
     -->
    <!--路由占位符-->
    
   <!--  <router-view></router-view> -->
         <!-- <Home /> -->
                                      
         <!--  <Login/> -->
    <!--利用mui中的tabbar组件实现系统的底部-->
       <!--  <nav class="mui-bar mui-bar-tab">
          <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link class="mui-tab-item" to="/user">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
          </router-link>
          <router-link class="mui-tab-item" to="/shopcar">
            <span class="mui-icon mui-icon-locked"><span id="badge" class="mui-badge">0</span></span>
            <span class="mui-tab-label">购物车</span>
          </router-link>
          <router-link class="mui-tab-item" to="/">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
          </router-link>
          <router-link class="mui-tab-item" to="/login">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">登录</span>
          </router-link>
        </nav> -->


        <!--  <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">去首页</span>
         </router-link> -->
        <!--  <router-link class="mui-tab-item" to="/">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">去登录页</span>
         </router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import Home from './components/Home';
import Login from './components/login/login.vue';
import Car from './components/shopcar/car';
import { vm, COUNTSTR } from './kits/vm.js';


vm.$on(COUNTSTR, function(count){
  var badgeobj = document.querySelector('#badge');
  badgeobj.innerText = parseInt(badgeobj.innerText) + count;
});


export default {
  name: 'App',
  components: {
    Home,Car,Login
  },
  data: function (){
　　return {
　　　　timer: null,
       seen:true
　　}
  },
  created() {
      this.setTimer();
  },
  methods: {
    setTimer: function(){
       var that = this;
      　this.timer = setInterval( () => {
              that.$router.push('/login');
              that.seen = false;
　　　　　　　 console.log('mahello');
            clearInterval(that.timer)
　　　　　　}, 2000)
       
    },
    tip: function(){
      Toast('hello');
    }
  }

}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
#app .App_bjt{
   width: 100%;
   height: 100%;
   background-repeat: no-repeat;
}
/*头部样式*/
.title-weipeng{
   height: 80px;
   width: 100%;
   line-height: 80px;
   font-size: 33px;
   position: fixed;
   top: -10px;
   background-color: #fff;
}
.title-weipeng span{
   height: 80px;
   width: 300px;
   margin-left: 20px;
} 

button{
  cursor: pointer;
}

</style>
