<template>
   <div id="taskCenterSubmitlist-box">
    <!-- 头部部分  -->
    <div class="taskCenterSubmitlist-title">
        <router-link to="/taskCenter/taskCenterinfo">
              <span><</span>
        </router-link>
        <h5>任务列表</h5>
    </div> 
    <div class="foot_box" v-if="misTask">
         您尚未领取任务
       <p>请去任务中心领取</p>
    </div>
    <!-- 任务分类部分  -->
   <!--使用mui框架，实现新闻资讯列表样式-->
    
    <ul class="mui-table-view">
      <li v-for="item in tashSub_list" class="mui-table-view-cell mui-media">
        <router-link v-bind="{to:'/taskCenter/taskCenterSubmit/'+item.task_users_id}">
          <img class="mui-media-object mui-pull-left" src="http://qn.hangjie888.com/2.png">
            <div class="mui-media-body">
                名称：{{item.task_title}}
              <p class='mui-ellipsis' v-text="item.zhaiyao" style="margin-top: 3px;"></p>
              <div class="ft">
                <span class="taskCenterSubmitlist-list">金额：{{item.single_price }}</span>
              </div>
            </div> 
            <button type="button" class="mui-btn mui-btn-danger">提交</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import { Toast } from 'mint-ui';
  

  export default {
      name: 'page-tab-container',
      data() {
          return {
            tashSub_list: [],
            judge_state:'',
            misTask:false,
            num: 0,
            active: 'tab-container1'
           
          };
        },
      created() {
        this.getCookie();
      },
      methods:{
           getCookie:function () {
            var that = this;
            if (document.cookie.length>0) {
              var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
             
              for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split('=');//再次切割
               // console.log("dd",arr2)
                if(arr2[0]=='userName'){
                  // console.log("cc",arr2[1])
                   that.getimgs(arr2[1]);
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
          getimgs(arr) {
            console.log("arr",arr) 
            var  that = this;
            var url='/v1/task/unfinishedtask?access_token='+arr;
          
            axios.get(url).then(function(response){
               console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){
               that.num = response.data.data.length
               //console.log("aa",response.data.data.length);//发生错误时执行的代码
               that.tashSub_list = response.data.data;
               console.log("cc",that.tashSub_list);
               if(!that.tashSub_list[0].single_price){
                  that.misTask == true;
               }
            });
            
           
      }
    }
  }
</script>

<style lang="css" scoped>
   /*头部样式*/
   .page-tab-container{
      margin-top: 100px;
   }
   .taskCenterSubmitlist-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      z-index: 999;
      background-color: white;
   }
   .taskCenterSubmitlist-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .taskCenterSubmitlist-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

   .taskCenterSubmitlist-title router-link{
      display: inline-block;
      float: left;
   }

  /* 任务分类部分*/
   .mui-table-view{
     margin-top: 100px; 
   }
   .mui-table-view img {
    height: 80px;
    width: 80px;
  }
  .mui-table-view .mui-media-object {
     height: 80px;
    line-height: 80px;
    max-width: 80px;
  }
  .ft {
    margin-top: 1em;
    font-size: 30px;
    color: #0094ff;
  }
  .mui-media-body{
     font-size: 26px;
     color: #222;
  }
  .taskCenterSubmitlist-list{
    color: red;
  }
  /*任务不存在*/
  .foot_box{
    margin: 200px auto;
    height: 200px;
    width: 300px;
    color: red;
    font-size: 30px;
  }
  .foot_box p{
    color: red;
    font-size: 30px;
  }
</style>