<template>
	<div id="registers">
    <!-- 注册界面头部 -->
	    <mt-header fixed title="修改手机号">
	      <router-link to="./personalData" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>  
	    </mt-header>
    <!-- 注册账号所需的信息 -->
	    <div class="account">
	      <div>
	        <label>手机号码</label>
	        <input type="text" placeholder="请输入手机号码" v-model="phonenumber">
	      </div>
	      <div class="captch">
	        <label>短信验证</label>
	        <input type="password" placeholder="请输入验证码" v-model="shortmessage">
          <button v-on:click="registCode">获取验证码</button>
	       </div>
	    </div>
    
      <!-- 提交按钮 -->
      <div class="reglog">
	       <button class="reg" v-on:click="registers">提交</button>
	     
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
        phone_cookie:''
			}
		},
		created() {
			 this.getCookie();
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
               that.myPhone_cookie(arr2[1]);
            }else if(arr2[0]=='userPwd'){
                that.getetle(arr2[1])  
              }
           
           
          }
        }
      },
      myPhone_cookie(arr){
          this.phone_cookie = arr;
      },
      //判断是否ref tookin过期
      getetle: function(tookin){
           var  that = this;
           console.log("Mytookin",tookin)  
           if(!tookin){
              that.$router.push('/login')
           } 
      },
      registCode(){
               var that =this;
               var url = '/v1/user/send_sms';
               axios.post(url, {
                       mobile: this.phonenumber
                       
                  })
                  .then(function (response) {
                    console.log("aa",response);
                  })
                  .catch(function (error) {
                      if(error.data.code == 200){
                        alert(error.data.msg);
                        // that.$router.push('/taskCenter/taskCenterinfo')
                      }else{
                         alert(error.data.msg)
                      }
                     
                  });
      },
			registers() {
          var arr1 =this.phone_cookie;
          var url = '/v1/user/ajax_edit_mobile?access_token='+arr1;
          axios.post(url, {
                       mobile: this.phonenumber,
                       code :this.shortmessage
                  })
                  .then(function (response) {
                    console.log("aa",response);
                  })
                  .catch(function (error) {
                      if(error.data.code == 200){
                        alert(error.data.msg);
                        // that.$router.push('/taskCenter/taskCenterinfo')
                      }else{
                         alert(error.data.msg)
                      }
                     
                  });
        if(this.phonenumber == "" && this.shortmessage == "" ){
          Toast({
              message: '请输入手机号',
              position: 'bottom',
              duration: 3000
          })
        } else if(this.shortmessage == "") {
          Toast({
              message: '请输入验证码',
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
      }
	  }
 }
</script>

<style scoped>
  body{
    background: #f2f2f2;
  }
  /*登录界面的头部*/
  .mint-header {
    height: 96px;
    background: -moz-linear-gradient(left, #007aff, #8a6de9);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#007aff),to(#8a6de9));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #007aff, #8a6de9);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #007aff, #8a6de9);
    /* default */
    background: linear-gradient(left, #007aff, #8a6de9);
    background-color: #007aff;
    font-size: 32px;
  }
  /*登录的账号与密码*/
  .account {
    margin-top: 136px;
    margin-bottom: 40px;
  }
  .account div{
    position: relative;
    padding: 12px 0 12px 170px;
    background: #fff; 
    border-bottom: 1px solid #d6d6d6;
  }
  .account label{
    position: absolute;
    left: 30px;
    top: 18px;
    font-size: 26px;
  }
  .account input{
    /*color: #ccc;*/
    padding: 0 0 0 20px;
    margin-bottom: 0;
    height: 56px;
    font-size: 24px;
    color: #333;
    border: 0;
    border-left: 2px solid #d6d6d6;
  }
  .account button{
    position: absolute;
    top: 14px;
    right: 26px;
    background: #ff1b45;
    color: white;
    border: 0;
  }
  .account .captch{
    position: relative;
    padding-right: 320px;
  }
  /*提交*/
  .reglog{
    padding: 0 28px 0 28px;
    margin-bottom: 60px;
  }
  .reglog .reg{
    width: 100%;
    height: 90px;
    margin-top: 300px;
    background: -moz-linear-gradient(left, #8a6de9, #0062cc);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#8a6de9),to(#0062cc));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #8a6de9, #0062cc);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #8a6de9, #0062cc);
    /* default */
    background: linear-gradient(left, #8a6de9, #0062cc);
    background-color: #8a6de9;
    color: white;
    font-size: 32px;
    border: 0;
    border-radius: 10px;
  }
 
 
</style>