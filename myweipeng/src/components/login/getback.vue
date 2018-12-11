<template>
	<div id="getback">
    <!-- 找回密码界面的头部 -->
    <mt-header fixed title="找回密码">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>  
    </mt-header>
    <!-- 找回密码所需的个人信息 -->
    <div class="account">
        <div>
          <label>手机号</label>
          <input type="text" placeholder="会员号/手机号码登录" v-model="phonenumber">
        </div>
        <div class="captch">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model="shortmessage">
          <button v-show="sendAuthCode" class="auth_text auth_text_blue"  @click="getCode">获取验证码</button>
          <button v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒重新发送</button>
        </div>
        <div>
          <label>新密码</label>
          <input type="password" placeholder="请输入新密码,6-20个字符或数字" v-model="newpassword">
        </div>
        <div>
          <label>确认密码</label>
          <input type="password" placeholder="请再次输入密码" v-model="confirmpassword">
          </div>
    </div>
    <!-- 确认提交按钮 -->
    <div class="reglog">
        <button class="confirm" @click="changePassword">确定</button>
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
        newpassword: '',
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /*倒计时 计数器*/
        confirmpassword: ''
			}
		},
		created() {
			
		},
		methods: {
      getCode:function () {
            this.sendAuthCode = false;
            this.auth_time = 60;
            var _that =this;
           axios.post('/v1/user/send_sms', {
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
            var auth_timetimer =  setInterval(()=>{
                _that.auth_time--;
                if(_that.auth_time<=0){
                    _that.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
        },
			changePassword(){
          var that = this ;
         if(this.newpassword == this.confirmpassword){
                axios.post('/v1/user/ajax_edit_pad', {
                       mobile: that.phonenumber,
                       code :that.shortmessage,
                       password :that.newpassword,  
                       true_password :that.confirmpassword  
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
         }else{
           alert("密码不一致，请重新输入")
         }
          
      }
	  }
 }
</script>

<style scoped>
  body{
    background: #fff;
  }
  /*找回密码界面的头部*/
  .mint-header {
    height: 96px;
    background: -moz-linear-gradient(left, #fff, #fff);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,left,from(#fff),to(#fff));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(left, #fff, #fff);
    /* Opera 11.10+ */
    background: -o-linear-gradient(left, #fff, #fff);
    /* default */
    background: linear-gradient(left, #fff, #fff);
    background-color: #fff;
    font-size: 32px;
    color: #000;
  }
  /*找回密码所需的个人信息*/
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
    font-size: 32px;
  }
  .account input{
    /*color: #ccc;*/
    padding: 0 0 0 20px;
    margin-bottom: 0;
    height: 56px;
    font-size: 24px;
    color: #333;
    line-height: 1;
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
  /*确认提交按钮*/
  .reglog{
    padding: 0 28px 0 28px;
  }
  .reglog .confirm{
    width: 100%;
    height: 90px;
    margin-bottom: 100px;
    background: -moz-linear-gradient(top, #ff1b75, #ff1b3c);
    /* Safari 4-5, Chrome 1-9 */
    background: -webkit-gradient(linear,top,from(#ff1b75),to(#ff1b3c));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(top, #ff1b75, #ff1b3c);
    /* Opera 11.10+ */
    background: -o-linear-gradient(top, #ff1b75, #ff1b3c);
    /* default */
    background: linear-gradient(top, #ff1b75, #ff1b3c);
    background-color: #ff1b75;
    color: white;
    font-size: 32px;
    border: 0;
    border-radius: 50px;
  }
</style>