<template>
   <div id="activeCenterinfo-box">
    <!-- 头部部分  -->
      <div class="activeCenterinfo-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>活动详情</h5>
      </div>
     <!-- 图片部分  -->  
      <div class="activeCenterinfo-foot">
           <img class="activeCenterinfo-Img1" src="http://qn.hangjie888.com/h5.png">
      </div>
     <!-- 产品介绍部分  --> 
     <ul class="activeCenterinfo-price">
         <li>
            <p>活动名称 <span class="stl1">活动时间</span></p>
         </li> 
         <li>
            <p>活动详情</p>
         </li> 
         
     </ul>
     <!-- 个人信息购买会员按钮  --> 
     <div class="activeCenterinfo-renter">
         <div class="activeCenterinfo-buy" id="activeCenterinfo-buy">
              <button id="activeCenterinfo-buy-btn" @click="substrict" type="button" class="mui-btn mui-btn-danger">领取</button>
         </div>
     </div>  
   </div>
</template>    
<script>
  import { Toast } from 'mint-ui';

  export default {
    name: 'activeCenterinfo-buy',
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getnewslist();
    },
    methods: {
      getnewslist() {
        var url='../../static/json/newslist.json';
        this.$http.get(url).then(function(response){
          var data = response.body;
          if(data.status != 0){
            Toast(data.message);
            return;
          }
          this.list = data.message;
        })
      },
      substrict() {
         alert('数据传入后台')
         /*
         var activeCenterinfoBuy = document.getElementById('activeCenterinfo-buy');
         activeCenterinfoBuy.style.display ="none";
         */
      }
    }
  }
 
</script>

<style >
   /*头部样式*/
   .activeCenterinfo-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .activeCenterinfo-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .activeCenterinfo-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*图片部分样式*/
  .activeCenterinfo-foot{
      height: 380px;
      width: 100%;
      margin-top: 88px;
  }
   .activeCenterinfo-foot .activeCenterinfo-Img1{
      height:100%;
      width: 100%;
   } 
  /*产品介绍部分样式*/
  .activeCenterinfo-price{
    height: 180px;
    width: 100%;
    background-color: white;
    margin-top: 0px;
  }
  .activeCenterinfo-price li .stl1{
    float: right;
  }
  .activeCenterinfo-price li{
    float: left;
    width: 90%;
    line-height: 60px;
    margin-left: 20px;
  }
  .activeCenterinfo-price li p{
    height: 50px;
    line-height: 50px;
    font-size: 32px;
    color: #000;
  }
   /*个人信息领取按钮样式*/
   .activeCenterinfo-renter{
     height:686px;
     width: 100%;
     background-color: white;
     position: relative;
     margin-top: -25px;
   }

  .mui-input-row .activeCenterinfo-renter1{
     width: 20%;
     font-size: 30px;
   }
  .mui-input-row .mui-input-clear{
     float: left;
     font-size: 28px;
     width: 70%;
   }
   .activeCenterinfo-buy{
     height: 120px;
     width: 150px;
     text-align: center;
     line-height: 120px;
     position: absolute;
     bottom: 20px;
     right: 10px;
   } 
   #activeCenterinfo-buy-btn{
     height: 60px;
     line-height: 30px;
     width: 90%;
     font-size: 30px;
   }
</style>