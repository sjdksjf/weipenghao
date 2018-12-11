<template>
  <div id="atml">
     <!--mint-ui轮播图-->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in list" :key="item.img">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe> -->
    <h2 class="title-weipeng">
        <span>微朋天下</span>  
    </h2>
    <!--使用组件结合mint-ui实现轮播图-->
	  <homesilder :imgs="lists"></homesilder>
    <!--头条部分-->
     <div class="home-topline">
         <img class="home-topline-tu1" src="http://qn.hangjie888.com/tout1.png">
         <ul class="home-topline-ul">
             <li>
               <router-link to="/news/newlist">
                   <vue-seamless-scroll :data="listData" :class-option=" optionSingleHeight" class="seamless-warp">
                      <ul class="item">
                          <li v-for="item in listData">
                              <span class="head" v-text="item.head"></span>
                              <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
                          </li>
                      </ul>
                  </vue-seamless-scroll>
               </router-link>
             </li>
         </ul>
         <img class="home-topline-tu2" src="http://qn.hangjie888.com/tout2.e073d9d.png">
     </div>
    <!--使用MUI的九宫格-->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9" id="hoom-foot">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/amaid">
            <img src="http://qn.hangjie888.com/2.9f35c5b.png">
            <div class="mui-media-body">如何赚佣</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/taskCenter/taskCenterinfo">
            <img src="http://qn.hangjie888.com/5.bdfadbe.png">
            <div class="mui-media-body">任务大厅</div>
          </router-link> 
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/qrcode">
            <img src="http://qn.hangjie888.com/4.aa54348.png">
            <div class="mui-media-body">推广二维码</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/member">
            <img src="http://qn.hangjie888.com/7.f8d2597.png">
            <div class="mui-media-body">微朋会员</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/releasetask">
            <img src="http://qn.hangjie888.com/8.75e6935.png">
            <div class="mui-media-body">发布任务</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/personal/personalhome">
            <img src="http://qn.hangjie888.com/9.29d20c1.png">
            <div class="mui-media-body">个人中心</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/allies">
            <img src="http://qn.hangjie888.com/12.afb0c85.png">
            <div class="mui-media-body">盟主</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/cityWide">
            <img src="http://qn.hangjie888.com/10.c4aca84.png">
            <div class="mui-media-body">同城信息</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/advertising">
            <img src="http://qn.hangjie888.com/11.4ffbfd8.png">
            <div class="mui-media-body">广告投放</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/fruitArea">
            <img src="http://qn.hangjie888.com/1.12fd258.png">
            <div class="mui-media-body">水果专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/cheap">
             <img src="http://qn.hangjie888.com/3.158e2e2.png">
             <div class="mui-media-body">物美价廉</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/receive/receiveList">
            <img src="http://qn.hangjie888.com/6.1159a47.png">
            <div class="mui-media-body">免费领取</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/disport">
            <img src="http://qn.hangjie888.com/01.759dadd.png">
             <div class="mui-media-body">娱乐中心</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/exchange">
            <img src="http://qn.hangjie888.com/16.03fd016.png">
            <div class="mui-media-body">积分兑换</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/activeCenter/activeCenterlist">
            <img src="http://qn.hangjie888.com/15.png">
            <div class="mui-media-body">活动中心</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/joinUs">
            <img src="http://qn.hangjie888.com/14.png">
            <div class="mui-media-body">加盟中心</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
         <router-link to="/feedback">
            <img src="http://qn.hangjie888.com/00.png">
            <div class="mui-media-body">问题反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/customerService">
            <img src="http://qn.hangjie888.com/02.png">
            <div class="mui-media-body">客服中心</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import homesilder from './subcom/silder.vue';
  import axios from 'axios';
  export default {
  	name: 'atml',
  	components: {
  		homesilder
  	},
  	data() {
  		return {
  			lists: [],
        listData: []

  		}
  	},
    computed: {
              optionSingleHeight () {
                  return {
                          //                       （什么都不设置默认的）
                          singleHeight: 60,   // （带停顿的）
                          waitTime:2500 ,//        （停顿时间）
                          // direction: 0          （从上往下的）
                          // direction:2           （左右的）
                          step:1               //（调整速度的）0
                          // hoverStop:false        (鼠标停留停止 离开继续运行（反之则停止）)
                         }
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
  
           that.lists = response.data.data.lunbo;
        });

         axios.get('/v1/home/headline').then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         //console.log("bb",response.data.data);//发生错误时执行的代码
           that.listData = response.data.data;
           
        });
  			
  		}

  	}
  }



</script>

<style scoped>
	
  *{
      margin: 0;
      padding: 0;
   } 
  .title-weipeng{
     height: 80px;
     width: 100%;
     background-color: white;
     position: fixed;
     top: 0px;
     z-index: 999;
  }
  /*头条部分样式*/
  .home-topline{
     height: 120px;
     width: 100%; 
     background-color: white;
     margin-top: 25px;
     box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  }
  .home-topline-tu1{
     height: 100%;
     width:  15%;
     float: left;
  }
  .home-topline-ul{
     height: 100%;
     width: 65%;
     float: left;
  }
  .home-topline-tu2{
     height: 100%;
     width: 20%;
     float: right;
  }
  .home-topline-ul .head{
     border:1px solid red;
     color: red;
     margin-right: 5px;
  }
  .home-topline-ul .title{
     color: #333;
  }
  /*重写九宫格样式*/ 
  
  .mui-content ul li a {
    background: #fff;
    height: 165px;
    border-radius: 15px;
  }
   .mui-content #hoom-foot li a img{
    height: 70px;
  
   }

   /*头条样式*/
   .seamless-warp {
        height: 120px;
        overflow: hidden;
        line-height:60px;
        background: white;
    }
</style>