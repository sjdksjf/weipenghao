<template>
   <div id="taskCenterReceive-box">
    <!-- 头部部分  -->
      <div class="taskCenterReceive-title">
          <router-link to="/taskCenter/taskCenterinfo">
              <span><</span>
          </router-link>
          <h5>领取任务</h5>
      </div>
    <!-- 中间任务信息 -->
       <div class="taskCenterReceive-center">
           <div class="taskCenterReceive-name">
              <span>{{ receiveList.title }}</span>
           </div>
           <div class="taskCenterReceive-describe">
                <span>{{ receiveList.description }}</span>
                <button  type="button" class="mui-btn mui-btn-danger">复制</button>
           </div>
           <div class="taskCenterReceive-center-img" v-for="(item,i) in receiveList.thumb">
               <img class="img1" :src="item">
           </div>
       </div> 
     <!-- 发布任务按钮 -->  
     <div class="taskCenterReceive-foot">
          <button class="classify-btn2" v-if="taskSeen">已领取</button>
          <button v-on:click="receiveTask" v-if="seen" type="button" class="mui-btn mui-btn-danger">
                 领取
          </button>
     </div>
     </div>
   </div>
</template>    
<script>
    import { Toast } from 'mint-ui';
  import axios from 'axios';
  var that = this;
  export default{
    name: 'taskCenterReceive-box',
    data () {
      return {
        id:0,
        username: '',
        password: '',
        cookie_sit:'',
        taskSeen: false,
        seen: true,
        receiveList: {}
      }
    },
    created() {
       this.id = this.$route.params.id;
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
                 that.receive_post(arr2[1]);
              }else if(arr2[0]=='userPwd'){
                  that.getetle(arr2[1])  
                }
             
             
            }
          }
        },
        //判断是否ref tookin过期
        getetle: function(tookin){
             var  that = this;
             if(!tookin){
                that.$router.push('/login')
             } 
        },
        receiveTask(){
          var that = this;
          var arr1 = this.cookie_sit;

          var url1 = '/v1/task/ajax_receive_task';
          axios.post(url1,{
                        access_token:arr1,
                        task_id:that.id
          })
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
             // console.log("qq",error.data.code);
             if(error.data.code == 200){
                 alert(error.data.msg)
                 that.$router.push('/taskCenter/taskCenterinfo')
             }else{
                 alert(error.data.msg)
             }
          
            
             
          });

          
        },
        receive_post(arr){
          var that = this;
          var mayId = this.id; 
          this.cookie_sit = arr;
          var url = '/v1/task/taskdetails?task_id='+mayId+'&access_token='+arr;
          axios.get(url)
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
             //console.log("ree",error.data.data.is_Receive)
             if(error.data.data.is_Receive == 1){
                   that.taskSeen = true;
                   that.seen =false;
             }else{
                   that.taskSeen = false;
                   that.seen =true;
             }
             that.receiveList = error.data.data;
          });

          
        }
        

    }
 }
</script>

<style>
   /*头部样式*/
   .taskCenterReceive-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .taskCenterReceive-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .taskCenterReceive-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /* 中间任务信息样式*/
  .taskCenterReceive-center{
      height: 900px;
      width: 100%;
      margin-top: 103px;
      background-color: white;
  }
  .taskCenterReceive-name{
      height: 60px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;
      border-bottom: 2px solid #999; 
  }
  .taskCenterReceive-name span{
      height: 50px;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
  }
  .taskCenterReceive-center-img{
      width: 31%;
      float: left;
      margin-left: 2%;
  }
  .taskCenterReceive-center-img .img1{
      height: 100%;
      width: 100%;
  }
  /*描述部分*/
  .taskCenterReceive-describe{
      height: 400px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;

  }
  .taskCenterReceive-describe .mui-btn{
      margin-top: 300px;
      position: absolute;
      right: 20px;
  }
  .taskCenterReceive-describe span{
      height: 50px;
      line-height: 50px;
      width: 100%;
  }
  .taskCenterReceive-describe p{
      height: 160px;
      width: 160px;
      text-align: center;
      margin-top: 20px;
      background-color: #999;
  }
  .taskCenterReceive-describe p button{
      height: 80px;
      width: 90px;
      margin-top: 40px;
      background-color: #666;
      border-radius: 15px;
      border: 1px solid #666;
  }
 
  /*发布任务按钮*/
  .taskCenterReceive-foot{
     height: 120px;
     width: 100%;
     line-height: 80px;
     margin-top: 200px; 
     background-color: white;
  }

  .taskCenterReceive-foot button{
     height: 80px;
     width: 150px;
     font-size: 30px;
     float: right;
     margin-top: 20px;
     margin-right: 50px;
   }
   .taskCenterReceive-foot button a{
     color: white;
   }
</style>