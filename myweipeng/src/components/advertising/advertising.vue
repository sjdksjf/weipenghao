<template>
   <div id="advertising-box">
    <!-- 头部部分  -->
      <div class="advertising-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>广告投放</h5>
      </div>
    <!-- 中间任务信息 -->
       <div class="advertising-center">
           <div class="advertising-name">
              <span>跟我一起赚佣</span>
           </div>
           <div class="advertising-describe">
               <span>广告内容...</span>
               <p>
                  <button @click="actionSheet">
                 
                  </button>
                   <mt-actionsheet
                      :actions="datas"
                      v-model="sheetVisible">
                    </mt-actionsheet>
               </p>
           </div>
           <ul class="advertising-center-foot">
              <li>
                 <span>单笔广告费</span> <span class="center-foot-span">费用</span>
              </li>
              <li>
                 <span>任务发布量</span> <span class="center-foot-span">数量</span>
              </li>
              <li>
                 <span>广告总价</span> <span class="center-foot-span">总价</span>
              </li>
           </ul>
       </div> 
     <!-- 发布任务按钮 -->  
     <div class="advertising-foot">
          <button  type="button" class="mui-btn mui-btn-danger">
              <a href="/">发布</a>
          </button>
     </div>
     </div>
   </div>
</template>    
<script>
    import Vue from 'vue';
    import { Actionsheet } from 'mint-ui';
    Vue.component(Actionsheet.name, Actionsheet);
    export default {
          name: 'advertising-center',
          data () {
            return {
              // action sheet 选项内容
              datas: [
                    {
                    name: '从相册中选择', 
                    method : this.getLibrary  // 调用methods中的函数
                  }
             ],
              // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
              sheetVisible: false
            }
          },
          methods: {
            actionSheet: function(){
              // 打开action sheet
              this.sheetVisible = true;
            },
            getLibrary: function(){
              console.log("打开相册")
            }
          }
        }
</script>

<style>
   /*头部样式*/
   .advertising-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .advertising-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .advertising-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /* 中间任务信息样式*/
  .advertising-center{
      height: 700px;
      width: 100%;
      margin-top: 103px;
      background-color: white;
  }
  .advertising-name{
      height: 60px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;
      border-bottom: 2px solid #999; 
  }
  .advertising-name span{
      height: 50px;
      width: 100%;
      display: inline-block;
      margin-top: 20px;
  }
  /*描述部分*/
  .advertising-describe{
      height: 400px;
      font-size: 26px;
      color: #666;
      width: 96%;
      margin: 0 auto;

  }
  .advertising-describe span{
      height: 50px;
      line-height: 50px;
      width: 100%;
  }
  .advertising-describe p{
      height: 160px;
      width: 160px;
      text-align: center;
      margin-top: 170px;
      background-color: #999;
  }
  .advertising-describe p button{
      height: 80px;
      width: 90px;
      margin-top: 40px;
      background-color: #666;
      border-radius: 15px;
      border: 1px solid #666;
  }
  /*任务信息底部内容*/
  .advertising-center-foot{
      height: 250px;
      font-size: 26px;
      width: 96%;
      margin: 0 auto;
  }
  .advertising-center-foot li{
     height: 80px;
     line-height: 80px;
     border-top: 2px solid #999;  
  }
  .advertising-center-foot .center-foot-span{
     float: right;
     color: #666;
  }
  /*发布任务按钮*/
  .advertising-foot{
    height: 120px;
     width: 100%;
     text-align: center;
     line-height: 80px;
     margin-top: 120px; 
  }

  .advertising-foot button{
     height: 80px;
     width: 80%;
     font-size: 30px;
   }
  .advertising-foot button a{
     color: white;
  }
</style>