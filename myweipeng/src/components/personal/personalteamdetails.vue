<template>
   <div id="personalteamdetails-box">
        <!-- 头部部分  -->
        <div class="personalteamdetails-title">
            <router-link to="/personal/personalhome">
              <span><</span>
            </router-link>
            <h5>团队成员</h5>
        </div> 
     <!-- 更新团队信息部分  -->
     <ul class="personalteamdetails-foot">
            <li v-for="(n,i) in teamdetail_list">
                <img :src="teamdetail_list[i].head_pic">
                <span class="personalteamdetails-foot-words">
                    {{ teamdetail_list[i].nickname }}
                <p class="personalteamdetails-foot-words1"> {{ teamdetail_list[i].mobile }}</p> 
                </span>
                <span class="personalteamdetails-foot-icon">{{ teamdetail_list[i].reg_time }}</span>
            </li>
            
       </ul> 
  </div>
</template>

<script>
   import axios from 'axios';
  export default{
    name: 'ersonalitem-box',
    data () {
      return {
         id:0,
         teamdetail_list:[],
         details_cookie:''
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
                 that.team_all(arr2[1]);
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
       team_all(arr) {
         console.log("id",this.id);
         var that = this;
         var url = '/v1/user/my_team_xiaji?access_token='+arr+'&level='+this.id;
         axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
           that.teamdetail_list = response.data.data;
           
        });
      }
     
    }
 }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalteamdetails-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalteamdetails-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalteamdetails-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  
  /*更新团队信息部分*/
  .personalteamdetails-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 108px;
  }
  .personalteamdetails-foot li{
    height: 120px;
    width: 100%;
    line-height: 60px;
    background-color: white;
    list-style: none;
    margin-top: 15px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
  }
  .personalteamdetails-foot li a{
    height: 100px;
    width: 100%;
    line-height: 100px;
  }
  .personalteamdetails-foot li img{
     height:50px; 
     margin-top: 20px;
     margin-left: 30px;
     float: left; 
  }
  .personalteamdetails-foot-words{
     font-size: 30px;
     width: 100px;
     height: 100%;
     float: left;
     margin-left: 20px;
     color: #000;
  }
  .personalteamdetails-foot-icon{
     font-size: 30px;
     line-height: 120px;
     float: right;
     margin-right: 30px;
     color: #888;
  }
</style>