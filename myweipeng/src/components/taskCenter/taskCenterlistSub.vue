<template>
   <div id="taskCenterlistSub-box">
    <!-- 头部部分  -->
      <div class="taskCenterlistSub-title">
          <router-link to="/taskCenter/taskCenterinfo">
              <span><</span>
          </router-link>
          <h5>提交任务</h5>
      </div>
    <!-- 中间任务信息 -->
   <!--  <div class="title">
      <h4 v-text="info.task_title"></h4>
      <p>
        <span>{{ info.past_time }}</span>
        <img :src="info.thumb">
        <p>{{info.description}}</p>
        <div id="content" v-html="info.content"></div>
      </p>
    </div> -->
       <div class="taskCenterlistSub-center">
           <div class="taskCenterlistSub-name">
              <span>{{ info.task_title }}</span>
           </div>
           <div class="taskCenterlistSub-describe">
               <p>
                   <el-upload
                      action="http://cs.yeshitou.com/Admin/Uploadify/uploadFile/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="handleSuccess"
                      :limit="1"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
               </p>
                <span>请上传朋友圈截屏照片</span>
           </div>
       </div> 
     <!-- 发布任务按钮 -->  
     <div class="taskCenterlistSub-foot">
          <button v-on:click="Submit_file" type="button" class="mui-btn mui-btn-danger">
                提交
          </button>
     </div>
     </div>
   </div>
</template>    
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import { Actionsheet } from 'mint-ui';
    Vue.component(Actionsheet.name, Actionsheet);
    export default {
          name: 'taskCenterlistSub-center',
          data () {
            return {
                id: 0,
                info: {},
                complete_thumb:'',
                dialogImageUrl: '',
                dialogVisible: false
            }
          },
         created() {
            this.id = this.$route.params.id;
            this.getinfo();
          },
          methods: {
            getinfo() {
              var that = this;
              //console.log("id",this.id);
              axios.get('/v1/task/done_task?task_users_id='+this.id).then(function(response){
                 console.log("aa",response);//请求正确时执行的代码
              }).catch(function (response){
                that.info = response.data.data;
               //发生错误时执行的代码
               /* for(var i = 0;i< response.data.data.length; i++){
                     if(that.id == response.data.data[i].article_id){
                         that.info = response.data.data[i];
                     }
                }*/
      
              })
            },
            Submit_file:function(){
                  var that = this;
                // console.log("url",this.id,this.complete_thumb)
                  axios.post('/v1/task/ajax_done_status', {
                       task_users_id: that.id,
                       complete_thumb: that.complete_thumb
                  })
                  .then(function (response) {
                    console.log("aa",response);
                  })
                  .catch(function (error) {
                      console.log("bb",error.data);
                      if(error.data.code == 200){
                         alert(error.data.msg);
                         that.$router.push('/taskCenter/taskCenterinfo')
                      }else{
                         alert(error.data.msg)
                      }
                     
                  });
            },
            actionSheet: function(){
              // 打开action sheet
              this.sheetVisible = true;
            },
            handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
              this.dialogImageUrl = file.url;
              this.dialogVisible = true;
            },
            handleSuccess(response){
              this.complete_thumb = response.url
             
            }
          }
        }


</script>

<style>
   /*头部样式*/
   .taskCenterlistSub-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .taskCenterlistSub-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .taskCenterlistSub-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /* 中间任务信息样式*/
  .taskCenterlistSub-center{
      height: 500px;
      width: 100%;
      margin-top: 103px;
      background-color: white;
  }
  .taskCenterlistSub-name{
      height: 60px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;
      border-bottom: 2px solid #999; 
  }
  .taskCenterlistSub-name span{
      height: 50px;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
  }
  /*描述部分*/
  .taskCenterlistSub-describe{
      height: 400px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;

  }
  .taskCenterlistSub-describe span{
      height: 50px;
      line-height: 50px;
      width: 100%;
  }
  .taskCenterlistSub-describe p{
      height: 160px;
      width: 160px;
      text-align: center;
      margin-top: 20px;
      background-color: #999;
  }
  .taskCenterlistSub-describe p button{
      height: 80px;
      width: 90px;
      margin-top: 40px;
      background-color: #666;
      border-radius: 15px;
      border: 1px solid #666;
  }
  .taskCenterlistSub-describe p .el-upload--picture-card {
    background-color: #888;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 180px;
    height: 180px;
    line-height: 200px;
    vertical-align: top;
    float: left;
    margin-left: 0px;
  }
  .el-upload--picture-card i {
    font-size: 58px;
    color: white;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
    float: left;
}
  /*发布任务按钮*/
  .taskCenterlistSub-foot{
     height: 120px;
     width: 100%;
     line-height: 80px;
     position: absolute;
     bottom: 5px;
     background-color: white;
  }

  .taskCenterlistSub-foot button{
     height: 80px;
     width: 150px;
     font-size: 30px;
     float: right;
     margin-top: 20px;
     margin-right: 50px;
   }
   .taskCenterlistSub-foot button a{
     color: white;
   }
</style>