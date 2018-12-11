<template>
   <div id="disport-box">
    <!-- 头部部分  -->
      <div class="disport-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>娱乐中心</h5>
      </div>
      <div class="disport-foot">
           <img src="http://qn.hangjie888.com/mz1.png">
      </div>
   </div>
</template>    
<script>
 
</script>

<style>
   /*头部样式*/
   .disport-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .disport-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .disport-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .disport-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .disport-foot img{
      height: 100%;
      width: 100%;
   }
</style>