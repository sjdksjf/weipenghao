<template>
   <div id="taskCenterinfo-box">
        <!-- 头部部分  -->
        <div class="taskCenterinfo-title">
            <router-link to="/home">
               <span><</span>
            </router-link>
            <h5>任务大厅</h5>
        </div> 
        <!--使用组件结合mint-ui实现轮播图-->
        <silder :imgs="list"></silder>
         <!-- 任务跳转部分 -->
        <ul class="taskCenterinfo-foot">
            <li>
                 <router-link to="/taskCenter/taskCenterlist">  
                    <img src="http://qn.hangjie888.com/5.png">
                    <span class="taskCenterinfo-foot-words">任务中心</span>
                    <span class="taskCenterinfo-foot-icon">></span>
                </router-link>
            </li>
            <li>
                <router-link to="/taskCenter/taskCenterSubmitlist">
                    <img src="http://qn.hangjie888.com/task02.png">
                    <span class="taskCenterinfo-foot-words">提交任务</span>
                    <span class="taskCenterinfo-foot-icon">></span>
                </router-link> 
            </li>
            <li>
                <router-link to="/taskCenter/taskCenterRecord">
                    <img src="http://qn.hangjie888.com/task01.png">
                    <span class="taskCenterinfo-foot-words">任务记录</span>
                    <span class="taskCenterinfo-foot-icon">></span>
                </router-link> 
            </li>
       </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  import silder from '../subcom/silder.vue';
  export default {
    name: 'taskCenterinfo-box',
    components: {
      silder
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getimgs();
    },
    methods: {
      getimgs() {
        var  that = this;
        var url='/v1/home/ajax_slide_banner';
      
        axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){
  
           that.list = response.data.data.lunbo;
        });
      }
    }
  }
  

</script>

<style lang="css" scoped>
   /*头部样式*/
   .taskCenterinfo-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      z-index: 999;
      background-color: white;
   }
   .taskCenterinfo-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .taskCenterinfo-title h5{
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
  /*任务跳转部分*/
  .taskCenterinfo-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
  }
  .taskCenterinfo-foot li{
    height: 100px;
    width: 100%;
    line-height: 100px;
    background-color: white;
    list-style: none;
    margin-top: 15px;
  }
  .taskCenterinfo-foot li a{
    height: 100px;
    width: 100%;
    line-height: 100px;
  }
  .taskCenterinfo-foot li img{
     height:55px; 
     width: 50px;
     margin-top: 20px;
     margin-left: 30px;
     float: left; 
  }
  .taskCenterinfo-foot-words{
     font-size: 30px;
     float: left;
     margin-left: 20px;
     color: #000;
  }
  .taskCenterinfo-foot-icon{
     font-size: 35px;
     float: right;
     margin-right: 30px;
     color: #888;
  }
</style>