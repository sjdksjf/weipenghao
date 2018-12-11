<template>
   <div id="allies-box">
    <!-- 头部部分  -->
      <div class="allies-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>盟主</h5>
      </div>
      <div class="allies-foot">
           <img src="http://qn.hangjie888.com/mz1.png">
      </div>
   </div>
</template>    
<script>
 
</script>

<style>
   /*头部样式*/
   .allies-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .allies-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .allies-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .allies-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .allies-foot img{
      height: 100%;
      width: 100%;
   }
</style>