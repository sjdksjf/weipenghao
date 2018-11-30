// pages/logs/order_comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNum:0,
    // 是否匿名
    is_name:0,
    content:''
  },
  // 改变是否匿名
  change_choose:function(){
    if(this.data.is_name==0) {
      this.setData({
        is_name:1
      })
    } else {
      this.setData({
        is_name:0
      })
    }
  },
// 提交评论
commit_userword:function(){
    var that = this
  
  if (this.data.content == '') {
    wx.showToast({
      title: '你还没有输入评论',
      image: '../order/images/sleep.png'
    })
  } else {
    var user_info = wx.getStorageSync('user_all')
    console.log(user_info)
    console.log(that.num)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/comment/add_comment', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        order_id: that.num,
        content: that.data.content
      },
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '评论发表成功',
          })
          console.log(that.data.content)
          setTimeout(function(){
            wx.navigateBack()
          },1500)
        } else {
          wx.showToast({
            title: '评论发表失败',
            image: '../order/images/sleep.png'
          })
        }
      }
    })
  }
},
// 获取评论内容
get_word:function(e){
  console.log(e.detail)
  this.setData({
    content:e.detail.value
  })
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.order_id)
    this.num = options.order_id
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
  // 改变星星的数量
  change_star:function(e){
    console.log(e.currentTarget)
    this.setData({
      starNum:e.currentTarget.dataset.num
    })
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