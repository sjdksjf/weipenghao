<template>
	<div id="login">
    <!-- 登录界面的头部 -->
    <!--
		<mt-header fixed title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>  
    </mt-header> -->
    <div class="logo">
         <img src="http://qn.hangjie888.com/logo1.png">
    </div>
    <!-- 登录和注册 -->
    <div class="login-box">
         <router-link to="/login" class="a1">登录</router-link>
         <span>|</span>
         <router-link to="/login/register" class="a2">注册</router-link>
    </div>
    <!-- 登录的账号与密码 -->
    <div class="account">
      <div class="member-id">
        <label>账号</label>
        <input type="text" placeholder="会员号/手机号码登录" v-model="ruleForm.userName">
      </div>
      <div class="member-pass">
        <label>密码</label>
        <input type="password" placeholder="请输入您登录密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
      </div>
    </div>
    <!-- 同意协议与忘记密码 -->
    <div class="agree">
      <!-- `checked` 为 true 或 false -->
      <el-checkbox v-model="checked">记住密码</el-checkbox>
      <router-link to="/login/getback">
        <p class="forget">忘记密码？</p>
      </router-link>
    </div>
    <!-- 登录与注册 -->
    <div class="reglog">
      <button class="reg" 
      v-on:click="login_post">登录</button>
      <router-link to="/login/register">
        <button class="log">注册</button>
      </router-link>
    </div>
 </div>
</template>

<script>
	import { Toast } from 'mint-ui';
  import axios from 'axios';
  var that = this;
	export default{
		name: 'login',
		data () {
			return {
        checked:false,
        ruleForm: {
            userName: '', //用户名
            password: '' //密码
           },
			}
		},
		created() {
			  this.getCookie()
		},
		methods: {
        login_post(){
          var that = this;
          if (this.username == "") {
              Toast({
                message: '请输入手机号',
                position: 'bottom',
                duration: 3000
              });
          } else if(this.password == ""){
              Toast({
                message: '请输入密码',
                position: 'bottom',
                duration: 3000
              })
          };
          axios.post('/v1/user/login', {
                        mobile: this.ruleForm.userName,
                        password:this.ruleForm.password
          })
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
          // console.log(error.data.code)
              if(error.data.status == 1){
                 var name = error.data.msg.access_token;
                 var pass = error.data.msg.refresh_token;
                 that.setCookie(name,pass,60);
                 that.$router.push('/home')
              }else{
                 alert(error.data.msg)
              }
             
          });

          
        },
        //记住密码
       submitForm(formName) {
                       const self = this;
                      //判断复选框是否被勾选 勾选则调用配置cookie方法
                      if (self.checked == true) {
                          console.log("checked == true");
                          //传入账号名，密码，和保存天数3个参数
                          self.setCookie(self.ruleForm.username, self.ruleForm.password, 7);
                      }else {
                        console.log("清空Cookie");
                        //清空Cookie
                        self.clearCookie();
                      }
                      
                      //与后端请求代码，本功能不需要与后台交互所以省略
                      
                      console.log("登陆成功");
          },
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
                this.userName=arr2[1];//保存到保存数据的地方
              }else if(arr2[0]=='userPwd'){
                this.passWord=arr2[1];
              }
            }
          }
        },
      //清除cookie
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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
    margin-bottom: 32px;
  }
  .account div{
    position: relative;
    padding: 26px 0 26px 120px;
    background: #fff; 
  }
  .account label{
    position: absolute;
    left: 30px;
    top: 24px;
    font-size: 32px;
  }
  .account .member-id{
    border-bottom: 1px solid #d6d6d6;
  }
  .account input{
    /*color: #ccc;*/
    padding: 0 0 0 0;
    margin-bottom: 0;
    height: 30px;
    font-size: 24px;
    color: #333;
    border: 0;
  }
  /*同意协议与忘记密码*/
  .agree{
    width: 100%;
    height: 100px;
    position: relative;
    margin:0 36px 0 30px;
  }
  .agree span{
    color: #ff1b45;
  }
  .agree p{
    display: inline-block;
    margin-bottom: 80px;
    font-size: 24px;
  }
  .agree img{
    width: 30px;
    transform: translate(0, 6px);
  }
  .agree .forget{
    font-size: 30px;
    position: absolute;
    top: 2px;
    right: 100px;
  }
  /*登录与注册*/
  .reglog{
    padding: 0 30px 0 30px;
  }
  .reglog button{
    width: 100%;
    height: 90px;
    font-size: 32px;
    border-radius: 10px;
  }
  .reglog .reg{
    margin-bottom: 10px;
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
    border: 0;
  }
  .reglog .log{
    margin-bottom: 60px;
    border: 2px solid #ff1b46;
    color: #ff1b46;  
  }
 
</style>