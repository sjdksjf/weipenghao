// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧分类被选中的下标
    logs:[],
    carts: [],               // 购物车列表
    hasList: false, 
    setList: false,         // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true    // 全选状态，默认全选
  },
  // 开关蒙版
  switchMask:function(){
    var goods_datas = {};
    var all_cart = wx.getStorageInfoSync();
    var that = this;
    //蒙版里面的商品信息
    for (var i = 0; i < all_cart.keys.length;i++){
      if (all_cart.keys[i].substr(0, 11) == 'goods_info_') {
        wx.getStorageSync(all_cart.keys[i].substr(0, 11));
        
        var all_carts = wx.getStorageSync(all_cart.keys[i]);
       // console.log('uuu', wx.getStorageSync(all_cart.keys[i]));
       
            goods_datas[i] = {
              containers_id: wx.getStorageSync(all_cart.keys[i]).container_id,
              goods_name: wx.getStorageSync(all_cart.keys[i]).goods_name,
              price: wx.getStorageSync(all_cart.keys[i]).price,
              num: wx.getStorageSync(all_cart.keys[i]).num,
              shop_num: wx.getStorageSync(all_cart.keys[i]).shop_num
            }
        
          } 
      
      };
   console.log("goods_datas", goods_datas)
    that.setData({
      shows_all: goods_datas
    })
   // 点击购物车开关蒙版
    that.setData({
      hasList: true,
      setList: true
    })
   
    // var shoppingCart = this.data.hasList;
    //   if (shoppingCart){
    //     that.setData({
    //       hasList: false,
    //       setList: false
    //     })
    //   }else{
    //     that.setData({
    //       hasList: true,
    //       setList: true
    //     })
    //   }
      
  },
  closeMash:function(){
    this.setData({
      setList: false
    }) 
    
  },
  // 增加数量
  addCount(e) {
    
    var index = e.currentTarget.dataset.index; 
    var that = this;
    var storage_key = 'goods_info_'+this.data.show_all[index].container_id;
    this.data.show_all[index].shop_num = this.data.show_all[index].shop_num+1;
    that.setData({
      show_all: this.data.show_all,
      shows_all: this.data.show_all
    })
    var cart_info = wx.getStorageSync(storage_key);

    if (cart_info){
      cart_info.shop_num = cart_info.shop_num+1;
      wx.setStorageSync(storage_key, cart_info); 
        
    }else{
      var goods_data = this.data.show_all[index]; 
     // goods_data.shop_num = goods_data.shop_num+1;
      wx.setStorageSync(storage_key,goods_data);
      
    }
   
    this.getTotalPrice();

  },
  // 减少数量
  minusCount(e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    var storage_key = 'goods_info_' + this.data.show_all[index].container_id;
    this.data.show_all[index].shop_num = this.data.show_all[index].shop_num - 1;
    that.setData({
      show_all: this.data.show_all,
      shows_all: this.data.show_all
    })
    var cart_info = wx.getStorageSync(storage_key);

    if (cart_info.shop_num > 0) {
      if (cart_info) {
        cart_info.shop_num = cart_info.shop_num - 1;
        wx.setStorageSync(storage_key, cart_info);

      } else {
        var goods_data = that.data.show_all[index];
        goods_data.shop_num = goods_data.shop_num - 1;
        wx.setStorageSync(storage_key, goods_data);
      }
    }

    this.getTotalPrice();

  },
  //蒙版的减少数量
  shop_minusCount(e) {
    const index = e.currentTarget.dataset.index;

    // console.log("storage_key", this.data.show_all)
    var storage_key = 'goods_info_' + e.currentTarget.id;
    var that = this;
    var all_cart = wx.getStorageInfoSync();

    //console.log("storage_key", all_cart.keys)
    for (var i = 0; i < all_cart.keys.length; i++) {
      if (storage_key == all_cart.keys[i]) {
        var cart_shopNum = wx.getStorageSync(all_cart.keys[i]);

      }
    }

    if (cart_shopNum.shop_num > 0) {
      this.data.shows_all[index].shop_num = this.data.shows_all[index].shop_num - 1;
    }

    that.setData({
      show_all: this.data.show_all,
      shows_all: this.data.shows_all
    })
    var cart_info = wx.getStorageSync(storage_key);

    if (cart_info.shop_num > 0) {
      if (cart_info) {
        cart_info.shop_num = cart_info.shop_num - 1;
        wx.setStorageSync(storage_key, cart_info);

      } else {
        var goods_data = that.data.show_all[index];
        goods_data.shop_num = goods_data.shop_num - 1;
        wx.setStorageSync(storage_key, goods_data);
      }
    }

    this.getTotalPrice();

  }, 
  //蒙版的增加数量
  shop_addCount(e) {
    const index = e.currentTarget.dataset.index;

    // console.log("storage_key", this.data.show_all)
    var storage_key = 'goods_info_' + e.currentTarget.id;
    var that = this;
    var all_cart = wx.getStorageInfoSync();

    //console.log("storage_key", all_cart.keys)
    for (var i = 0; i < all_cart.keys.length; i++) {
      if (storage_key == all_cart.keys[i]) {
        var cart_shopNum = wx.getStorageSync(all_cart.keys[i]);

      }
    }

    if (cart_shopNum.shop_num > 0) {
      this.data.shows_all[index].shop_num = this.data.shows_all[index].shop_num + 1;
    }

    that.setData({
      show_all: this.data.show_all,
      shows_all: this.data.shows_all
    })
    var cart_info = wx.getStorageSync(storage_key);

   
    if (cart_info) {
      cart_info.shop_num = cart_info.shop_num + 1;
      wx.setStorageSync(storage_key, cart_info);

    } else {
      var goods_data = that.data.show_all[index];
      goods_data.shop_num = goods_data.shop_num + 1;
      wx.setStorageSync(storage_key, goods_data);
    }

    this.getTotalPrice();

  },
  //计算总价
  getTotalPrice() {
    var all_cart =  wx.getStorageInfoSync()
    var total_price = 0;
    var total_num = 0;
    for(var i=0; i<all_cart.keys.length; i++){
       if (all_cart.keys[i].substr(0,11) == 'goods_info_'){
         wx.getStorageSync(all_cart.keys[i].substr(0, 11));
         var all_carts = wx.getStorageSync(all_cart.keys[i]);
            if (all_carts.shop_num>0){
              total_num += all_carts.shop_num;
              total_price += all_carts.shop_num * all_carts.price;
            }
         
        }

    }
  
    this.setData({                                // 最后赋值到data中渲染到页面
      total_num: total_num,
      total_price: total_price.toFixed(2)
    });
  
  },
  // 改变左侧下标
  change_leftnum: function (event) {
   
    this.setData({
      left_classnum: event.target.dataset.num
    })

    var that = this
    wx.request({
      url: 'http://store.yeshitou.com/v1/retail/home?mch_id=33&dev_no=qw213213213123&goods_cate=' + event.currentTarget.id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        var goods_data = {};
        for (var i = 0; i < res.data.data.length; i++) {
          var goods_key = "goods_info_" + res.data.data[i].container_id;
          var shop_num = 0

          var cart_info = wx.getStorageSync(goods_key);
          if (cart_info) {
            shop_num = cart_info.shop_num;
          }

          goods_data[i] = {
            container_id: res.data.data[i].container_id,
            goods_img: res.data.data[i].goods_img,
            goods_name: res.data.data[i].goods_name,
            price: res.data.data[i].price,
            num: res.data.data[i].num,
            shop_num: shop_num
          }

        }
        
       //console.log("bb...", goods_data)
       
        that.setData({
          show_all: goods_data
        })
        
      }
    })
  },

  // 购买按钮跳转支付页面
  buy_now: function(){

    var container_id = {};
    var num = {};
    var all_cart = wx.getStorageInfoSync()
    var that = this;
    //蒙版里面的商品信息
    for (var i = 0; i < all_cart.keys.length; i++) {
      if (all_cart.keys[i].substr(0, 11) == 'goods_info_') {
        wx.getStorageSync(all_cart.keys[i].substr(0, 11));
         
        container_id[i] = {
          container_id: wx.getStorageSync(all_cart.keys[i]).container_id,
        };
        num[i] = {
           num: wx.getStorageSync(all_cart.keys[i]).shop_num
        }
         /*
        var all_carts = wx.getStorageSync(all_cart.keys[i]);
        goods_datas[i] = {
          container_id: wx.getStorageSync(all_cart.keys[i]).container_id,
          //num: wx.getStorageSync(all_cart.keys[i]).num,
          shop_num: wx.getStorageSync(all_cart.keys[i]).shop_num
        }
         */
      }
  

    };
   
    console.log("container_id", container_id)
    console.log("num", num)
    var user_info = wx.getStorageSync('user_all');
 
   
    var that = this;

      wx.request({
        url: 'http://store.yeshitou.com/v1/retail/order',  //仅为示例，并非真实的接口地址
        method: "POST",
        header: {
          'x-access-token': user_info.access_token // 默认值
        },
        data: {
          mch_id: 33,
          dev_no: "qw213213213123",
          container_id: 13319,
          num:2,
          type: "wxapp"
        },
        success: function (res) {
           console.log("res",res)

           if(res.data.msg == "success"){
             wx.showToast({
               title: '生成订单成功',
             })
           }else{
             wx.showToast({
               title: '生成订单失败，请重新操作',
             })
            
           };
          /*
          if (res.data.error == 10027) {
            wx.showToast({
              title: '请先添加地址',
            })
          } else {
            wx.showToast({
              title: '生成订单成功',
            })
            
            setTimeout(function () {
              wx.redirectTo({
                url: '../logs/logsorder?list_num=0',
              })
            }, 1500)
          }
          */
        }
      })
   
    
  },
  // 跳转到选取页面
  jumpselect: function (event) {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //计算总商品和价格
    this.getTotalPrice();
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showTabBar({
      success: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
    var that = this
    wx.request({
      url: 'http://store.yeshitou.com/v1/retail/category?mch_id=33', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          show_alldata: res.data.data
        })
      }
    })

    //获取右边商品信息
    wx.request({
      url: 'http://store.yeshitou.com/v1/retail/home?mch_id=33&dev_no=qw213213213123&goods_cate=', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var goods_data = {};
        for (var i = 0; i < res.data.data.length; i++) {
          var goods_key = "goods_info_" +res.data.data[i].container_id;
          var shop_num = 0  //购买商品数量
          var total_num = 0  //商品总数量
          var total_price = 0 //商品总价格 
          var cart_info = wx.getStorageSync(goods_key);
          if (cart_info){
            shop_num = cart_info.shop_num;
          }
      
          goods_data[i] = {
            container_id: res.data.data[i].container_id,
            goods_img: res.data.data[i].goods_img,
            goods_name: res.data.data[i].goods_name,
            price: res.data.data[i].price,
            num: res.data.data[i].num,
            shop_num: shop_num
          };
          //计算总价
             /*
            total_num += res.data.data[i].num;
            total_price += res.data.data[i].num * res.data.data[i].price;
            */

        };
        
      //   console.log("ww...", total_num)
      //  // that.getTotalPrice(goods_data)
      //   console.log("bb...", goods_data)
        that.setData({
          show_all: goods_data
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})