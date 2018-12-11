<template>
   <div id="personalhome-box">
        <!-- 头部部分  -->
        <div class="personalhome-title">
            <router-link to="/home">
              <span><</span>
            </router-link>
            <h5>个人中心</h5>
        </div> 
       <!-- 个人信息部分  --> 
        <div class="personalhome-center">
            <div class="personalhome-center-head">
                <router-link to="/personal/personalData">
                <img :src="home_list.head_pic">
                </router-link>
            </div>
            <div class="personalhome-center-phone">
               {{home_list.nickname}}
            </div>
            <ul class="personalhome-center-foot">
               <li class="personalhome-center-line">
                  <router-link to="/personal/personalhome">
                    <p>总收入</p>
                    <p> {{home_list.general_income}}</p>
                  </router-link>

                 <!--  <router-link to="/personal/personalTotalIncome">
                    <p>总收入</p>
                    <p> {{home_list.general_income}}</p>
                  </router-link> -->
               </li>
               <li class="personalhome-center-line">
                   <router-link to="/personal/personalhome">
                    <p>今日收入</p>
                    <p>{{home_list.daily_income}}</p>
                  </router-link>
                 <!--  <router-link to="/personal/personalTodayIncome">
                    <p>今日收入</p>
                    <p>{{home_list.daily_income}}</p>
                  </router-link> -->
               </li>
               <li>
                  <router-link to="/personal/personalWithdeawal">
                    <p>提现</p>
                    <p>{{home_list.day_withdrawals}}</p>
                  </router-link>
               </li>
            </ul>
        </div>
     <!-- 更新团队信息部分  -->
     <ul class="personalhome-foot">
            <li>
                <router-link to="./personalteam">
                    <img src="http://qn.hangjie888.com/geren1.png">
                    <span class="personalhome-foot-words">我的团队</span>
                    <span class="personalhome-foot-icon">></span>
                </router-link> 
            </li>
            <li>
                <router-link to="/personal/personalAlipay">
                    <img src="http://qn.hangjie888.com/geren2.png">
                    <span class="personalhome-foot-words">绑定支付宝</span>
                    <span class="personalhome-foot-icon">></span>
                </router-link> 
            </li>
            <li>
                <router-link to="/personal/personalWithdeawal">
                    <img src="http://qn.hangjie888.com/geren3.png">
                    <span class="personalhome-foot-words">提现</span>
                    <span class="personalhome-foot-icon">></span>
                </router-link> 
            </li>
             <li>
                <router-link to="./taskCenterlist">
                    <img src="http://qn.hangjie888.com/geren4.png">
                    <span class="personalhome-foot-words">检查更新</span>
                    <span class="personalhome-foot-icon">></span>
                </router-link> 
            </li>
       </ul> 
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        home_list: []
      }
    },
    created() {
      this.home_text();
      this.getCookie();
    },
    methods: {
      //读取cookie
      getCookie:function () {
        var that = this;
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          //console.log("aa",arr)
          //var str = arr[1].slice(8);
          //console.log(str)
          //this.home_text(str)   
          
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
           // console.log("dd",arr2)
            if(arr2[0]=='userName'){
              // console.log("cc",arr2[1])
               that.home_text(arr2[1]) 
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
      home_text(arr) { 
        var that = this;
        var url = '/v1/user/user_core?access_token='+arr;

         if(arr){
            axios.get(url).then(function(response){
               console.log("aa",response);//请求正确时执行的代码
            }).catch(function (response){

               console.log("qq",response.data.msg.access_token)
              console.log("bb",response.data.code);//发生错误时执行的代码
              if(response.data.code == 40000){
                  axios.get('http://cs.yeshitou.com/v1/user/access_token').then(function(response){
                           console.log("aa",response);//请求正确时执行的代码
                        }).catch(function (response){

                          that.home_text()
                          
                        });
              }

               that.home_list = response.data.data;
               
            });
         }
        
      }
    }
  }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalhome-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalhome-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalhome-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  /*个人信息部分样式*/
  .personalhome-center{
      height: 400px;
      width: 100%;
      background-color: white;
      position: relative;
      box-sizing: border-box;
      margin-top: 108px;
      box-shadow: 0 0  3px #888;
  }
  .personalhome-center-head{
      height: 120px;
      width: 120px;
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -60px;
      background-color: pink;
      border-radius: 50%;
  }
  .personalhome-center-head img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
  }
  .personalhome-center-phone{
      height: 120px;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 170px;
      font-size: 36px;
  }
  .personalhome-center-foot{
      height: 150px;
      width: 100%;
      position: absolute;
      top: 260px;
      border-top: 2px solid #888;
  }
   .personalhome-center-foot li{
      height: 60%;
      width: 33%;
      text-align: center;
      float: left;
      margin-top: 15px;
   }
   .personalhome-center-foot li a{
      width:100%;
      height: 100%;
   }
   .personalhome-center-foot li p{
      color: #000;
   }
   /*线*/
   .personalhome-center-foot .personalhome-center-line{
       border-right: 1px solid #888;
   }
  /*更新团队信息部分*/
  .personalhome-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
  }
  .personalhome-foot li{
    height: 100px;
    width: 100%;
    line-height: 100px;
    background-color: white;
    list-style: none;
    margin-top: 15px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
  }
  .personalhome-foot li a{
    height: 100px;
    width: 100%;
    line-height: 100px;
  }
  .personalhome-foot li img{
     height:50px; 
     margin-top: 20px;
     margin-left: 30px;
     float: left; 
  }
  .personalhome-foot-words{
     font-size: 30px;
     float: left;
     margin-left: 20px;
     color: #000;
  }
  .personalhome-foot-icon{
     font-size: 35px;
     float: right;
     margin-right: 30px;
     color: #888;
  }
</style>