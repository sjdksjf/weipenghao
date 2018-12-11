<template>
   <div id="qrcode-box">
    <!-- 头部部分  -->
      <div class="qrcode-title">
          <router-link to="/home">
              <span><</span>
          </router-link>
          <h5>推广二维码</h5>
      </div>
     <!-- 图片部分  -->  
      <div class="qrcode-foot">
           <img class="qrcode-Img1" src="http://qn.hangjie888.com/qr3.png">
           <div class="qrcode-middle">
               <img src="http://qn.hangjie888.com/code_1.png">
           </div>
           <ul class="qrcode-num">
               <li>
                   <p class="p1">{{num1}}</p>
                  <!--  <p class="p2">zero</p> -->
               </li>
               <li>
                   <p class="p1">{{num2}}</p>
                 <!--   <p class="p2">zero</p> -->
               </li>
               <li>
                   <p class="p1">{{num3}}</p>
                  <!--  <p class="p2">zero</p> -->
               </li>
               <li>
                   <p class="p1">{{num4}}</p>
                 <!--   <p class="p2">zero</p> -->
               </li>
               <li>
                   <p class="p1">{{num5}}</p>
                  <!--  <p class="p2">zero</p> -->
               </li>
               <li>
                   <p class="p1">{{num6}}</p>
                 <!--   <p class="p2">zero</p> -->
               </li>
           </ul>
      </div>
   </div>
</template>    
<script>
import axios from 'axios';
export default {
  name: 'releasetask-center',
  data () {
    return {
         num1:'',
         num2:'', 
         num3:'', 
         num4:'', 
         num5:'', 
         num6:'' 
    }
  },
  created() {
    this.getCookie();
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
             that.Submit_release(arr2[1]);
          }else if(arr2[0]=='userPwd'){
              that.getetle(arr2[1])  
            }
         
         
        }
      }
    },
    //判断是否ref tookin过期
    getetle: function(tookin){
         var  that = this;
         console.log("Mytookin",tookin)  
         if(!tookin){
            that.$router.push('/login')
         } 
    },
   totalprice: function(){
        this.userpay_price = this.single_price*this.release_num
   },
   Submit_release:function(arr){
           var that = this;
           var url = '/v1/user/user_core?access_token='+arr;
           axios.get(url)
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
               console.log("rr",error.data) 
             if(error.data.code == 200){
                 //console.log("cc",error.data.data);
                 that.num1 = error.data.data.num6;
                 that.num2 = error.data.data.num5;
                 that.num3 = error.data.data.num4;
                 that.num4 = error.data.data.num3;
                 that.num5 = error.data.data.num2;
                 that.num6 = error.data.data.num1;
                   if(error.data.code == 40000){
                      axios.get('http://cs.yeshitou.com/v1/user/access_token').then(function(response){
                               console.log("aa",response);//请求正确时执行的代码
                            }).catch(function (response){

                              that.Submit_release()
                              
                            });
                  }
                // that.$router.push('/taskCenter/taskCenterinfo')
              }else{
                 alert(error.data.msg)
              }
             
          });
    },
    
  }
}
</script>

<style>
   /*头部样式*/
   .qrcode-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .qrcode-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .qrcode-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*图片部分样式*/
  .qrcode-foot{
      margin-top: 88px;
      height: 1244px;
      width: 100%;
      background-color: #ffefda;
  }
   .qrcode-foot .qrcode-Img1{
      height: 1174px;
      width: 100%;
   } 
  .qrcode-foot .qrcode-middle{
      height: 120px;
      width: 100%;
      text-align: center;
      position: fixed;
      top: 650px;
  }
  .qrcode-foot .qrcode-middle img{
      height: 230px;
  }
  /*二维码数字*/
  .qrcode-num{
    height: 100px;
    width: 600px;
    position: fixed;
    bottom: 100px;
    left: 50%;
    margin-left: -300px;
  }
  .qrcode-num li{
    height: 80px;
    width: 80px;
    background-color: red;
    float: right;
    margin-left: 20px;
    border-radius: 8%;
  }
   .qrcode-num li .p1{
     height: 30px;
     width: 80px;
     font-size: 40px;
     color: white;
     text-align: center;
     margin-top: 20px;
     margin-bottom: 0px;
   }
    .qrcode-num li .p2{
     height: 30px;
     width: 80px;
     font-size: 14px;
     color: rgba(0,0,0,1);
     text-align: center;
     margin-bottom: 10px;
   }
</style>