// pages/collect/collect.js
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
  
  },
  // 返回
  back:function(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that =this
    var user_info = wx.getStorageSync('user_all')

    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/collect/collect_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          goods_list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  jump_detail:function(e){
    console.log(e.currentTarget.dataset.num)
    var num = e.currentTarget.dataset.num
    wx.redirectTo({
      url: '../order/order?goods_id=' + num,
    })
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