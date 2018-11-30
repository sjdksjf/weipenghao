// pages/authorize/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  bindGetUserInfo: function (e) {
    // 获得最新的用户信息
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.checkSessionAndLogin();
  },
  /* 
    这里使用openid 作为与后端session 连接的标志
    检查是否存在openid，即之前是否登录过
      如果登录过，检查session_key 是否过期
        如果过期了，remove openid 重新执行login 并将用户信息发送到服务器端更新
        如果没过期则返回
      如果没登录过则执行login 并将用户信息发送到服务器更新
  */
  checkSessionAndLogin: function () {
    let that = this;
    let code = wx.getStorageSync('code');

    // 已经进行了登录，检查登录是否过期
    if (code) {
      console.log('有code')
      wx.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
          wx.navigateBack({});
        },
        fail: function () {
          console.log('session失效');
          // session_key 已经失效，需要重新执行登录流程
          wx.removeStorageSync('code');
          that.checkSessionAndLogin();
        }
      })
    } else {
      // 没有进行登录则先进行登录操作
      console.log('没有code开始登陆');
      that.loginAndGetOpenid();
    }
  },
  // 执行登录操作并获取用户openId
  loginAndGetOpenid: function () {
    wx.showLoading({
      title: '加载中',
    })
    console.log('开始获取code');
    let that = this;
    wx.login({
      success: function (res) {

        if (res.code) {
          wx.setStorageSync('code', res.code)
          that.setData({
            code: res.code
          })
          var code = res.code
          wx.getUserInfo({

            success: function (res) {

              var user_info = res.userInfo
              wx.setStorageSync('info', user_info)

              wx.request({
                url: 'https://nb.yeshitou.com/index.php/v1/user/outh_login',
                method: "POST",
                data: {
                  code: that.data.code,
                  type: 2,
                  nickName: user_info.nickName,
                  avatarUrl: user_info.avatarUrl,
                  gender: user_info.gender
                },
                success: function (res) {
                  console.log('123')
                  console.log(res)
                  // 保存openId，并将用户信息发送给后端


                  wx.setStorageSync('user_all', res.data.data);
                  that.sendUserInfoToServer();

                },
                fail: function (res) {
                  wx.showModal({
                    title: '提示',
                    content: '获取信息失败',
                  })
                },
                complete: function () {
                  wx.hideLoading(),  //隐藏加载框
                    wx.navigateBack({})  //返回上一级
                },

              })

            }
          })


        }
      }
    })
  },
  sendUserInfoToServer: function () {

    console.log('now send user info to server');
    let userInfo = wx.getStorageSync('userInfo');
    let thiscode = wx.getStorageSync('code');


  }
})
