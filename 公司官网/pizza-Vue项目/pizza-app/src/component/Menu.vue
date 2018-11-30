<template>
  <div class="menunav row">
  	<!-- pizza列表 -->
    <div class="col-sm-12 col-md-8">
    	<table class="table">
    		<thead class="thead-default">
    			<tr>
    				<th>尺寸</th>
    				<th>价格</th>
    				<th>加入</th>
    			</tr>
    		</thead>
    		<tbody v-for="item in getMenuItems" :key="item.name">
    			<tr>
    				<td>
    				    <strong>{{ item.name }}</strong>
    			    </td>
    		   </tr>
    		   <tr v-for="info in item.options" :key="info.size">
    		   	    <td>{{ info.size }}</td>
    		   	    <td>{{ info.price }}</td>
    		   	    <td><button class="btn btn-sm btn-outline-success" @click="addInfo(item, info)">+</button></td>
    		   </tr>
    		</tbody>
    	</table>  	
    </div>
    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
    	<div v-if="this.goods.length > 0">
			<table class="table">
				<thead class="thead-default">
					<tr>
						<th>数量</th>
						<th>品种</th>
						<th>价格</th>
					</tr>
				</thead>
				<tbody  v-for="good in goods" :key="good.size">
					<tr>
						<td>
						  <button class="btn btn-sm" @click="reduceQuantity(good)">-</button>
						  <span>{{ good.quantity }}</span>
						  <button class="btn btn-sm" @click="addQuantity(good)">+</button>
						</td>
						<td>{{ good.name }} {{ good.size }}</td>
						<td>{{ good.price * good.quantity }}</td>
					</tr>
				</tbody>
			</table>
			<p>总价: {{ total + 'RMB' }}</p>
			<button class="btn btn-success btn-block">提交</button>
    	</div>
    	<div v-else>
    		{{ alertText }}
    	</div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'menunav',
  data () {
    return {
      goods: [],
      alertText: '对不起，你的购物车还没有商品!',
      getMenuItems:{
          1: {
            'name': '榴莲pizza',
            'description': '这是喜欢吃榴莲朋友的最佳选择',
            'options': [{
              'size': 9,
              'price': 38
            }, {
              'size': 12,
              'price': 48
            }]
          },
          2: {
            'name': '芝士pizza',
            'description': '芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚',
            'options': [{
              'size': 9,
              'price': 38
            }, {
              'size': 12,
              'price': 48
            }]
          },
          3: {
            'name': '夏威夷pizza',
            'description': '众多人的默认选择',
            'options': [{
              'size': 9,
              'price': 36
            }, {
              'size': 12,
              'price': 46
            }]
          }
        }}
      },
      computed: {
        total() {
          let totalCast = 0;
          for(let goodIndex in this.goods) {
              let individualItem = this.goods[goodIndex];
              totalCast += individualItem.price * individualItem.quantity;
          }
          return totalCast; 
        }
      },
      methods: {
        addInfo(item, info) {
          let gooditem = {
            name: item.name,
            size: info.size,
            price: info.price,
            quantity: 1
          }
          if(this.goods.length > 0) {
            let result = this.goods.filter((goodlist)=>{
                  return (goodlist.name === item.name && goodlist.price === info.price)
            });
            if(result != null && result.length > 0){
                result[0].quantity++
              } else {
                this.goods.push(gooditem);
              }
          } else {
            this.goods.push(gooditem);
          }
          
      },
        addQuantity(good) {
            good.quantity++
        },
        reduceQuantity(good) {
          good.quantity--
            if(good.quantity <= 0) {
                let indexNum = this.goods.indexOf(good);
                this.goods.splice(indexNum, 1);
            }
        }
      }  
    }
</script>

<style scoped>
    .menunav {
    	margin-top: 20px;
    }
</style>
