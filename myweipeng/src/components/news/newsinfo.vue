<template>
  <div id="tml">
     <!-- 头部部分  -->
    <div class="newslist-title">
        <router-link to="/home">
             <span><</span>
        </router-link>
        <h5>微朋头条</h5>
    </div> 
      <!--1.0 实现新闻详情-->
    <div class="title">
      <h4 v-text="info.title"></h4>
      <p>
        <span>{{ info.past_time }}</span>
        <img class="info_img" :src="info.thumb">
        <p>{{info.description}}</p>
        <div id="content" v-html="info.content"></div>
      </p>
    </div>
    <!-- 调用评论组件 -->
   <!--  <comment></comment> -->
  </div>
</template>

<script>
  import comment from '../subcom/comment.vue';
  import axios from 'axios';
  export default {
  	name: 'tml',
    components: {
      comment
    },
  	data() {
  		return {
  			id: 0,
        info: {}
  		}
  	},
  	created() {
  		this.id = this.$route.params.id;
      this.getinfo();
  	},
  	methods: {
  		getinfo() {

        var that = this;
        axios.get('/v1/home/headline').then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
          // that.list = response.data.data;
          for(var i = 0;i< response.data.data.length; i++){
               if(that.id == response.data.data[i].article_id){
                   that.info = response.data.data[i];
               }
          }
           console.log("bb",that.info);  
        });
  			/*var url='../../../static/json/newsinfo.json';
  			this.$http.get(url).then(function(res){
  				var body = res.body;
  				if(body.status != 0){
  					alert(body.message);
  					return;
  				}
          for(var i = 0; i < body.message.length; i++){
            if(this.id == body.message[i].id){
              this.info = body.message[i];
            }
            
          }
  				
  			})*/
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
  /*头部下面样式*/
	 .title h4 {
    color: #0094ff;
  }
  .title p {
    color: rgba(0, 0, 0, 0.5);
  }
  .title,
  #content {
    padding: 5px;
  }
  #content {
    line-height: 27px;
  }
  .info_img{
    width: 100%;
  }
</style>