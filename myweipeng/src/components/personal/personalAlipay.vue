<template>
   <div id="personalAlipay-box">
        <!-- 头部部分  -->
        <div class="personalAlipay-title">
            <router-link to="/home">
              <span><</span>
            </router-link>
            <h5>绑定支付宝</h5>
        </div> 
        <!-- 资料展示部分  -->
       <ul class="personalAlipay-foot">
            <li class="line">
                <span class="personalAlipay-foot-words">
                   输入您的姓名：
                </span>  
                <input type="text" class="mui-input-clear" v-model="phonenumber"  :placeholder="alipay.truename">
            </li>
            <li class="line">
                <span class="personalAlipay-foot-words">
                   输入支付宝账号：
                </span>
                <input type="text" class="mui-input-clear" v-model="shortmessage"  :placeholder="alipay.alipayname">
            </li>
            <li class="foot">
                <p class="personalAlipay-foot-words3">
                    <span></span>谨慎输入支付宝账号，财产丢失概不负责
                </p>
            </li>
       </ul>
      <!-- 绑定按钮 -->
      <div class="reglogsit">
         <button class="reg" v-on:click="apyregister">绑定</button>
       
      </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default{
    name: 'getback',
    data () {
      return {
        phonenumber: '',
        shortmessage: '',
        invitation: '',
        alipay_cookie:'',
        alipay:[]
      }
    },
    created() {
      this.getCookie();
      this.center_alipay();
    },
    methods: {
       //读取cookie
      getCookie:function () {
        var that = this;
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          //console.log("aa",arr)
          //var str = arr[1].slice(8);
          //console.log(str)
          //this.home_text(str)   
          
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
           // console.log("dd",arr2)
            if(arr2[0]=='userName'){
              // console.log("cc",arr2[1])
              
               that.appley_cookie(arr2[1]); 
            }else if(arr2[0]=='userPwd'){
                that.getetle(arr2[1])  
              }
           
           
          }
        }
      },
      appley_cookie(arr){
          this.alipay_cookie = arr;
      },
      //判断是否ref tookin过期
      getetle: function(tookin){
           var  that = this;
           console.log("Mytookin",tookin)  
           if(!tookin){
              that.$router.push('/login')
           } 
      },
      center_alipay(){
        var arr1 = this.alipay_cookie;
        var that = this;
        var url = '/v1/user/my_alipay?access_token='+arr1;
         axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
           that.alipay = response.data.data;
           
        });
      },
      apyregister() {
        var arr3 = this.alipay_cookie;
        var url = '/v1/user/bangalipay?access_token='+arr3;
        if(this.phonenumber == "" && this.shortmessage == "" ){
          Toast({
              message: '请输入姓名',
              position: 'bottom',
              duration: 3000
          })
        } else if(this.shortmessage == "") {
          Toast({
              message: '请输入支付宝账号',
              position: 'bottom',
              duration: 3000
          })
        } else {
          Toast({
            message: '注册成功',
            position: 'bottom',
            duration: 3000
          })
        }
        var that = this;
         axios.post(url,{
                      truename: this.phonenumber,
                      alipayname:this.shortmessage
          })
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
              //console.log("bb",error.data.code);
              if(error.data.code == 200 ){
                 alert("绑定成功")
              }else{
                 alert("绑定失败")
              }
             
          });


      }
    }
 }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalAlipay-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalAlipay-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalAlipay-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

 /*任务跳转部分*/
  .personalAlipay-foot{
    height: 430px;
    width: 96%;
    margin: 108px auto;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.4);
    border-radius: 15px;
  }
  .personalAlipay-foot li{
    height: 160px;
    width: 96%;
    margin: 0 auto;
    background-color: white;
    list-style: none;
    margin-top: 3px;
  }
  .personalAlipay-foot .line{
    border-bottom: 2px solid rgba(0,0,0,0.2);
  }
  .personalAlipay-foot .foot{
    height: 100px;
  }
  .personalAlipay-foot li .personalAlipay-foot-words{
    font-size: 30px;
    float: left;
    margin-left: 28px;
    color: #555;
    height: 80px;
    width: 100%;
    line-height: 80px;
  }
  
  .personalAlipay-foot li .personalAlipay-foot-words3{
    font-size: 26px;
    float: left;
    margin-left: 28px;
    margin-top: 20px;
    color: #444;
    height: 30px;
    width: 100%;
    line-height: 30px;
    margin-left: 20px;
  }
  .personalAlipay-foot-words3 span{
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right: 15px;
    background-color: red;
    border-radius: 50%;
  }
  /*绑定按钮*/
  .reglogsit{
    padding: 0 28px 0 28px;
    margin-bottom: 60px;
  }
  .reglogsit .reg{
    width: 100%;
    height: 90px;
    margin-top: 100px;
    background: -moz-linear-gradient(left, #e4423c, #c53e3e);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#e4423c),to(#c53e3e));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #e4423c, #c53e3e);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #e4423c, #c53e3e);
    /* default */
    background: linear-gradient(left, #e4423c, #c53e3e);
    background-color: #e4423c;
    color: white;
    font-size: 32px;
    border: 0;
    border-radius: 10px;
  }
</style>