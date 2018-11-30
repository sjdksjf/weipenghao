<template>
  <div id="app">
    <header-nav></header-nav>
    <div class="container">
      <router-view></router-view> 
    </div>
    <div class="container">
        <div class="row">
          <!-- router-view复用 -->
          <div class="col-sm-12 col-md-4">
            <router-view name="orderingGuide"></router-view>
          </div>
          <div class="col-sm-12 col-md-4">
            <router-view name="delivery"></router-view>
          </div>
          <div class="col-sm-12 col-md-4">
            <router-view name="newCenter"></router-view>
          </div>    
        </div>
    </div>
    
  </div>
</template>

<script>
import Header from './component/Header'
export default {
  name: 'app',
  components: {
    'header-nav': Header
  },
  data () {
    return {
     
    }
  }
}
</script>

<style>

</style>
