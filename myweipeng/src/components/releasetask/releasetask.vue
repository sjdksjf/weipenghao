<template>
   <div id="releasetask-box">
    <!-- 头部部分  -->
      <div class="releasetask-title">
          <router-link to="/home">
              <span><</span>
          </router-link>
          <h5>发布任务</h5>
      </div>
    <!-- 中间任务信息 -->
       <div class="releasetask-center">
          <div class="mui-input-row">
              <input type="text" class="mui-input-clear releTitil" v-model="title" placeholder="请输入发布任务名称">
          </div>
           <div class="releasetask-describe">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="description">
              </el-input>
               <p>
                 <el-upload
                  action="http://cs.yeshitou.com/Admin/Uploadify/uploadFile/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleSuccess"
                  :limit = "6"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
               </p>
           </div>
           <ul class="releasetask-center-foot">
              <li>   
                 <span>单笔广告费</span> <input type="text" @blur.prevent="totalprice()" class="center-foot-span" v-model="single_price" placeholder="费用"> 
              </li>
              <li>
                 <span>任务发布量</span> <input type="text" @blur.prevent="totalprice()" class="center-foot-span" v-model="release_num" placeholder="数量"> 
              </li>
              <li>
                 <span>广告总价</span> <input readonly='readonly' type="text" class="center-foot-span" v-model="userpay_price" placeholder="总价"> 
              </li>
           </ul>
       </div> 
     <!-- 发布任务按钮 -->  
     <div class="releasetask-foot">
          <button  type="button" class="mui-btn mui-btn-danger"  v-on:click="Submit_release">
               发布 
          </button>
     </div>
     </div>
   </div>
</template>    
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import ElementUI from 'element-ui';
    import { Actionsheet } from 'mint-ui';

    Vue.use(ElementUI);
    Vue.component(Actionsheet.name, Actionsheet);
    export default {
          name: 'releasetask-center',
          data () {
            return {
                  title:'',
                  description:'',
                  single_price:'',
                  release_num:'',
                  userpay_price:'',
                  my_cookie:'',
                  arr:[],
                  dialogImageUrl: '',
                  dialogVisible: false
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
                     that.get_cookie(arr2[1]);
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
           get_cookie(arr){
               this.my_cookie = arr;
           },
           Submit_release:function(){
                   var arr = this.my_cookie;
                   var that = this;
                   var url = '/v1/task/ajax_fabu_task?access_token='+arr;
                   axios.post(url, {
                       title: this.title,
                       description: this.description,
                       single_price: this.single_price,
                       thumb: this.arr,
                       release_num: this.release_num,
                       userpay_price: this.userpay_price
                  })
                  .then(function (response) {
                    console.log("aa",response);
                  })
                  .catch(function (error) {
                      if(error.data.code == 200){
                        //alert("cc",error.data.msg);
                           if(error.data.code == 40000){
                              axios.get('http://cs.yeshitou.com/v1/user/access_token').then(function(response){
                                       console.log("aa",response);//请求正确时执行的代码
                                    }).catch(function (response){
                                      
                                      that.Submit_release()
                                    });
                          }
                         that.$router.push('/taskCenter/taskCenterinfo')
                      }else if(error.data.code == 104){
                         alert(error.data.msg)
                      }
                     
                  });
            },
            handleRemove(file, fileList) {
              //console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
              this.dialogImageUrl = file.url;
              this.dialogVisible = true;
            },
            handleSuccess(response){
        
              this.arr.push(response.url);
            }
          }
        }
</script>

<style>
   /*头部样式*/
   .releasetask-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .releasetask-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .releasetask-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /* 中间任务信息样式*/
  .releasetask-center{
      min-height: 900px;
      width: 100%;
      margin-top: 103px;
      background-color: white;
  }
  .releasetask-name{
      height: 60px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;
      border-bottom: 2px solid #999; 
  }
  .releasetask-name span{
      height: 50px;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
  }
  .mui-input-row{
     width: 96%;
     margin: 0 auto;
  }
  .releTitil{
    line-height: 21px;
    color: #606266;
    height: 40px;
    width: 100%;
    margin-bottom: 15px; 
    padding: 10px 15px;
    border: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  /*描述部分*/
  .releasetask-describe{
      height: 520px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;

  }
  .releasetask-describe span{
      height: 50px;
      line-height: 50px;
      width: 100%;
  }
  .releasetask-describe p{
      height: 200px;
      width: 100%;
      text-align: center;
      background-color: white;
  }
  .releasetask-describe p .el-upload--picture-card {
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
  /*任务信息底部内容*/
  .releasetask-center-foot{
      height: 250px;
      font-size: 26px;
      width: 96%;
      margin: 0 auto;
  }
  .releasetask-center-foot li{
     height: 80px;
     line-height: 80px;
     position: relative;
     border-top: 2px solid #999;  
  }
  .releasetask-center-foot span{
      width: 20%;
      height: 100%;
      position: absolute;
      left: 0px;
  }
  .releasetask-center-foot input{
      width: 80%;
      height: 100%;
      text-align: right;
      position: absolute;
      border: 1px solid white;
      right: 0px;
  }
  /*发布任务按钮*/
  .releasetask-foot{
    height: 120px;
     width: 100%;
     text-align: center;
     line-height: 80px;
     margin-top: 120px; 
  }

  .releasetask-foot button{
     height: 80px;
     width: 80%;
     font-size: 30px;
   }
  .releasetask-foot button a{
     color: white;
  }

  
</style>