<template>
   <div id="feedback-box">
      <!-- 头部部分  -->
        <div class="feedback-title">
            <router-link to="/home">
              <span><</span>
            </router-link>
            <h5>问题反馈</h5>
        </div>
      <!-- 中间任务信息 -->
         <div class="feedback-center">
             <div class="feedback-name">
                <el-input v-model="input" placeholder="请输入标题"></el-input>
             </div>
             <div class="feedback-describe">
                 <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
             </div>
         </div> 
       <!-- 发布任务按钮 -->  
         <div class="feedback-foot">
              <div id="exam">
                  <div style="cursor: pointer;" @click="vm.showDialog=true">
                      <button  v-on:click="jicp" class="mui-btn mui-btn-danger">
                             反馈
                      </button>
                  </div>
                   <!-- //@closeDialog用来接收子组件传过来的参数 -->  
                   <Dialog
                    @closeDialog="close"
                    v-if="vm.showDialog"></Dialog>
              </div>
         </div>
   </div>
</template>    
<script>
    import Vue from 'vue';
    import { Actionsheet,Toast } from 'mint-ui';
    Vue.component(Actionsheet.name, Actionsheet);

    import Dialog from '../subcom/dialog.vue'
    Vue.component('Dialog',Dialog)
    
    export default {
          name: 'feedback-center',
          data () {
            return {
              input:'',
              textarea:'',
              timer:null,
              vm: {
                showDialog: false,
              },
              // action sheet 选项内容
              datas: [
                    {
                    name: '从相册中选择', 
                    method : this.getLibrary  // 调用methods中的函数
                  },
              
             ],
              // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
              sheetVisible: false,
              message:'mengban1'
            }
          },
          methods: {
            actionSheet: function(){
              // 打开action sheet
              this.sheetVisible = true;
            },
            getLibrary: function(){
              console.log("打开相册")
            },
            jicp: function(){
               var that = this;
                   console.log("dd")
               if(!this.vm.showDialog){
                       console.log("dd")
                    that.timer = setInterval( () => {
　　　　　　　          that.$router.push('/home');
                       clearInterval(that.timer);
　　　　　　          }, 1500);
               }
             
            },
            close(){
              this.vm.showDialog = false;
            }
          }
        
          
    }
</script>

<style>
   /*头部样式*/
   .feedback-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .feedback-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .feedback-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /* 中间任务信息样式*/
  .feedback-center{
      height: 800px;
      width: 100%;
      margin-top: 103px;
      background-color: white;
  }
  .feedback-name{
      height: 60px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;
      border-bottom: 2px solid #999; 
  }
  .feedback-name span{
      height: 50px;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
  }
  /*描述部分*/
  .feedback-describe{
      height: 400px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 30px auto;
  }
  .feedback-describe span{
      height: 50px;
      line-height: 50px;
      width: 100%;
  }
  .feedback-describe p{
      height: 160px;
      width: 160px;
      text-align: center;
      margin-top: 170px;
      background-color: #999;
  }
  .feedback-describe p button{
      height: 80px;
      width: 90px;
      margin-top: 40px;
      background-color: #666;
      border-radius: 15px;
      border: 1px solid #666;
  }
  .el-textarea__inner{
    line-height: 30px;
  }
  /*发布任务按钮*/
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
</style>