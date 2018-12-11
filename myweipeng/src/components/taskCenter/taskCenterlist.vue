<template>
   <div id="taskCenterlist-box">
    <!-- 头部部分  -->
    <div class="taskCenterlist-title">
        <router-link to="/taskCenter/taskCenterinfo">
              <span><</span>
        </router-link>
        <h5>任务中心</h5>
    </div> 
    <!-- 任务分类部分  -->
    <div class="nav">
      <mt-button size="small" @click="addClass1(index1)" :class="{myActive:index1==current}" @click.native.prevent="active = 'tab-container1'">普通任务</mt-button>
      <mt-button size="small" @click="addClass2(index2)" :class="{myActive:index2==current}" @click.native.prevent="active = 'tab-container2'">高级任务</mt-button>
      <mt-button size="small" @click="addClass3(index3)" :class="{myActive:index3==current}" @click.native.prevent="active = 'tab-container3'">自由任务</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <!-- cell组件 -->
          <p v-if="task_seen" class="mytaskSeen">暂时没有可领取的任务</p>
          <mt-cell v-for="(n,i) in tash_list" title="" :key = "n.id" v-if="ltask_seen">
               <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ tash_list[i].title }}</p>
                          <p class="classify-li2-p2">金额: {{ tash_list[i].single_price }}</p>
                      </div>
                       <button  class="classify-btn2" v-show="tash_list[i].is_Receive == 1">已领</button>
                      <router-link v-bind="{to:'/taskCenter/taskCenterReceive/'+tash_list[i].task_id}">
                      <button class="classify-btn1" v-show="tash_list[i].is_Receive == 0">
                                  领取
                      </button>
                      </router-link>
                </div>  

          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <p v-if="task_seen" class="mytaskSeen">暂时没有可领取的任务</p>
          <!-- cell组件 -->
          <mt-cell v-for="(n,i) in good_list" title="" :key = "n.id" v-if="ltask_seen">
                <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ good_list[i].title }}</p>
                          <p class="classify-li2-p2">金额: {{ good_list[i].single_price }}</p>
                      </div>
                      <button  class="classify-btn2" v-show="good_list[i].is_Receive == 1">已领</button>
                      <router-link v-bind="{to:'/taskCenter/taskCenterReceive/'+good_list[i].task_id}">
                      <button class="classify-btn1" v-show="good_list[i].is_Receive == 0">
                                  领取
                      </button>
                      </router-link>
                </div>  
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <p v-if="task_seen" class="mytaskSeen">暂时没有可领取的任务</p>
          <!-- cell组件 -->
          <mt-cell v-for="(n,i) in sood_list" title="" :key = "n.id" v-if="ltask_seen">
                 <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ sood_list[i].title }}</p>
                          <p class="classify-li2-p2">金额: {{ sood_list[i].single_price }}</p>
                      </div>
                      <button  class="classify-btn2" v-show="sood_list[i].is_Receive == 1">已领</button>
                      <router-link v-bind="{to:'/taskCenter/taskCenterReceive/'+sood_list[i].task_id}">
                      <button class="classify-btn1" v-show="sood_list[i].is_Receive == 0">
                                  领取
                      </button>
                      </router-link>
                </div>  
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!--领取规则部分-->
     <div class="taskCenter-rule">
           <p>领取规则</p>
           <p>1、高级会员可接所有，普通智能接普通和自由任务，非会员</p>
           <p>只能接自由任务；</p>
           <p>2、VIP会员可领取每天两条朋友圈发布任务；</p>
           <p>3、任务图片和任务介绍</p>
           <div class="taskCenter-rule-img">
               <img src="http://qn.hangjie888.com/lunbo04.jpg">
           </div>
           <p>4、领取任务</p>
     </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import { Header , TabContainer, TabContainerItem } from 'mint-ui';
  Vue.component(Header.name, Header);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  export default {
      name: 'page-tab-container',
      data() {
          return {
            tash_list: [],
            good_list: [],
            sood_list: [],
            judge_state:'',
            isA:false,
            isB:true,
            taskSeen: false,
            seen: true,
            ltask_seen:true,
            task_seen:false,
            list_cookie:'',
            current:1,
            index1:1,
            index2:2,
            index3:3,
            active: 'tab-container1'
           
          };
        },
      created() {
        this.getCookie();
        //this.getimgs();
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
                   that.Mylist_cookie(arr2[1]);
                }else if(arr2[0]=='userPwd'){
                    that.getetle(arr2[1])  
                  }
               
               
              }
            }
          },
          //存储cookie
          Mylist_cookie(arr){
               this.list_cookie = arr;
          },
          //判断是否ref tookin过期
          getetle: function(tookin){
               var  that = this;
               console.log("Mytookin",tookin)  
               if(!tookin){
                  that.$router.push('/login')
               } 
          },
          receiveTashs(){
              this.$router.push('/taskCenter/taskCenterSubmit')
          },
          addClass1(index1){
             this.current = index1;
          },
          addClass2(index2){
            this.current = index2;
            var arr3 = this.list_cookie; 
             var that =this;
            var url1='/v1/task/task_list?type=3&access_token='+arr3;
        
            axios.get(url1).then(function(response){
               //console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){

               if(response.data.data[0]){
                    that.ltask_seen = true;
                    that.task_seen = false;
               }else{
                    that.ltask_seen = false;
                    that.task_seen = true; 
                    return false;   
               };
               //console.log("bb",response.data);//发生错误时执行的代码
                that.good_list = response.data.data[0];
                that.judge_state = that.good_list.is_Receive;
                 if(that.judge_state == 1){
                   that.taskSeen = true;
                 }else{
                     that.seen = true;
                 } 
                  //console.log("cc",that.tash_list.single_price);
            });   
          },
          addClass3(index3){
              this.current = index3;
              var that =this;
              var arr5 = this.list_cookie;
              var url2='/v1/task/task_list?type=1&access_token='+arr5;
              axios.get(url2).then(function(response){
                 console.log("bb",response);//请求正确时执行的代码
              }).catch(function (response){
                     if(response.data.data[0]){
                          that.ltask_seen = true;
                          that.task_seen = false;
                     }else{
                          that.ltask_seen = false;
                          that.task_seen = true; 
                          return false;   
                     };
                    that.sood_list = response.data.data;
                   //console.log("aa",response.data.data);//发生错误时执行的代码
                    /* for(var i=0;i<response.data.data.length;i++){
                          console.log("ww",response.data.data[i])
                          if(response.data.data[i].is_Receive == 1){
                              that.isA = true;
                          }else{
                              that.isB = true;
                          }
                     }*/
                    
                    //console.log("cc",that.sood_list.single_price);
              })
          },
          //普通任务
          getimgs() {
            var  that = this;
            var arr1 = this.list_cookie;
            var url='/v1/task/task_list?type=2&access_token='+arr1;
          
            axios.get(url).then(function(response){
               console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){
               if(response.data.data[0]){
                    that.ltask_seen = true;
                    that.task_seen = false;
               }else{
                    that.ltask_seen = false;
                    that.task_seen = true;
                    return false;   
               };
               console.log("aa",response.data.data);//发生错误时执行的代码
               that.tash_list = response.data.data;
               // console.log("cc",that.tash_list.is_Receive);
               that.judge_state = that.tash_list.is_Receive;
               
               if(that.judge_state == 1){
                   that.taskSeen = true;
               }else{
                   that.seen = true;
               } 
                // console.log("dd",that.judge_state)
            });
            
      }
    }
  }
