<template>
  <div id="tsml">
    <!-- 1.0 商品轮播图 -->
    <div class="silder">
    	<goodsilder :imgs="imgs"></goodsilder>
    </div>
    <!-- 2.0 实现商品购买区 -->
    <div id="buy">
	  <h4 v-text="info.title"></h4>
	  <p class="line"></p>
	  <ul>
	    <li class="price">
	      市场价: <s>￥{{info.market_price}}</s> 销售价：<span>￥{{info.sell_price}}</span>
	    </li>
	    <li>
	    	<li class="inputli">
	            购买数量:
	      		<inputnumber v-on:dataobj="getcount" class="inputnumber"></inputnumber>
	      		<transition name="show" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                  <div v-if="isshow" class="ball"></div>
                </transition>
	    </li>
	    <li>
	      <mt-button type="primary" size="small">立即购买</mt-button>
	      <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
	    </li>
	  </ul>
    </div>

    <div id="params">
      <h6>商品参数</h6>
      <p class="line"></p>
      <ul>
        <li>商品货号：{{info.goods_no}}</li>
        <li>库存情况：{{info.stock_quantity}}</li>
        <li>上架时间：{{info.add_time}}</li>
      </ul>
    </div>
    <!-- 3.0 图文详情 -->
    <!-- 4.0 商品评论 -->
    <div id="other">
     <router-link v-bind="{to: '/goods/goodsdesc/'+id}">
        <mt-button plain class="imgdesc" type="primary" size="large">图文详情</mt-button>
     </router-link>
      <mt-button plain type="danger" size="large">商品评论</mt-button>
    </div>
  </div>
</template>

<script>
	import goodsilder from '../subcom/silder.vue';
	import { Toast } from 'mint-ui';
	import inputnumber from '../subcom/inputNumber.vue';
	import { vm, COUNTSTR } from '../../kits/vm.js';
	import { setItem, valueObj } from '../../kits/localSg.js';
	export default {
		components: {
		    goodsilder,
			inputnumber
		},
		data() {
			return {
				isshow: false,
				inputNumberCount: 1,//表示当前购买商品的数量
				id: 0, //表示商品id
				imgs: [],
				info: {} //存储商品详细信息
			}
		},
		created() {
			//获取url传入的商品id值
			this.id = this.$route.params.id;
			this.getimgs();
			this.getinfo();
		},
		methods: {
			//动画三个方法
			beforeEnter(el) {
				//设定小球的初始位置
				el.style.transform = "translate(0px 0px)";
			},
			enter(el, done) {
				//保证小球出现动画
				el.offsetWidth;
				//设置小球的结束位置
				el.style.transform = "translate(75px,366px)";
				//结束动画
				done();
			},
			afterEnter(el) {
				//重置小球的初始状态
				this.isshow = !this.isshow;
			},
			//加入购物车
			toshopcar() {
				//触发事件
				vm.$emit(COUNTSTR, this.inputNumberCount);
				//将数据保存到localStroage中
				  valueObj.goodsid = this.id;
				  valueObj.count = this.inputNumberCount;
				  setItem(valueObj);
				//实现小球动画
				this.isshow = !this.isshow;
			},
			getcount(count) {
				this.inputNumberCount = count;
				console.log(count);
			},
			getimgs() {
				var url = '../../../static/json/goodslunbo' + this.id + '.json';
				this.$http.get(url).then(function(res) {
						if(res.body.status != 0) {
							Toast(res.body.message);
							return;
						}
						this.imgs = res.body.message;

				})
			},
			getinfo() {
				var url = '../../../static/json/goodslist.json';
				this.$http.get(url).then(function(res) {
					var body = res.body;
					if(body.status != 0){
						alert(body.message);
						return;
					}
					for(var i = 0; i < body.message.length; i++) {
						if(this.id == body.message[i].id) {
							console.log(body.message[i]);
							this.info = body.message[i];
							console.log(this.info);
						}
					}
				})
			}
		}

	}
</script>

<style scoped>
  .silder {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    margin: 5px;
  }
  
  #buy,
  #params,
  #other {
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
  
  .line {
    height: 1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  #buy ul,
  #params ul {
    padding-left: 0px;
  }
  
  #buy h4 {
    color: #0094ff;
    padding: 5px;
  }
  
  #buy li,
  #params li {
    list-style: none;
    padding: 8px;
  }
  
  #buy .price span {
    color: red;
  }
  
  #other .imgdesc {
    margin-bottom: 20px;
  }

  .inputli {
  	position: relative;
  }

  .inputnumber {
  	position: absolute;
  	left: 100px;
  	top: 5px;
  }
  .ball {
  	background-color: red;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    left: 150px;
    top: 10px;
    transition: all 0.4s ease;
    z-index: 100;
  }
</style>

