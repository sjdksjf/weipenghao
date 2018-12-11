<template>
  <div id="tml">
    <!-- 头部部分  -->
    <div class="newslist-title">
        <router-link to="/home">
             <span><</span>
        </router-link>
        <h5>微朋头条</h5>
    </div> 
    <!--使用mui框架，实现新闻资讯列表样式-->
    <ul class="mui-table-view">
      <li v-for="item in list" class="mui-table-view-cell mui-media">
        <router-link v-bind="{to:'/news/newsinfo/'+item.article_id}">
          <img class="mui-media-object mui-pull-left" :src="item.thumb">
          <div class="mui-media-body">
            {{item.title}}
            <p class='mui-ellipsis' v-text="item.zhaiyao" style="margin-top: 3px;"></p>
            <div class="ft">
              <span>发表时间：{{item.publish_time }}</span>
          
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
  	name: 'tml',
  	data() {
  		return {
  			list: []
  		}
  	},
  	created() {
  		this.getnewslist();
  	},
  	methods: {
  		getnewslist() {
        var that = this;
  			 axios.get('/v1/home/headline').then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
           that.list = response.data.data;
           
        });
  		}
  	}
  }
</script>

<style scoped>
   /*头部样式*/
   .newslist-title{
      height: 88px;
      width: 100%;
      background-color: white;
      margin-bottom: 20px;
      position: fixed;
      top: 0;
   }
   .newslist-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .newslist-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  /*头条下面样式*/
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
    margin-top: 1.5em;
    font-size: 14px;
    color: #0094ff;
  }
</style>