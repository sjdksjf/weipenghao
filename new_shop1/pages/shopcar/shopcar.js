// pages/shopcar/shopcar.js
var user_login = require('../../app.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中的判断
    choose_bool:true,
    // 判断是否是编辑状态
    write_bool:false,
    userorder:''
  
  },
// 返回首页
back_home:function(){
  wx.switchTab({
    url: '../index/index'
  })
},
// 转换为编辑状态
changewrite:function(){
  if(this.data.userorder != ''){
    this.setData({
      write_bool: true
    })
  } 
},
// 编辑完成
  completewrite:function(){
    var user_info = wx.getStorageSync('user_all')
    var that = this    
    var cart_data = []
    for (var i = 0; i < this.data.userorder.length; i++) {
      var obj = {
        "goodsNum": this.data.userorder[i].goods_num,
        "selected": this.data.userorder[i].selected,
        "cartID": this.data.userorder[i].id
      }
      cart_data.push(obj)
    }
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        cart_data: cart_data
      },
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.getgoodslist()
        var userorder_num = 0
        var userorder_price = 0
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].selected == 1) {
            userorder_num += res.data.data[i].goods_num
            userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
          }
        }
        that.setData({
          userorder: res.data.data,
          userorder_num: userorder_num,
          userorder_price: userorder_price.toFixed(2)
        })
      }
    })
  this.setData({
    write_bool:false
  })
},
// 物品的选中
  judge_choose: function (event){
    var num = event.currentTarget.dataset.num
  console.log(num)
  var user_info = wx.getStorageSync('user_all')
var that = this  
  console.log(this.data.userorder)
  if(this.data.userorder[num].selected == 1){
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
          method: "POST",
          data:{
            cart_data:[
              {
                "goodsNum": that.data.userorder[num].goods_num,
                "selected":0,
                "cartID":that.data.userorder[num].id
              }
            ]
            
          },
          header: {
            'x-access-token': user_info.access_token // 默认值
          },
          success: function (res) {
            that.getgoodslist()
             var userorder_num = 0
             var userorder_price = 0
             for (var i = 0; i < res.data.data.length; i++) {
               if (res.data.data[i].selected == 1) {
               userorder_num += res.data.data[i].goods_num
               userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
              }
             }
            that.setData({
              userorder:res.data.data,
              userorder_num: userorder_num,
              userorder_price: userorder_price.toFixed(2)
            })
          }
        })
  } else {
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        cart_data: [
          {
            "goodsNum": that.data.userorder[num].goods_num,
            "selected": 1,
            "cartID": that.data.userorder[num].id
          }
        ]
      },
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        that.getgoodslist()
        var userorder_num = 0
        var userorder_price = 0
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].selected == 1) {
            userorder_num += res.data.data[i].goods_num
            userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
          }
        }
        that.setData({
          userorder: res.data.data,
          userorder_num: userorder_num,
          userorder_price: userorder_price.toFixed(2)
        })
      }
    })
  }
  // var the_bool = true
  // for (var i=0; i<this.data.userorder.length; i++){
  //   if (this.data.userorder[i].selected == 0) {
  //     the_bool = false
  //     break
  //   } 
  // }
  //  var userorder_num = 0
  // var userorder_price = 0
  // for (var i = 0; i < this.data.userorder.length; i++) {
  //   if(this.data.userorder[i].selected == 1) {
  //     userorder_num += this.data.userorder[i].goods_num
  //     userorder_price += this.data.userorder[i].goods_num * this.data.userorder[i].member_goods_price
  //   }
  // }
  // this.setData({
  //   userorder:this.data.userorder,
  //   choose_bool: the_bool,
  //   userorder_num: userorder_num,
  //   userorder_price: userorder_price.toFixed(2)
  // })
  
},
// 移入收藏夹
move_collect:function(){
  console.log(this.data.userorder.filter(function(item){
      return item.selected == 1
  }))
  // wx.request({
  //   url: 'https://nb.yeshitou.com/index.php/v1/collect/collect_goods?id=' + this.data.goodsuserchoose.goods_id, //仅为示例，并非真实的接口地址
  //   method: "GET",
  //   header: {
  //     'x-access-token': user_info.access_token // 默认值
  //   },
  //   success: function (res) {
  //     console.log(res.data)
  //     that.data.goodsuserchoose.collect = 1
  //     that.setData({
  //       goodsuserchoose: that.data.goodsuserchoose
  //     })


  //   }
  // })
},
// 选择所有或者取消所有
judge_allchoose:function(){
  var user_info = wx.getStorageSync('user_all')
  var that = this 
  console.log(this.data.choose_bool)
  if(this.data.userorder.length<=0){
    wx.showToast({
      title: '购物车中没有商品',
      image: '../order/images/sleep.png'
    })
    return "没有商品"
  }
  if(this.data.choose_bool) {
    var cart_data = []
    for (var i = 0; i < this.data.userorder.length;i++){
      var obj = {
        "goodsNum":this.data.userorder[i].goods_num,
        "selected":0,
        "cartID":this.data.userorder[i].id
      }
      cart_data.push(obj)
    }
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        cart_data: cart_data
      },
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        that.getgoodslist()
        var userorder_num = 0
        var userorder_price = 0
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].selected == 1) {
            userorder_num += res.data.data[i].goods_num
            userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
          }
        }
        that.setData({
          userorder: res.data.data,
              choose_bool: false,
          userorder_num: userorder_num,
          userorder_price: userorder_price.toFixed(2)
        })
      }
    })
   
  } else {
    var cart_data = []
    for (var i = 0; i < this.data.userorder.length; i++) {
      var obj = {
        "goodsNum": this.data.userorder[i].goods_num,
        "selected": 1,
        "cartID": this.data.userorder[i].id
      }
      cart_data.push(obj)
    }
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        cart_data: cart_data
      },
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.getgoodslist()
        var userorder_num = 0
        var userorder_price = 0
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].selected == 1) {
            userorder_num += res.data.data[i].goods_num
            userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
          }
        }
        that.setData({
          userorder: res.data.data,
              choose_bool: true,
          userorder_num: userorder_num,
          userorder_price: userorder_price.toFixed(2)
        })
      }
    })
   
  }
  
},
// 增加商品的数量
  addordernum:function(e){
    var num = e.currentTarget.dataset.num
    this.data.userorder[num].goods_num ++

    this.setData({
      userorder: this.data.userorder
    })
    
    this.updataorder()
  },
  // 减少商品的数量
  reduceordernum:function(e){
    var num = e.currentTarget.dataset.num
    if (this.data.userorder[num].goods_num == 1) {

    }else {
      this.data.userorder[num].goods_num --
    }
    this.setData({
      userorder: this.data.userorder
    })
    this.updataorder()
  },
  // 删除订单
  deleteorder:function(){
    var that = this
    var user_info = wx.getStorageSync('user_all')
    // for(var i =0; i<this.data.userorder.length;i++){
    //   if(this.data.userorder[i].selected == 1) {
    //   }
    // }
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/cart/del_cart', //仅为示例，并非真实的接口地址
          method: "GET",
          header: {
            'x-access-token': user_info.access_token // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if(res.data.code == 200) {
              wx.showToast({
                title: '删除成功',
              })
              var userorder_num = 0
              var userorder_price = 0
              var arr = that.data.userorder.filter(function(item){
                return item.selected == 0
              })
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].selected == 1) {
                  userorder_num += arr[i].goods_num
                  userorder_price += arr[i].goods_num * arr[i].member_goods_price
                }
              }
              that.setData({
                userorder: arr,
                choose_bool: false,
                userorder_num: userorder_num,
                userorder_price: userorder_price.toFixed(2)
              })
            } else {
              wx.showToast({
                title: '删除失败',
                image: '../order/images/sleep.png'

              })
            }
            
          }
        })
       
   
    var arr = this.data.userorder.filter(function(item){
      return item.selected == 0
    })
    this.setData({
      userorder: arr
    })
    this.updataorder()
  },
  // 结算的
  settlement:function(){
    var arr = this.data.userorder.filter(function(item){
      return item.selected == 1
    })
    if (arr.length <= 0) {
      wx.showToast({
        title: '你没有选择商品',
        image: '../order/images/sleep.png'
      })
    } else {
      wx.navigateTo({
        url: 'selforder?buy_now=0',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 获取商品列表的函数
  getgoodslist:function(){
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    if (user_info) {
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        var userorder_num = 0
        var userorder_price = 0
        var bool = true
        if(res.data.data.length <=0) {
          bool = false
        }
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].selected == 1) {
            userorder_num += res.data.data[i].goods_num
            userorder_price += res.data.data[i].goods_num * res.data.data[i].member_goods_price
          } else {
            bool = false
          }
        }
        that.setData({
          userorder: res.data.data,
          choose_bool: bool,
          userorder_num: userorder_num,
          userorder_price: userorder_price.toFixed(2)
        })
      }
    })
    } else {
     wx.showToast({
       title: '请先去个人中心登录',
       duration:1500,
       image:'../order/images/sleep.png'
     })
     that.setData({
       userorder: '',
       choose_bool: false,
       userorder_num: 0,
       userorder_price: 0.00
     })
      setTimeout(function(){
        wx.reLaunch({
          url: '../logs/logs',
        })
      },1500)
    }
  },
// 时刻更新商品价格数量的函数
updataorder:function (){
  var userorder_num = 0
  var userorder_price = 0
  for (var i = 0; i < this.data.userorder.length; i++) {
    if (this.data.userorder[i].selected == 1) {
      userorder_num += this.data.userorder[i].goods_num
      userorder_price += this.data.userorder[i].goods_num * this.data.userorder[i].member_goods_price
    }
  }
  this.setData({
    userorder_num: userorder_num,
    userorder_price: userorder_price.toFixed(2)
  })     
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideTabBar({
    //   success:function(res){
    //     console.log(res)
    //   },
    //   complete:function(res){
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getgoodslist()
  
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
    // wx.showTabBar({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     console.log(res)
    //   }
    // })
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