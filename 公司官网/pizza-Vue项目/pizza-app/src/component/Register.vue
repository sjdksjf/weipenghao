<template>
  <div class="register container">
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
    					<div class="form-group">
    						<label for="password">确认密码</label>
    						<input
    						type="password"
    						class="form-control"
    						v-model="confirmPassword" 
    						>
    					</div>
    					<button type="submit" class="btn btn-block btn-sucess">注册</button>
    				</form>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      passWord: '',
      confirmPassword: ''
    }
  },
  methods: {
  	onSubmit() {
       if(this.passWord === this.confirmPassword) {
           const formData = {
           	   email: this.email,
           	   password: this.passWord,
           	   confirmpassword: this.confirmPassword
           }
           axios.post('/zhcu.json',formData).then((res)=>{
               console.log(res);
               this.$router.push({name: 'loginLink'})
           })
       } else {
       	alert('两次密码不一致！');
       }
  	}
  }
}
</script>

<style scoped>
    .register img {
    	width: 400px;
    }
</style>
