<template>
   <div id="exchange-box">
    <!-- 头部部分  -->
      <div class="exchange-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>积分兑换</h5>
      </div>
      <div class="exchange-foot" v-on:click="say('hi')">
          
           <img src="http://qn.hangjie888.com/mz1.png">
      </div>
   </div>
</template>    
<script>
  /*
   import Vue from 'vue';
   new Vue({
      el:'#exchange-box',
      methods: {
          say: function(msg) {
               alert(msg)
          }
      }
   })
     */
</script>

<style>
   /*头部样式*/
   .exchange-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .exchange-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .exchange-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .exchange-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .exchange-foot img{
      height: 100%;
      width: 100%;
   }
</style>