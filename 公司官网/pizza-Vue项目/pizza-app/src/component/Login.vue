<template>
  <div class="login container">
    <div class="row mt-3">
    	<div class="col-md-12 col-lg-12">
    		<div class="card">
    			<div class="card-body">
    				<img class="mx-auto d-block" src="../../src/assets/pizza.jpg" alt="">
    				<form @submit.prevent="onSubmit">
    					<div class="form-group">
    						<label for="email">邮箱</label>
    						<input
    						type="email"
    						class="form-control"
    						v-model="email" 
    						>
    					</div>
    					<div class="form-group">
    						<label for="password">密码</label>
    						<input
    						type="password"
    						class="form-control"
    						v-model="passWord" 
    						>
    					</div>
    					<button type="submit" class="btn btn-block btn-sucess">登录</button>
    				</form>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      passWord: ''
    }
  },
  methods: {
  	onSubmit() {
  	}
  }
}
</script>

<style scoped>
    .login img {
    	width: 400px;
    }
</style>

