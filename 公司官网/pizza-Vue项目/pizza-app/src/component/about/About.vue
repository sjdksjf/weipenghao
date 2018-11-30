<template>
  <div class="about container">
    <div class="row mb-5">
    	<div class="col-4">
    		<div class="list-group mb-5">
    			<router-link tag="li" class="nav-link" :to="{name: 'newLink'}">
    				<a class="list-group-item list-group-item-action">新闻中心</a>
    			</router-link>
    		</div>
    		<div class="list-group mb-5">
    			<router-link tag="li" class="nav-link" :to="{name: 'contactLink'}">
    				<a class="list-group-item list-group-item-action">联系我们</a>
    			</router-link>
    		</div>
    		<div class="list-group mb-5">
    			<router-link tag="li" class="nav-link" :to="{name: 'orderLink'}">
    				<a class="list-group-item list-group-item-action">点餐文档</a>
    			</router-link>
    		</div>
    		<div class="list-group mb-5">
    			<router-link tag="li" class="nav-link" :to="{name: 'expressLink'}">
    				<a class="list-group-item list-group-item-action">快递信息</a>
    			</router-link>
    		</div>	
    	</div>
    	<div class="col-8"> 
            <!-- <new-center></new-center> -->
    		<router-view></router-view>
    	</div>
    	
    </div>
  </div>
</template>

<script>
// import NewCenter from './NewCenter'
export default {
  name: 'about',
  data () {
    return {
      
    }
  },
  components: {
  	// 'new-center': NewCenter
  }
}
</script>

<style scoped>

</style>
