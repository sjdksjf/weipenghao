// pages/logs/logs.js
// 获取应该设置token的函数
var user_login = require('../../app.js')
var muchFunction = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:"这是本页面的数据",
    info:''
  },
  post_msgtype: function () {
    console.log('点击成功')
  },
  // 检测用户是否已经绑定了手机号
  add_address: function(){
    var user_info = wx.getStorageSync('user_all')
    if(user_info) {
      console.log(user_info)
      // if (user_info.mobile_validated == 0) {
      //   wx.navigateTo({
      //     url: '../binding/binding',
      //   })
      // } else { }
        wx.navigateTo({
          url: '../address/address?is_buy=0',
        })
     
    } else {
      wx.openSetting({
        success:function(res){
          wx.getSetting({
            success:function(res){
              user_login()
              console.log(111)
              wx.switchTab({
                url:'../index/index'
              })
            }
          })
        }
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // add_address:function(){
  //   wx.navigateTo({
  //     url: '../address/address?is_buy=0',
  //   })
  // },
  // 跳到收藏
  jump_collect:function(){
    wx.navigateTo({
      url: '../collect/collect',
    })
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
    var info = wx.getStorageSync('user_all')
    this.setData({
      info: info
    })
  
  },
// 跳转到订单列表页面
  jump_logsorder:function(e){
    console.log(e.currentTarget.dataset.num)
    wx.navigateTo({
      url: 'logsorder?list_num=' + e.currentTarget.dataset.num,
    })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user_info = wx.getStorageSync('user_all')
    if (user_info) {
      console.log(user_info)
      // if (user_info.mobile_validated == 0) {
      //   wx.navigateTo({
      //     url: '../binding/binding',
      //   })
      // }
      var info = wx.getStorageSync('user_all')
      console.log(info)
      this.setData({
        info: info
      })
      this.setData({
        mnbvcx:'我的收货地址'
      })
      console.log(123456789)
    } else {
      this.setData({
        mnbvcx: '请先登录'
      })
      // wx.openSetting({
      //   success: function (res) {
      //     wx.getSetting({
      //       success: function (res) {
      //         user_login()
      //       }
      //     })
      //   }
      // })
    }
   
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
  
  },
})