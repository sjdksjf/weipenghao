<template>
   <div id="member-box">
    <!-- 头部部分  -->
      <div class="member-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>微朋会员</h5>
      </div>
     <!-- 图片部分  -->  
      <div class="member-foot">
           <img class="member-Img1" src="http://qn.hangjie888.com/h5.png">
      </div>
     <!-- 会员价格部分  --> 
     <div class="member-price">
       <ul>
           <li>
              <button type="button" class="mui-btn mui-btn-danger" v-bind:class='{ selection:indexs ==current }' v-on:click="addClass(indexs)" >普通VIP</button>
              <span>${{ memberObj.ordinaryvip }}</span>
           </li> 
           <li>
              <button type="button" class="mui-btn mui-btn-danger" v-bind:class='{ Zselection:indexs ==currentr }' v-on:click="ZaddClass(indexs)">钻石VIP</button>
              <span>${{ memberObj.seniorvip }}</span>
           </li> 
       </ul>
     </div>  
     <!-- 购买会员按钮  --> 
     <div class="member-buy" id="member-buy">
          <button id="member-buy-btn" @click="actionSheet" type="button" class="mui-btn mui-btn-danger">购买</button>
     </div>
     <!-- 底部支付页面 -->
     <div class="memberMask">
             <mt-actionsheet
                :actions="datas"
                v-model="sheetVisible">
            </mt-actionsheet>
     </div> 
   </div>
</template>    
<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    name: 'member-buy',
    data() {
      return {
        datas: [
                    {
                    name: '微信支付', 
                    method : this.getWechat  // 调用methods中的函数
                  },
                 {
                    name: '支付宝支付', 
                    method : this.getAlipay  // 调用methods中的函数
                  }
             ],
              // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,
        current:0,
        currentr:2,
        indexs:1,
        list: [],
        mem_cookie:'',
        memberObj: ''
      }
    },
    created() {
      this.getCookie();
      this.getnewslist();
    },
    methods: {
       //读取cookie
      getCookie:function () {
        var that = this;
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
             
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
           // console.log("dd",arr2)
            if(arr2[0]=='userName'){
              // console.log("cc",arr2[1])
               that.myMember_cookie(arr2[1]);
            }else if(arr2[0]=='userPwd'){
                that.getetle(arr2[1])  
              }
           
           
          }
        }
      },
      myMember_cookie(arr){
          this.mem_cookie = arr;
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
         axios.get('/v1/home/vip_money').then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
           that.memberObj = response.data.data;
            console.log("uu",that.memberObj);
        });
       /* var url='../../static/json/newslist.json';
        this.$http.get(url).then(function(response){
          var data = response.body;
          if(data.status != 0){
            Toast(data.message);
            return;
          }
          this.list = data.message;
        })*/
      },
      substrict() {
         alert('支付接口页面')
         /*
         var memberBuy = document.getElementById('member-buy');
         memberBuy.style.display ="none";
         */
      },
      actionSheet: function(){
        var that = this;
        var arr1 = this.mem_cookie;
        if(this.currentr == 1){
               axios.post('/v1/user/member_order', {
                       access_token:arr1,
                       lever:3,
                       price: 80
                    }).then(resp => {
                        if (resp.data.success) {
                            console.log(resp)
                        }
                    }).catch(function (error) {
                        if(error.data.code == 200){
                             console.log("qq",error.data.data.mem_order_sn);
                             var order = error.data.data.mem_order_sn; 
                             that.sheetVisible = true; 
                             that.getWechat(order) 
                         }
                    });
         }
        if(this.current == 1){
                 axios.post('/v1/user/member_order', {
                         access_token:arr1,
                         lever:2,
                         price: 50
                      }).then(resp => {
                          if (resp.data.success) {
                             console.log(resp)
                          }
                      }).catch(function (error) {
                     console.log("ww ",error.data);
                     
                    });
           }   
        // 打开action sheet
         this.sheetVisible = true;
      },
      getWechat: function(order){
        console.log("订单号",order)
         if(this.currentr == 1){
                 axios.post('/v1/user/pay_type', {
                         order:order,
                         type:3
                      }).then(resp => {
                          if (resp.data.success) {
                             console.log(resp)
                          }
                      }).catch(function (error) {
                     console.log("钻石Wechat",error.data);
                     
                    });
         }; 
         if(this.current == 1){
                 axios.post('/v1/user/pay_type', {
                         order:order,
                         type:3
                      }).then(resp => {
                          if (resp.data.success) {
                             console.log(resp)
                          }
                      }).catch(function (error) {
                     console.log("黄金Wechat",error.data);
                     
                    });
         } 
       },
       getAlipay: function(order){
        console.log("订单号",order)
         if(this.currentr == 1){
                 axios.post('/v1/user/pay_type', {
                         order:order,
                         type:1
                      }).then(resp => {
                          if (resp.data.success) {
                             console.log(resp)
                          }
                      }).catch(function (error) {
                     console.log("钻石Alipay",error.data);
                     
                    });
         }; 
         if(this.current == 1){
                 axios.post('/v1/user/pay_type', {
                         order:order,
                         type:1
                      }).then(resp => {
                          if (resp.data.success) {
                             console.log(resp)
                          }
                      }).catch(function (error) {
                     console.log("普通Alipay",error.data);
                     
                    });
         } 
      },
      ZaddClass: function(indexs){
          this.currentr = indexs;
          this.current = 5;
      },
      addClass: function(indexs){
         this.current = indexs;
         this.currentr = 5;
      }
    }
  }
 
</script>

<style>
   /*头部样式*/
   .member-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .member-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .member-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*图片部分样式*/
  .member-foot{
      height: 380px;
      width: 100%;
      margin-top: 88px;
  }
   .member-foot .member-Img1{
      height:100%;
      width: 100%;
   } 
  /*会员价格部分样式*/
  .member-price{
    height: 100px;
    width: 100%;
    background-color: white;
    position: relative;
  }
  .member-price ul{
    height: 80px;
    width: 100%;
    position: absolute;
    top: 10px;
  }
  .member-price li{
    float: left;
    width: 45%;
    line-height: 80px;
    margin-left: 20px;
  }
   .member-price li span{
    margin-left: 50px;
    color: red;
   }
   /*购买会员按钮样式*/
   .member-buy{
     height: 120px;
     width: 100%;
     text-align: center;
     line-height: 80px;
     margin-top: 120px;
   } 
   #member-buy-btn{
     height: 80px;
     width: 80%;
     font-size: 30px;
     background-color: red;
   }
   /*选择按钮*/
   .Zselection{
      background-color: blue !important;
   }
   .selection{
      background-color: blue !important;

   }
</style>