</script>

<style lang="css" scoped>
   /*头部样式*/
   .taskCenterlist-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      z-index: 999;
      background-color: white;
   }
   .taskCenterlist-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .taskCenterlist-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

   .taskCenterlist-title router-link{
      display: inline-block;
      float: left;
   }

  /* 任务分类部分*/
  .myActive{
     background-color: red;
     color: white;
  }
  .mytaskSeen{
     height: 50px;
     line-height: 50px;
     font-size: 30px;
     color: red;
     width: 100%;
     text-align: center;
  }
  .item {
    display: inline-block;
  }
 
  .nav {
    padding: 10px;
    margin-top: 100px;
  }
  .nav button{
     margin-right: 5%;
  }
 .nav button:first-child{
    margin-left: 70px;
 }
  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
/*任务分类样式*/
.classify-li2-box{
   height: 120px;
   width: 900px;
}
.classify-li2-box  .classify-li2-img1{
   height: 80px;
   width: 80px;
   background-color: #666;
   line-height: 80px;
   margin-top: 20px;
   border-radius: 50%;
   float: left;
}
.classify-li2-box img{
   height: 50px;
   width: 50px;
   margin-left: 15px; 
}
.classify-li2-p{
  height: 80px;
  width: 300px;
  float: left;
  margin-top: 20px;
  margin-left: 10px;
}
.classify-li2-p .classify-li2-p1{
   color: #333;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-li2-p  .classify-li2-p2{
  color: red;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-li2-box .classify-btn1{
   height: 60px;
   color: white;
   margin-top: 30px;
   margin-left: 180px;
   background-color: red;
}
.classify-li2-box .classify-btn1 a{
   color: white;
}
.classify-li2-box .classify-btn2{
   height: 60px;
   margin-top: 30px;
   margin-left: 180px;
   color: white;
   background-color: #888;
}


/*领取规则样式*/
.taskCenter-rule{
    width: 100%;
    margin-top: 100px;
    box-sizing: border-box;
}
.taskCenter-rule p{
    height: 30px;
    width: 800px;
    color: #222;
    margin-left: 10px;
    margin-top: 10px;
    line-height: 30px;
    font-size: 25px;
}
.taskCenter-rule-img{
    width: 500px;
    margin: 20px auto;
}
.taskCenter-rule-img img{
   width: 500px;
   margin: 0 auto;
}
</style>