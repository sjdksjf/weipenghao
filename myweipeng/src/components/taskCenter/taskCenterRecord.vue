<template>
   <div id="taskCenterRecord-box">
    <!-- 头部部分  -->
    <div class="taskCenterRecord-title">
        <router-link to="/taskCenter/taskCenterinfo">
              <span><</span>
        </router-link>
        <h5>任务记录</h5>
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
          <mt-cell v-for="(n,i) in record_arr" title="" :key = "n.id">
               <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ record_arr[i].task_title }} </p>
                          <p class="classify-li2-p2">任务金额: {{ record_arr[i].single_price }}</p>
                      </div>   
                </div>  
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <!-- cell组件 -->
          <mt-cell v-for="(n,i) in record_file" title="" :key = "n.id">
                <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ record_file[i].task_title }} </p>
                          <p class="classify-li2-p2">任务金额: {{ record_file[i].single_price }}</p>
                      </div>
                      
                </div>  
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <!-- cell组件 -->
          <mt-cell v-for="(n,i) in record_list" title="" :key = "n.id">
                 <div class="classify-li2-box">
                      <div class="classify-li2-img1">
                        <img src="http://qn.hangjie888.com/2.png">
                      </div>
                      <div class="classify-li2-p">
                          <p class="classify-li2-p1">{{ record_list[i].task_title }}</p>
                          <p class="classify-li2-p2">任务金额: {{ record_list[i].single_price }}</p>
                      </div>
                      <div class="classify-li-right" v-show="record_list[i].auth_status == 1">审核中</div>
                      <div class="classify-li-right" v-show="record_list[i].auth_status == 2" >审核通过</div> 
                      <div class="classify-li-right" v-show="record_list[i].auth_status == 3" >审核失败</div>  
                </div>  
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
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
          record_arr: [],
          record_list: [],
          record_file: [], 
          current:1,
          index1:1,
          index2:2,
          index3:3,
          active: 'tab-container1'
        };
      },
      created() {
         this.getCookie()
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
                   that.record_post(arr2[1]);
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
          addClass1(index1){
             this.current = index1;
          },
          addClass2(index2){
             this.current = index2;
          },
           addClass3(index3){
             this.current = index3;
          },
          record_post(arr) {
            var  that = this;

            var url='/v1/task/rec_task_list?type=2&access_token='+arr;
          
            axios.get(url).then(function(response){
               console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){

               console.log("aa",response.data.data);//发生错误时执行的代码
               that.record_arr = response.data.data;
              // console.log("bb",that.record_arr);
            });
             var url1='/v1/task/rec_task_list?type=3&access_token='+arr;
          
            axios.get(url1).then(function(response){
               //console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){
                 console.log("aa",response.data.data);
                that.record_file = response.data.data;
            });
           var url2='/v1/task/rec_task_list?type=1&access_token='+arr;
          
            axios.get(url2).then(function(response){
               console.log("bb",response);//请求正确时执行的代码
            }).catch(function (response){

                 console.log("aa",response.data);//发生错误时执行的代码
                   that.record_list = response.data.data;
                  //console.log("cc",that.sood_list.single_price);
            })
          
        
        }
      }
    };

</script>

<style lang="css" scoped>
   /*头部样式*/
   .taskCenterRecord-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .taskCenterRecord-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .taskCenterRecord-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }

   .taskCenterRecord-title router-link{
      display: inline-block;
      float: left;
   }

  /* 任务分类部分*/
  .item {
    display: inline-block;
  }
  .myActive{
     background-color: red;
     color: white;
  }
  .nav {
    padding: 10px;
    margin-top: 108px;
    background-color: white;
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
  font-size: 15px;
  color: red;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-li2-box .classify-btn1{
   height: 60px;
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
.classify-li-right{
  height: 50px;
  width: 200px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  color: #e71534;
  margin-top: 25px;
  margin-left: 60%; 
}


</style>