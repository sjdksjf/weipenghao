<template>
  <div class="manager">
    <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <new-pzzia></new-pzzia>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- 品种展示 -->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <!-- <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody> -->
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import NewPzzia from './NewPzzia'
export default {
  name: 'manager',
  components: {
      'new-pzzia': NewPzzia
  },
  data () {
    return {
      // name: 'mary'
    }
  },
  // beforeRouteEnter(to, from, next) {
  //     // alert('hello'+this.name);// 在渲染该组件的对应路由被 confirm 前调用
                                     // 不！能！获取组件实例 `this`
                                     // 因为当守卫执行前，组件实例还没被创建
  //     next((vm)=>{
  //         alert('hello ' + vm.name);
  //     });
  // },
 /* beforeRouteLeave (to, from , next) {
	  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
	  if (answer) {
	    next()
	  } else {
	    next(false)
	  }
  }*/
  // 导航离开该组件的对应路由时调用
   // 可以访问组件实例 `this`
}
</script>

<style scoped>

</style>
