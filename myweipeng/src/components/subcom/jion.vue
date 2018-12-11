<template>
  <div id="join">
    <div class="border">
      <div @click="closeDialog" class="closeImg"></div>
      <span class="message">信息提交成功</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "join",
    data(){
      return {}
    },
    methods:{
      closeDialog(){
         //给父组件传参
         this.$emit('closeDialog',false)
      }
    }
  }
</script>
 
<style scoped>
  #join{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
  }
  .message{
    position: absolute;
    top: 50%;
    right: 20%;
    font-size: 36px;
  }
  .closeImg{
    width: 90px;
    height: 90px;
    position: absolute;
    top: 16%;
    right: 50%;
    margin-right: -45px;
    cursor: pointer;
    background-image: url(http://qn.hangjie888.com/fk1.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .border{
    text-align: center;
    background-color: white;
    border-radius: 20px;
    width: 50%;
    height: 20%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>