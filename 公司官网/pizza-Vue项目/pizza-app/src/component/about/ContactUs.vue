<template>
  <div class="contactus card text-dark bg-light mb-3">
      <div class="card-header">联系我们</div>
          <div class="card-body">
              <h4 class="card-title">联系我们</h4>
              <p class="card-text">1732086961@qq.com</p>
              <router-link :to="{name: 'phoneLink'}">联系电话</router-link>
              <router-link :to="{name: 'personNameLink'}">联系人姓名</router-link>
          </div>

          <div>
          	<router-view></router-view>
          </div>
  </div>
</template>

<script>
export default {
  name: 'contactus',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
    .contactus {
        margin-top: 6px;
    }
</style>
