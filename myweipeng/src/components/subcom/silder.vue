<template>
	<div id="tml">
		<mt-swipe :auto="2000">
			<mt-swipe-item v-for="item in imgs" :key="">
				<img :src="item.slide_img1_1">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	
	export default {
		name: 'tml',
		props: ['imgs'] //用来接收父组件传入过来的数据
	}
</script>

<style scoped>
	/*重写轮播样式*/

  .mint-swipe {
      height: 4.6rem;
   }
  .mint-swipe-item {
      width: 100%;
      height: 4.6rem;
  }
  .mint-swipe-item img {
      width: 100%;
      height: 100%;
  }
	
</style>
