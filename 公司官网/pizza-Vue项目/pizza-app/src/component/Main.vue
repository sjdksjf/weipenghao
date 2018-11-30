<template>
  <div class="mainnav container">
        <h1>Main</h1>
        <!-- <button @click="goTo" class="btn btn-success">跳转</button> -->
  </div>
</template>

<script>
export default {
  name: 'mainnav',
  data () {
    return {
      
    }
  },
  methods: {
  	goTo() {
        // this.$router.go(-1)
        // this.$router.replace('/login')
        // this.$router.replace({name: 'loginLink'})
        // this.$router.push('/login')
        // this.$router.push({name: 'loginLink'})
  	}
  }
}
</script>

<style scoped>

</style>
