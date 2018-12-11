<template>
   <div id="maid-box">
    <!-- 头部部分  -->
      <div class="maid-title">
          <router-link to="/home">
             <span><</span>
          </router-link>
          <h5>如何赚佣</h5>
      </div>
      <div class="maid-foot">
           <img :src= "message"/>
      </div>
   </div>
</template>    
<script>
    import axios from  'axios';
    export default {
      name: 'maid-box',
      data () {
        return {
          message:''
        }
      },
      created(){
          this.getPictures();
      },
      methods: {
          getPictures(){
                  var that = this;
                  var url = '/v1/home/headline?type=2' 
                  axios.get(url).then(function(response){
               //console.log("bb",response);//请求正确时执行的代码
                  }).catch(function (response){

                   that.message= response.data.data[0].thumb;
                   console.log("bb", that.message);//发生错误时执行的代码
                   
                      //console.log("cc",that.tash_list.single_price);
                });   
               } 
      }
    }
</script>

<style>
   /*头部样式*/
   .maid-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .maid-title a{
      font-size: 50px;
      color:rgba(0, 0, 0, 1);
      margin-left: 20px;
   }
   .maid-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 42px;
     color: rgba(0, 0, 0, 1);
  }
  /*foot样式*/
  .maid-foot{
      margin-top: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 1);
  }
   .maid-foot img{
      height: 100%;
      width: 100%;
   }
</style>