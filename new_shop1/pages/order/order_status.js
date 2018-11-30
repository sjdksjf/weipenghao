// pages/order/order_status.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var user_token = wx.getStorageSync('user_all')
    console.log(user_token)
    if (!user_token) {
      user_token.access_token == ''
    }
    console.log(options)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/order/show_order?id='+options.id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var post_style = ''
        switch (res.data.ShipperCode) {
          case 'zto':
            post_style = '中通快递'
            break;
          case 'yto':
            post_style = '园通快递'
            break;
          case 'sf':
            post_style = '顺丰快递'
            break;
          case 'htky':
            post_style = '百世快通'
            break;
          
        }
        var post_status = ''
        switch (res.data.State) {
          case '2':
            post_status = '在途中'
            break;
          case '3':
            post_status = '已签收'
            break;
          case '4':
            post_status = '问题件'
            break;
        }
        that.setData({
          address_info:res.data,
          post_style:post_style,
          post_status: post_status
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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