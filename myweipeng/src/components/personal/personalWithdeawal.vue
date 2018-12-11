<template>
   <div id="personalWithdeawal-box">
        <!-- 头部部分  -->
        <div class="personalWithdeawal-title">
            <router-link to="/personal/personalhome">
              <span><</span>
            </router-link>
            <h5>提现</h5>
        </div> 

        <!-- 资料展示部分  -->
       <ul class="personalWithdeawal-foot">
             <li class="line">
                <span class="personalWithdeawal-foot-words">
                   提现账户：
                </span>  
                <input type="number" class="mui-input-clear" v-model="alipayname"  :placeholder="alipay.alipayname">
            </li>
            <li class="line">
                <span class="personalWithdeawal-foot-words">
                   总金额：
                </span>  
                <input type="text" :disabled="true" class="mui-input-clear" v-model="user_money"  :placeholder="alipay.user_money">
            </li>
            <li class="line">
                <span class="personalWithdeawal-foot-words">
                   提现金额：
                </span>
                <input type="text" class="mui-input-clear" v-model="cashAmount"  placeholder="">
            </li>
            <li class="foot">
                <p class="personalWithdeawal-foot-words3">
                    <span></span>预计两小时后到账，请耐心等待
                </p>
            </li>
       </ul>
      <!-- 绑定按钮 -->
      <div class="reglogsit">
         <button class="reg" v-on:click="cash_amount">提现</button>
       
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
        alipayname:'',
        user_money:'',
        phonenumber: '',
        cashAmount: '',
        invitation: '',
        deawal_cookie:'',
        alipay:[]
      }
    },
    created() {
      this.getCookie();
      this.center_alipay();
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
               that.withde_cookie(arr2[1]);
            }else if(arr2[0]=='userPwd'){
                that.getetle(arr2[1])  
              }
           
           
          }
        }
      },
      //判断是否ref tookin过期
      getetle: function(tookin){
           var  that = this; 
           if(!tookin){
              that.$router.push('/login')
           } 
      },
      //存cookie
      withde_cookie(arr){
          console.log("arr",arr)
          this.deawal_cookie = arr;
      },
      center_alipay(){
        var that = this;
        var arr1 = this.deawal_cookie;
        console.log("arr1",arr1)
        var url = '/v1/user/user_withdrawal?access_token='+arr1;
         axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         //console.log("bb",response.data.data);//发生错误时执行的代码
           that.alipay = response.data.data;
           
        });
      },
      cash_amount() {
         var arr3 = this.deawal_cookie;
         var url = '/v1/user/ajax_withdrawal?access_token='+arr3;
         var that = this;
         if(!that.alipayname){
             alert("请输入提现账号")
         }else{
              axios.post(url, {
                      alipayname: that.alipayname,
                      price:that.cashAmount
            })
            .then(function (response) {
              console.log("aa",response);
            })
            .catch(function (error) {
                //console.log("cc",error);
                if(error.data.code == 200 ){
                   alert("提现成功")
                }else{
                   alert(error.data.msg)
                }
               
            });
         }
      
      }
    }
 }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalWithdeawal-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalWithdeawal-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalWithdeawal-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

 /*任务跳转部分*/
  .personalWithdeawal-foot{
    height: 600px;
    width: 96%;
    margin: 108px auto;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.4);
    border-radius: 15px;
  }
  .personalWithdeawal-foot li{
    height: 160px;
    width: 96%;
    margin: 0 auto;
    background-color: white;
    list-style: none;
    margin-top: 3px;
  }
  .personalWithdeawal-foot .line{
    border-bottom: 2px solid rgba(0,0,0,0.2);
  }
  .personalWithdeawal-foot .foot{
    height: 100px;
  }
  .personalWithdeawal-foot li .personalWithdeawal-foot-words{
    font-size: 30px;
    float: left;
    margin-left: 28px;
    color: #555;
    height: 80px;
    width: 100%;
    line-height: 80px;
  }
  
  .personalWithdeawal-foot li .personalWithdeawal-foot-words3{
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
  .personalWithdeawal-foot-words3 span{
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