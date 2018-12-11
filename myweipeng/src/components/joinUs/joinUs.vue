<template>
   <div id="joinUs-box">
        <!-- 头部部分  -->
        <div class="joinUs-title">
            <router-link to="/home">
               <span><</span>
            </router-link>
            <h5>加入我们</h5>
        </div> 
        <!--使用组件结合mint-ui实现轮播图-->
        <silder :imgs="list"></silder>
         <!-- 咨询和个人信息部分 -->
        <ul class="joinUs-foot">
           <!-- 咨询部分 -->
            <li class="zx">
                <div class="box1">
                    <img src="http://qn.hangjie888.com/jr1.png">
                </div>
                <div class="box2">
                     <span>在线咨询</span>
                     <p class="p1">
                        <img src="http://qn.hangjie888.com/jr3.png">
                        <span>13568576596</span>
                     </p>
                     <p>
                        <img src="http://qn.hangjie888.com/jr2.png">
                        <span>13568576596</span>
                     </p>
                </div>
            </li>
             <!-- 个人信息部分 -->
            <li>
                 <form class="mui-input-group">
                      <div class="mui-input-row">
                          <label>姓名：</label>
                          <input type="text" class="mui-input-password" placeholder="请输入您的名字">
                      </div>
                      <div class="mui-input-row">
                          <label>手机号：</label>
                          <input type="text" class="mui-input-password" placeholder="请输入您的手机号">
                      </div>
                       <div class="mui-input-row">
                          <label>意向：</label>
                          <input type="text" class="mui-input-password" placeholder="">
                      </div>
                  </form>
            </li>
       </ul>
      <!-- 提交按钮部分 --> 
         <div class="feedback-foot">
              <div id="exam">
                  <div style="cursor: pointer;" @click="vm.showDialog=true">
                      <button  v-on:click="jicp" class="mui-btn mui-btn-danger">
                             提交
                      </button>
                  </div>
                   <!-- //@closeDialog用来接收子组件传过来的参数 -->  
                   <Jion
                    @closeDialog="close"
                    v-if="vm.showDialog"></Jion>
              </div>
         </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import silder from '../subcom/silder.vue';

  import Jion from '../subcom/jion.vue'
  Vue.component('Jion',Jion)

  export default {
    name: 'joinUs',
    components: {
      silder
    },
    data() {
      return {
        list: [],
        vm: {
                showDialog: false,
              },
      }
    },
    created() {
      this.getimgs();
    },
    methods: {
      getimgs() {
        var that = this;
        var url='/v1/home/ajax_slide_banner';
      
        axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){
           that.list = response.data.data.lunbo;
        });

      },
      jicp: function(){
               console.log("ddd");
               //this.$router.push({name: '/'});
            },
      close(){
              this.vm.showDialog = false;
           }
    }
  }
  

</script>

<style lang="css" scoped>
   /*头部样式*/
   .joinUs-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      z-index: 999;
      background-color: white;
   }
   .joinUs-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .joinUs-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

  /*轮播图样式*/
  #tml{
     margin-top: 88px !important;
  }
  /*咨询和个人信息部分*/
  .joinUs-foot{
    height: 810px;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .zx{
    height: 280px;
    width: 100%;
  }
  .box1{
     width: 50%;
     height: 280px;
     float: left;
  }
  .box1 img{
    width: 100%;
    height: 100%;
  }
  .box2{
     width: 46%;
     height: 200px;
     margin-top: 40px;
     margin-right: 2%;
     box-shadow: 0 0 3px  rgba(0,0,0,0.2);
     float: right;
     box-sizing: border-box;
  }
  .box2 span{
    height:50px;
    line-height: 50px;
    width: 100%; 
    margin-left: 20px;
  }
  .box2 p{
    height: 60px;
    width: 100%;
    line-height: 60px;
  }
  .box2 .p1{
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .box2 p img{
    height: 50px;
    width: 50px;
    margin-left: 10px;
  }
  .box2 p span{
    height: 60px;
    width: 150px;
    margin-top: 20px;
  }
  /*输入框样式*/
  .mui-input-group .mui-input-row label{
    width: 22%;
  }
  .mui-input-group .mui-input-row input{
    float: left;
    font-size: 26px;
  }
  /* 提交按钮部分 */
  .feedback-foot{
     height: 120px;
     width: 100%;
     line-height: 80px;
     background-color: white;
     position: fixed;
     bottom: 0px;
  }

  .feedback-foot button{
     height: 60px;
     line-height: 30px;
     margin-top: 30px;
     width: 120px;
     font-size: 30px;
     float: right;
     margin-right: 30px;
     background-color: rgba(255,0,0,0.9);
   }
  .feedback-foot button a{
     color: white;
  }
  /*消息提示框*/
   #exam{
    width: 100%;
    height: 100%;
  }
  .border .message{
    position: absolute;
    right: 20%;
  }
</style>