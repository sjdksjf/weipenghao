<template>
   <div id="personalitem-box">
        <!-- 头部部分  -->
        <div class="personalitem-title">
            <router-link to="/personal/personalhome">
              <span><</span>
            </router-link>
            <h5>我的团队</h5>
        </div> 
     <!-- 更新团队信息部分  -->
     <ul class="personalitem-foot">
            <li>
                <router-link v-bind="{to:'/personal/personalteamdetails/'+1}">
                    <img src="http://qn.hangjie888.com/geren1.png">
                    <span class="personalitem-foot-words">普通用户</span>
                    <span class="personalitem-foot-icon">{{ team_list.feihui }}人&nbsp&nbsp></span>
                </router-link> 
            </li>
            <li>
                <router-link v-bind="{to:'/personal/personalteamdetails/'+2}">
                    <img src="http://qn.hangjie888.com/geren1.png">
                    <span class="personalitem-foot-words">普通VIP</span>
                    <span class="personalitem-foot-icon">{{ team_list.putong }}人&nbsp&nbsp></span>
                </router-link> 
            </li>
            <li>
                <router-link v-bind="{to:'/personal/personalteamdetails/'+3}">
                    <img src="http://qn.hangjie888.com/geren1.png">
                    <span class="personalitem-foot-words">钻石VIP</span>
                    <span class="personalitem-foot-icon">{{ team_list.zhuanshi }}人&nbsp&nbsp></span>
                </router-link> 
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
         team_list:[]
      }
    },
    created() {
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
        var that = this;
         var url = '/v1/user/my_team?access_token='+arr;
         axios.get(url).then(function(response){
           console.log("aa",response);//请求正确时执行的代码
        }).catch(function (response){

         console.log("bb",response.data.data);//发生错误时执行的代码
           that.team_list = response.data.data;
           
        });
      }
     
    }
 }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalitem-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalitem-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalitem-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  
  /*更新团队信息部分*/
  .personalitem-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 108px;
  }
  .personalitem-foot li{
    height: 100px;
    width: 100%;
    line-height: 100px;
    background-color: white;
    list-style: none;
    margin-top: 15px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
  }
  .personalitem-foot li a{
    height: 100px;
    width: 100%;
    line-height: 100px;
  }
  .personalitem-foot li img{
     height:50px; 
     margin-top: 20px;
     margin-left: 30px;
     float: left; 
  }
  .personalitem-foot-words{
     font-size: 30px;
     float: left;
     margin-left: 20px;
     color: #000;
  }
  .personalitem-foot-icon{
     font-size: 26px;
     float: right;
     margin-right: 30px;
     color: #888;
  }
</style>