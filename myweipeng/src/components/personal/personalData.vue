<template>
   <div id="personalData-box">
        <!-- 头部部分  -->
        <div class="personalData-title">
            <router-link to="/home">
              <span><</span>
            </router-link>
            <h5>个人资料</h5>
        </div> 
        <!-- 资料展示部分  -->
        <div class="personalData-head">
             <span class="personalData-head-left">我的头像</span>
             <span class="personalData-head-right"> 
                <img :src="data_list.head_pic" >
                <el-upload
                  class="avatar-uploader"
                  action="http://cs.yeshitou.com/Admin/Uploadify/uploadFile/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             </span>
        </div>
       <ul class="personalData-foot">
            <li>
                <router-link to="./personalPhone">
                    <span class="personalData-foot-words">
                       手机号：{{data_list.mobile}}
                    </span>
                </router-link> 
            </li>
            <li> 
               <span class="personalData-foot-name">昵称：</span>   
               <input class="personalData-footName" v-model="input" :placeholder="data_list.nickname" @change="changeName">     
            </li>
            <li>
                <router-link to="/personal/personalAddress">
                    <span class="personalData-foot-words">
                       &nbsp &nbsp地址：{{ data_list.address }}
                    </span>
                </router-link> 
            </li>
       </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import ElementUI from 'element-ui';
  export default {
    data() {
      return {
        imageUrl: '',
        data_list: [],
        input:'',
        header:'',
        data_cookie:'',
        seen:''
      }
    },
    created() {
      this.getCookie();
      this.data_git();
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
               that.myData_cookie(arr2[1]); 
            }else if(arr2[0]=='userPwd'){
                that.getetle(arr2[1])  
              }
           
           
          }
        }
      },
      //存cookie
      myData_cookie(arr){
          this.data_cookie = arr;
      },
      //判断是否ref tookin过期
      getetle: function(tookin){
           var  that = this;
           console.log("Mytookin",tookin)  
           if(!tookin){
              that.$router.push('/login')
           } 
      },
      data_git(arr) {
          var arr1 =  this.data_cookie;
          var that = this;
          var url = '/v1/user/user_core?access_token='+arr1;
          axios.get(url).then(function(response){
             console.log("aa",response);//请求正确时执行的代码
          }).catch(function (response){

           console.log("bb",response.data);//发生错误时执行的代码
             that.data_list = response.data.data;
             
          });
        },
       handleAvatarSuccess(res, file,fileList) {
            var arr3= this.data_cookie;
            var that = this;
            this.imageUrl = URL.createObjectURL(file.raw);
            var url = '/v1/user/edit_head_pic?access_token='+arr3;
            //console.log(file.response.url)
            var fileIurl = file.response.url;
            axios.post(url,{
                 head_pic: fileIurl
            })
            .then(function (response) {
              console.log("aa",response);
            })
            .catch(function (error) {

                if(error.data.code == 200){
                  //alert("cc",error.data.msg);
                  that.data_git()
                  // that.$router.push('/taskCenter/taskCenterinfo')
                }else{
                   alert(error.data.msg)
                }
               
            });
       },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      changeName(){
          var that =this;
          var arr5 = this.data_cookie;
          var url = '/v1/user/edit_nickname?access_token='+arr5;
          //console.log("dd",this.input)
          axios.post(url,{
                 nickname: this.input
            })
            .then(function (response) {
              console.log("aa",response);
            })
            .catch(function (error) {

                if(error.data.code == 200){
                  alert(error.data.msg);
                  that.data_git()
                  // that.$router.push('/taskCenter/taskCenterinfo')
                }else{
                   alert(error.data.msg)
                }
               
            });
      }
    }
  }

</script>

<style lang="css" scoped>
   /*头部样式*/
   .personalData-title{
      height: 88px;
      width: 100%;
      position: fixed;
      top: 0px;
      background-color: white;
   }
   .personalData-title a{
      font-size: 50px;
      color: #666;
      margin-left: 20px;
   }
   .personalData-title h5{
     display: inline-block;
     margin-top: 20px;
     margin-left: 6px;
     font-size: 40px;
     color: #333;
  }
  /*资料展示部分样式*/
  .personalData-head{
     margin-top: 108px;
     margin-bottom: 20px;
     height: 100px;
     width: 100%;
     background-color: white;
     box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
  .personalData-head-left{
     height: 100px;
     width: 300px;
     float: left;
     color: #000;
     line-height: 100px;
     font-size: 30px;
     margin-left: 28px;
  }
  .personalData-head-right{
     height: 80px;
     width: 80px; 
     line-height: 80px;
     float: right;
     margin-top: 10px;
     margin-right: 28px;
     position: relative;
  }
  .personalData-head-right img{
     height: 100%;
     width: 100%;
     border-radius: 50%;
  }
  .personalData-head-right .avatar-uploader{
     position: absolute;
     top: 0px;
     width: 100%;
     height: 100%;
     opacity: 0;
  }
 /*任务跳转部分*/
  .personalData-foot{
    height: 500px;
    width: 100%;
    box-sizing: border-box;
  }
  .personalData-foot li{
    height: 100px;
    width: 100%;
    line-height: 100px;
    background-color: white;
    list-style: none;
    margin-top: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.4)
  }
  .personalData-foot li a{
    height: 100px;
    width: 100%;
    line-height: 100px;
  }
  .personalData-foot-name{
    width: 20%;
    float: left;
    font-size: 30px;
    padding-left: 56px;
  }

  .personalData-footName{
     width: 80%; 
     font-size: 30px;
     height: 100%;
     float: left;
     color: #000;
     border: 1px solid white;
  }

  .personalData-foot-words{
     font-size: 30px;
     float: left;
     margin-left: 28px;
     color: #000;
  }
  input::-webkit-input-placeholder {
        color: #000;
  }
</style>