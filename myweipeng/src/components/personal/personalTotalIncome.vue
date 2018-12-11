<template>
   <div id="personalTotalIncome-box">
    <!-- 头部部分  -->
      <div class="personalTotalIncome-title">
          <router-link to="/personal/personalhome">
              <span><</span>
          </router-link>
          <h5>总收入</h5>
      </div> 
     <!-- 图形部分  --> 
     <div class="center">
         
     </div>
     <!-- 更新团队信息部分  -->
     <ul class="personalTotalIncome-foot">
            <li>     
                <img src="http://qn.hangjie888.com/2.png">
                <span class="personalTotalIncome-foot-words">收入</span>
                <span class="personalTotalIncome-foot-center">
                   56.2%
                </span>
                <span class="personalTotalIncome-foot-icon">156.00</span>
            </li>
            <li>
                <img src="http://qn.hangjie888.com/5.png">
                <span class="personalTotalIncome-foot-words">任务</span>
                <span class="personalTotalIncome-foot-center">
                   56.2%
                </span>
                <span class="personalTotalIncome-foot-icon">156.00</span>
            </li>
            <li>        
                <img src="http://qn.hangjie888.com/16.png">
                <span class="personalTotalIncome-foot-words">分佣</span>
                <span class="personalTotalIncome-foot-center">
                   56.2%
                </span>
                <span class="personalTotalIncome-foot-icon">156.00</span> 
            </li>
     </ul> 
  </div>
</template>

<script>
  /*
  import Vue from 'vue';
  import { Toast, Swipe, SwipeItem } from 'mint-ui';

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  */

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalTotalIncome-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalTotalIncome-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalTotalIncome-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  /*图形部分*/
  .center{
    height: 580px;
    width: 100%;
    background-color: white;
    margin-top: 108px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
  /*更新团队信息部分*/
  .personalTotalIncome-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 100px;
  }
  .personalTotalIncome-foot li{
    height: 100px;
    width: 100%;
    line-height: 100px;
    background-color: white;
    list-style: none;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
  }
  
  .personalTotalIncome-foot li img{
     height:50px; 
     margin-top: 20px;
     margin-left: 30px;
     float: left; 
  }
  .personalTotalIncome-foot-words{
     font-size: 30px;
     float: left;
     margin-left: 20px;
     color: #888;
  }
  .personalTotalIncome-foot-center{
     font-size: 30px;
     float: left;
     margin-left: 200px;
     color: #888;
  }
  .personalTotalIncome-foot-icon{
     font-size: 26px;
     float: right;
     margin-right: 30px;
     color: #888;
  }
</style>