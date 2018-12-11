<template>
   <div id="receiveList-box">
    <!-- 头部部分  -->
      <div class="receiveList-title">
          <router-link to="/home">
              <span><</span>
          </router-link>
          <h5>免费领取</h5>
      </div>
    <!-- 图文部分  -->  
      <ul class="mui-table-view receiveList-center">
            <li v-for="item in receive_arr" class="mui-table-view-cell mui-media">
                <img  :src="item.original_img">
                <div class="mui-media-body">
                  {{item.goods_name}}
                  <p class='mui-ellipsis' v-text="item.keywords" style="margin-top: 3px;"></p>
                </div>
                <router-link v-bind="{to:'/receive/receiveinfo/'+item.goods_id}"> 
                     查看
                </router-link>
            </li>
         <!--  <li class="mui-table-view-cell mui-media">       
                  <img src="http://qn.hangjie888.com/h2.png">
                  <div class="mui-media-body">
                      幸福
                      <p class='mui-ellipsis'>能和</p>
                  </div>
                  <router-link to="/receive/receiveinfo">
                        领取
                  </router-link>
          </li> -->
      </ul>
     
   </div>
</template>    
<script>
import axios from 'axios';
export default {
  name: 'releasetask-center',
  data () {
    return {
        receive_arr:[] 
    }
  },
  created() {
    this.Submit_release();
  },
  methods: {
   Submit_release:function(){
           var that = this;
           var url = '/v1/goods/goods_list';
           axios.get(url)
          .then(function (response) {
            console.log("aa",response);
          })
          .catch(function (error) {
               console.log("rr",error.data.data) 
               that.receive_arr = error.data.data;
          
          });
    },
    
  }
}
</script>

<style lang="css" scoped>
   /*头部样式*/
   .receiveList-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .receiveList-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .receiveList-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: rgba(0, 0, 0, 1);
  }
  /*图文部分样式*/

  .mui-media{
    height: 300px;
    width: 30%;
    float: left;
    margin-top: 20px;
    background-color: white;
    margin-left:2%; 
    position: relative;
  }
  .receiveList-center{
    margin-top: 90px;
  }
  .mui-media img{
    height: 110px;
    width: 100%;
  }
  .mui-media .mui-media-body{
    font-size: 28px;
  }
  .mui-media .mui-ellipsis{
    font-size: 20px;
  }
  .mui-media a{
    width: 110px;
    height: 40px;
    line-height: 10px;
    font-size: 14px;
    color: white !important;
    float: right;
    border-radius: 10px;
    background-color: red;
    text-align: center;
    position: absolute;
    top: 90%;
    right: 18%;
  }
 
</style>