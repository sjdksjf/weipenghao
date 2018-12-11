<template>
   <div id="cheap-box">
    <!-- 头部部分  -->
      <div class="cheap-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>物美价廉</h5>
      </div>
      <div class="cheap-foot">
           <img src="http://qn.hangjie888.com/mz1.png">
      </div>
   </div>
</template>    
<script>
 
</script>

<style>
   /*头部样式*/
   .cheap-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .cheap-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .cheap-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .cheap-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .cheap-foot img{
      height: 100%;
      width: 100%;
   }
</style>