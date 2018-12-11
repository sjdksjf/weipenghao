<template>
	<div id="register">
    <!-- 注册界面头部 -->
    <!--
	    <mt-header fixed title="注册">
	      <router-link to="/login" slot="left">
	        <mt-button icon="back"></mt-button>
	      </router-link>  
	    </mt-header>-->
    <div class="logo">
         <img src="http://qn.hangjie888.com/logo1.png">
    </div>
    <!-- 登录和注册 -->
    <div class="login-box">
         <router-link to="/login" class="a1">登录</router-link>
         <span>|</span>
         <router-link to="/login/register" class="a2">注册</router-link>
    </div>
    <!-- 注册账号所需的信息 -->
	    <div class="account">
	      <div>
	        <label>手机号码</label>
	        <input type="text" placeholder="请输入手机号码" v-model="phonenumber">
	      </div>
	      <div class="captch">
	        <label>短信验证</label>
	        <input type="text" placeholder="请输入验证码" v-model="shortmessage">
          <button v-show="sendAuthCode" class="auth_text auth_text_blue"  @click="getAuthCode">获取验证码</button>
         <button v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒重新发送</button>
	       </div>
	       <div>
	        <label>登录密码</label>
	        <input type="password" placeholder="请输入密码,6-20个字符或数字" v-model="newpassword">
	      </div>
	      <div>
	        <label>确认密码</label>
	        <input type="password" placeholder="请再次输入密码" v-model="confirmpassword">
	      </div>
        <div>
          <label>邀请码</label>
          <input type="text" placeholder="请输入邀请码（区分大小写）" v-model="invitation">
        </div>
	    </div>
    
      <!-- 注册按钮 -->
      <div class="reglog">
	       <button class="reg" v-on:click="register">注册</button>
	     
      </div>
      
  </div>
</template>

<script>
	import { Toast } from 'mint-ui';
  import axios from 'axios';
	export default{
		name: 'register',
		data () {
			return {
				phonenumber: '',
				shortmessage: '',
				newpassword: '',
				confirmpassword: '',
        invitation: '',
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /*倒计时 计数器*/
        ruleForm: {
              userName: '', //用户名
              password: '' //密码
             }
			}
		},
		created() {
			
		},
		methods: {
        //设置cookie
        setCookie(c_name,c_pwd,exdays) {
          var exdate=new Date();//获取时间
          exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
          //字符串拼接cookie
          window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
          window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
          if (document.cookie.length>0) {
            var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
            for(var i=0;i<arr.length;i++){
              var arr2=arr[i].split('=');//再次切割
              //判断查找相对应的值
              if(arr2[0]=='userName'){
                this.ruleForm.userName=arr2[1];//保存到保存数据的地方
              }else if(arr2[0]=='userPwd'){
                this.ruleForm.password=arr2[1];
              }
            }
          }
        },
       getAuthCode:function () {
            this.sendAuthCode = false;
            this.auth_time = 60;
            var _that = this;
           
           axios.post('/v1/user/send_sms', {
                       mobile: this.phonenumber
                  
                        }).then(resp => {
                            if (resp.data.success) {
                               console.log(resp)
                            }

                        })
            var auth_timetimer =  setInterval(()=>{
                _that.auth_time--;
                if(_that.auth_time<=0){
                    _that.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
        },
    		register() {
             console.log("data",this.phonenumber);  
            var that = this;
            axios.post('/v1/user/login', {
                          mobile: this.phonenumber,
                          code: this.shortmessage,
                          password:this.newpassword,
                          inv_code:this.invitation
                    })
                    .then(function (response) {
                      console.log("aa",response);
                    })
                    .catch(function (error) {
                           var name = error.data.msg.access_token;
                           var pass = error.data.msg.refresh_token;
                           that.setCookie(name,pass,60); 
                           console.log("aa",error.data.code)
                          if(error.data.code == 200){
                              alert("注册成功") 
                              that.$router.push('/home');
                          }else{
                             alert(error.data.msg) 
                          }
    //                         if (error.status == 200) {
    //                            alert("注册成功") 
    //                            that.$router.push('/home'); 
    //                         }else{
    //                           alert("注册成功") 
    //                         }
                       
                    });
          /*
        if(this.phonenumber == "" && this.shortmessage == "" && this.newpassword == "" && this.confirmpassword == ""){
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
        } else if(this.newpassword == "") {
          Toast({
              message: '请输入新密码',
              position: 'bottom',
              duration: 3000
          })
        } else if(this.confirmpassword == "") {
          Toast({
              message: '请确认密码',
              position: 'bottom',
              duration: 3000
          })
        } else if(this.newpassword !== this.confirmpassword){
            Toast({
              message: '密码确认不正确',
              position: 'bottom',
              duration: 3000
            });
        } else {
          Toast({
            message: '注册成功',
            position: 'bottom',
            duration: 3000
          })
        },

   */
          
     
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
    background: -moz-linear-gradient(left, #ff1b75, #ff1b3c);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#ff1b75),to(#ff1b3c));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #ff1b75, #ff1b3c);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #ff1b75, #ff1b3c);
    /* default */
    background: linear-gradient(left, #ff1b75, #ff1b3c);
    background-color: #ff1b75;
    font-size: 32px;
  }
   /*logo图片*/
  .logo{
    width: 100%;
    height: 380px;
    text-align: center;
  }
  .logo img{
    width: 230px;
    height: 230px;
    margin-top: 100px;
  }
   /*登录和注册*/
  .login-box{
    height: 100px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
  .login-box a{
     width: 100px;
     height: 100px;
     line-height: 100px;
     font-size: 30px;
     color: #000;
  }
  .login-box .a1{
    float: left;
    margin-left: 20%;
  }
   .login-box .a2{
    float: right;
    margin-right: 20%;
   }
   .login-box span{
      width: 1px;
      height: 80px;
      line-height: 80px;
      font-size: 50px;
      color: #888;
   }
  /*登录的账号与密码*/
  .account {
    margin-top: 60px;
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
    font-size: 32px;
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
  /*注册*/
  .reglog{
    padding: 0 28px 0 28px;
    margin-bottom: 60px;
  }
  .reglog .reg{
    width: 100%;
    height: 90px;
    background: -moz-linear-gradient(left, #ff1b75, #ff1b3c);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#ff1b75),to(#ff1b3c));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #ff1b75, #ff1b3c);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #ff1b75, #ff1b3c);
    /* default */
    background: linear-gradient(left, #ff1b75, #ff1b3c);
    background-color: #ff1b75;
    color: white;
    font-size: 32px;
    border: 0;
    border-radius: 10px;
  }
  /*同意协议*/
  .agree{
    margin-left: 30px;
  }
  .agree img{
    width: 30px;
    transform: translate(0, 6px);
  }
  .agree p{
    display: inline-block;
    margin-bottom: 70px;
    font-size: 24px;
  }
  .agree span{
    color: #ff1b45;
  }
  /*获取验证码*/
  
</style>