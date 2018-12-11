<template>
   <div id="fruitArea-box">
    <!-- 头部部分  -->
      <div class="fruitArea-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>水果专区</h5>
      </div>
      <div class="fruitArea-foot">
           <img src="http://qn.hangjie888.com/mz1.png">
      </div>
   </div>
</template>    
<script>
 
</script>

<style>
   /*头部样式*/
   .fruitArea-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .fruitArea-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .fruitArea-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .fruitArea-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .fruitArea-foot img{
      height: 100%;
      width: 100%;
   }
</style>