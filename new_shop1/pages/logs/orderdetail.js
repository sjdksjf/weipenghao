// pages/logs/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  post_msgtype:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.order_id)
  var user_info = wx.getStorageSync('user_all')
  var that = this
  console.log(user_info)
  wx.request({
    url: 'https://nb.yeshitou.com/index.php/v1/order/order_detail?id=' + options.order_id, //仅为示例，并非真实的接口地址
    method: "GET",
    header: {
      'x-access-token': user_info.access_token // 默认值
    },
    success: function (res) {
      console.log(11111111111111111111)
      console.log('asdfghjkl')
      console.log(res.data.data.order_info)
      var themoney = 0
      var thenum = 0
      for (var i = 0; i < res.data.data.order_info.goods_list.length; i++) {
        themoney += parseFloat(res.data.data.order_info.goods_list[i].goods_price) * parseFloat(res.data.data.order_info.goods_list[i].goods_num)
        thenum += parseFloat(res.data.data.order_info.goods_list[i].goods_num)
      }
      console.log(themoney,thenum)
     that.setData({
       userorder:res.data.data.order_info,
       all_price: themoney.toFixed(2),
       all_num: thenum.toFixed(0)
     })
    }
  })
  }, 
  // 评价
  jump_commentpage:function(e){
    wx.navigateTo({
      url: 'order_comment?order_id=' + e.currentTarget.dataset.num
    })
  },
  //  取消订单
  cancle_pay:function(){
    console.log(this.data.userorder)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/order/cancel_order?id=' + this.data.userorder.order_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(11111111111111111111)
        console.log(res.data)
        if(res.data.code == 200) {
          wx.showToast({
            title: '取消订单成功',
          })
          setTimeout(function(){
            wx.navigateBack()
          },200)
        }
       
      }
    })
  },
  // 跳到物流的页面
  jump_status: function () {
    console.log(this.data.userorder)
    wx.navigateTo({
      url: '../order/order_status?id=' + this.data.userorder.order_id,
    })
  },
  // 确认收货
  commfirm_post:function(){
    console.log(this.data.userorder)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/order/recieve?id=' + this.data.userorder.order_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 400) {
          wx.showToast({
            title: '订单确认出错',
            image: '../order/images/sleep.png'
          })
        } else {
          wx.showToast({
            title: '收货确认成功',
          })
        }


      }
    })
  },
  // 确认支付
  commit_pay:function(){
    console.log(this.data.userorder)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/pay/get_pay_api', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      data:{
        order_id: this.data.userorder.order_id,
        applet :1,
        pay_code :'weixin'

      },
      success: function (res) {
        console.log(res.data)
        var secret = res.data.data
        console.log(secret)
        wx.requestPayment({
          'timeStamp': secret.timeStamp,
          'nonceStr': secret.nonceStr,
          'package': secret.package,
          'signType': 'MD5',
          'paySign': secret.paySign,
          'success': function (res) {
            wx.navigateBack()
          },
          'fail': function (res) {
            console.log(res)
            
          }
        })
      
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  // 上方的返回
  back:function(){
    wx.navigateBack()
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