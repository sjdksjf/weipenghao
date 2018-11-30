// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // 左侧分类被选中的下标
  left_classnum: 0,
  show_alldata:''
  },
  // 改变左侧下标
  change_leftnum:function(event){
    this.setData({
      left_classnum: event.target.dataset.num
    })
  },
  // 跳转到选取页面
  jumpselect: function (event){
    var num = event.currentTarget.dataset.num
    console.log(this.data.show_alldata[this.data.left_classnum].cate2[num])
    wx.navigateTo({
      url: 'classlist?cat_id=' + this.data.show_alldata[this.data.left_classnum].cate2[num].id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      url: 'https://nb.yeshitou.com/index.php/v1/goods/cate_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          show_alldata: res.data.data
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