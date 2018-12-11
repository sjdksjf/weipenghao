<template>
   <div id="receiveinfo-box">
    <!-- 头部部分  -->
      <div class="receiveinfo-title">
          <router-link to="/home">
              <span><</span>
          </router-link>
          <h5>免费领取</h5>
      </div>
     <!-- 图片部分  -->  
      <div class="receiveinfo-foot">
           <img class="receiveinfo-Img1" :src="obj_receibe.original_img">
      </div>
     <!-- 产品介绍部分  --> 
     <ul class="receiveinfo-price">
         <li>
            <p>产品名称:{{ obj_receibe.goods_name }}</p>
         </li> 
         <li>
            <p>产品详情:{{ obj_receibe.keywords }}</p>
         </li> 
         
     </ul>
     <!-- 个人信息购买会员按钮  --> 
     <div class="receiveinfo-renter">
         <form class="mui-input-group"> 
            <div class="mui-input-row"> 
                <label class="receiveinfo-renter1">姓名：</label>
                <input type="text" class="mui-input-clear" v-model="truename" placeholder="请输入姓名">
            </div>
             <div class="mui-input-row">
                <label class="receiveinfo-renter1">电话：</label>
                <input type="text" class="mui-input-clear" v-model="mobile" placeholder="请输入电话">
            </div>
             <div class="mui-input-row">
                <label class="receiveinfo-renter1">地址：</label>
                <input type="text" class="mui-input-clear" v-model="address" placeholder="请输入详情地址">
            </div>
        </form>
         <div class="receiveinfo-buy" id="receiveinfo-buy">
              <button  class="receibe-btn" v-show="obj_receibe.is_res == 1">已领取</button>
              <button id="receiveinfo-buy-btn" v-show="obj_receibe.is_res == 0" @click="substrict" type="button" class="mui-btn mui-btn-danger">领取</button>
         </div>
     </div>  
   </div>
</template>    
<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'receiveinfo-buy',
    data() {
      return {
        list: [],
        id:0,
        truename:'',
        mobile:'',
        address:'',
        obj_receibe:'',
        receibe_cookie:''
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getCookie();
      this.getnewslist();
    },
    methods: {
      getCookie:function () {
      var that = this;
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
       
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split('=');//再次切割
         // console.log("dd",arr2)
          if(arr2[0]=='userName'){
            // console.log("cc",arr2[1])
             that.myReceibe_cookie(arr2[1]);
          }else if(arr2[0]=='userPwd'){
              that.getetle(arr2[1])  
            }
         
         
        }
      }
    },
    //存cookie
    myReceibe_cookie(arr){
       this.receibe_cookie = arr;  
    },
    //判断是否ref tookin过期
    getetle: function(tookin){
         var  that = this;
         console.log("Mytookin",tookin)  
         if(!tookin){
            that.$router.push('/login')
         } 
    },
    getnewslist() {
           var that = this;
           var arr1 = this.receibe_cookie;
           var url = '/v1/goods/goods_detail?access_token='+arr1+'&goods_id='+this.id;
           axios.get(url)
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
               console.log("rr",error.data.data) 

               that.obj_receibe = error.data.data;
          
          });

    
    },
    substrict(){
              var that = this;
          
              console.log("my is",that.receibe_cookie);
              axios.post('/v1/goods/rec_goods', {
                   access_token: that.receibe_cookie,
                   goods_id: that.id,
                   truename: that.truename,
                   mobile: that.mobile,
                   address: that.address
              })
              .then(function (response) {
                console.log("aa",response);
              })
              .catch(function (error) {
                  console.log("bb",error.data);
                  if(error.data.code == 200){
                     alert(error.data.msg);
                     that.$router.push('/receive/receiveList')
                  }else{
                     alert(error.data.msg)
                  }
                 
              });
       
    }
  }
}
 
</script>

<style>
   /*头部样式*/
   .receiveinfo-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .receiveinfo-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .receiveinfo-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*图片部分样式*/
  .receiveinfo-foot{
      height: 380px;
      width: 100%;
      margin-top: 88px;
  }
   .receiveinfo-foot .receiveinfo-Img1{
      height:100%;
      width: 100%;
   } 
  /*产品介绍部分样式*/
  .receiveinfo-price{
    height: 180px;
    width: 100%;
    background-color: white;
    margin-top: 0px;
  }
  .receiveinfo-price li{
    float: left;
    width: 100%;
    line-height: 60px;
    margin-left: 20px;
  }
  .receiveinfo-price li p{
    height: 50px;
    line-height: 50px;
    font-size: 32px;
    color: #666;
  }
   /*个人信息领取按钮样式*/
   .receiveinfo-renter{
     height:660px;
     width: 100%;
     background-color: white;
     margin-top: 10px; 
     position: relative;
   }

  .mui-input-row .receiveinfo-renter1{
     width: 20%;
     font-size: 30px;
   }
  .mui-input-row .mui-input-clear{
     float: left;
     font-size: 28px;
     width: 70%;
   }
   .receiveinfo-buy{
     height: 120px;
     width: 150px;
     text-align: center;
     line-height: 120px;
     position: absolute;
     bottom: 20px;
     right: 10px;
   } 
   #receiveinfo-buy-btn{
     height: 60px;
     line-height: 30px;
     width: 90%;
     font-size: 30px;
   }
   /*领取状态*/
   .receibe-btn{
     background-color: #888;
     color: white;
   }
</style>