<template>
   <div id="activeCenterlist-box">
    <!-- 头部部分  -->
      <div class="activeCenterlist-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>活动中心</h5>
      </div>
      <!-- 个人资料部分  -->  
      <div class="activeCenterlist-head">
             <span class="activeCenterlist-head-right"> 
                <img src="http://qn.hangjie888.com/lunbo02.jpg">
             </span>
             <span class="activeCenterlist-head-left">
                  <p class="p1">又是一个晴天</p>
                  <p>会员等级</p>
             </span>
             <button>签到</button>
      </div>  
    <!-- 图文部分  -->  
      <div class="activeCenterlist-foot">
        <h6>活动</h6>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">       
                    <img src="http://qn.hangjie888.com/h2.png">
                    <div class="mui-media-body">
                        幸福
                        <p class='mui-ellipsis'>能和</p>
                    </div>
                    <a href="/activeCenter/activeCenterinfo">
                          参加
                    </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                    <img src="http://qn.hangjie888.com/h3.png">
                    <div class="mui-media-body">
                        木屋
                        <p class='mui-ellipsis'>想要</p>
                    </div>
                    <a href="/activeCenter/activeCenterinfo">
                           参加
                    </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                    <img src="http://qn.hangjie888.com/h4.png">
                    <div class="mui-media-body">
                        CBD
                        <p class='mui-ellipsis'>烤炉</p>
                    </div>
                    <a href="/activeCenter/activeCenterinfo">
                          参加
                    </a>
            </li>
        </ul>
      </div>     
   </div>
</template>    
<script>
     
</script>

<style lang="css" scoped>
   /*头部样式*/
   .activeCenterlist-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .activeCenterlist-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .activeCenterlist-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: rgba(0, 0, 0, 1);
  }
   /*个人资料样式*/
  .activeCenterlist-head{
     margin-top: 100px;
     height: 120px;
     width: 100%;
     background-color: white;
  }
  .activeCenterlist-head-left{
     height: 100px;
     width: 200px;
     float: left;
     color: #000;
     margin-left: 28px;
  }
  .activeCenterlist-head-left .p1{
    font-size: 26px;
    margin-top: 30px;
    margin-bottom: 5px;
  }
  .activeCenterlist-head-left p{
     height: 30px;
     width: 200px;
     margin-bottom: 0px;
     color: #333;
     font-size: 16px;
  }
  .activeCenterlist-head-right{
     height: 80px;
     width: 80px; 
     line-height: 80px;
     float: left;
     margin-top: 20px;
     margin-left: 20px;
  }
  .activeCenterlist-head-right img{
     height: 100%;
     width: 100%;
     border-radius: 50%;
  }
  .activeCenterlist-head button{
     height: 60px;
     width: 100px;
     margin-top: 30px;
     float: right;
     margin-right: 20px;
     background-color: red;
     color: white;
     text-align: center;
     border-radius: 10%;
  }
  /*图文部分样式*/
  .activeCenterlist-foot{
    margin-top: -10px;
    height: 1120px;
    width: 100%;
    background-color: white;
  }
  #activeCenterlist-box h6{
     height: 50px;
     width: 100%;
     line-height: 50px;
     font-size: 36px;
     color: #000;
     margin-left: 20px;
  }
  .mui-media{
    height: 300px;
    width: 30%;
    float: left;
    background-color: white;
    margin-left:2%; 
    position: relative;
    box-shadow: 0 0 1px #333;
  }
  
  .mui-media img{
    height: 110px;
    width: 100%;
  }
  .mui-media .mui-media-body{
    font-size: 28px;
  }
  .mui-media .mui-ellipsis{
    font-size: 20px;
  }
  .mui-media a{
    width: 110px;
    height: 40px;
    line-height: 10px;
    font-size: 14px;
    color: white !important;
    float: right;
    border-radius: 10px;
    background-color: red;
    text-align: center;
    position: absolute;
    top: 90%;
    right: 18%;
  }
 
</style>