<template>
  <div class="orderfile card text-dark bg-light mb-3">
      <div class="card-header">订单列表</div>
          <div class="card-body">
              <h5 class="card-title">1. 黄焖鸡米饭</h5>
              <p class="card-text">
              	姓名： 张三<br>
              	手机号码： 18803743256<br>
              	份数：1 <br>
              	口味：多放辣 <br>
              	其它：多加一份米饭
               	
              </p>
          </div>
  </div>
</template>

<script>
export default {
  name: 'orderfile',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
    .orderfile {
        margin-top: 6px;
    }
</style>
