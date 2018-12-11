<template>
   <div id="customerService-box">
        <!-- 头部部分  -->
        <div class="customerService-title">
            <router-link to="/home">
              <span><</span>
            </router-link>
            <h5>客服中心</h5>
        </div> 
        <!-- 资料展示部分  --> 
       <ul class="customerService-center">
            <li id="li1">        
                <span class="customerService-center-words">
                    手机：13335458645
                </span>
            </li>
            <li id="li2">
                <span class="customerService-center-words">
                    微信：3213131313
                </span>
            </li>
       </ul>
        <!-- 底部发送部分  --> 
        <div class="customerService-foot">
             <input name=""> <button>发送</button>
        </div>
  </div>
</template>

<script>
  

</script>

<style lang="css" scoped>
   /*头部样式*/
   .customerService-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .customerService-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .customerService-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  /*资料展示部分样式*/
  .customerService-center{
    height: 1100px;
    width: 100%;
    margin: 0 auto;
    margin-top: 110px;
    background-color: white;
    box-sizing: border-box;
    position: relative;
  }
  .customerService-center #li1{
    position: absolute;
    top: 20px;
    left: 5%;
  }
  .customerService-center #li2{
    position: absolute;
    top: 130px;
    left: 5%;
  }
  .customerService-center li{
    height: 90px;
    width: 90%;
    margin: 20px auto;
    line-height: 90px;
    background-color: white;
    list-style: none;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
 
  .customerService-center-words{
     font-size: 30px;
     float: left;
     margin-left: 28px;
     color: #000;
  }
  /*底部发送样式*/
  .customerService-foot{
    height: 100px;
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  .customerService-foot input{
    height: 80px;
    width: 75%;
    margin-left: 20px;
    margin-top: 10px;

  }
  .customerService-foot button{
    height: 80px;
    width: 120px;
    margin-top: 10px;
    margin-left: 20px;
    background-color: #888;
    color: white;
  }
</style>