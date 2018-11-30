//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
   
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
   var code =wx.setStorageSync('logs', logs)
 
   wx.getStorageSync('code')
   if(code){
      console.log(code)
   }else{

 

    // 登录
    // wx.login({
    //   success: function (res) {
    //     // 如果用户拒绝获取个人信息
    //     var code = res.code
    //     wx.setStorageSync('code', code)
    //     wx.getUserInfo({
    //       success: function (res) {
    //         var userInfo = res.userInfo
    //         var nickName = userInfo.nickName
    //         var avatarUrl = userInfo.avatarUrl
    //         var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //         var province = userInfo.province
    //         var city = userInfo.city
    //         var country = userInfo.country
    //         if (self_code) {
    //           console.log(self_code)
    //           //发起网络请求
    //           wx.request({
    //            // url: 'https://nb.yeshitou.com/index.php/v1/user/outh_login',
    //             data: {
    //               code: self_code,
    //               type: 2,
    //               nickName: nickName,
    //               avatarUrl: avatarUrl,
    //               gender:gender

    //             },
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded'   // 默认值
    //             },
    //             method: 'POST',
    //             success: function (res) {
    //               console.log(res.data.data)
    //                 wx.setStorage({
    //                   key: 'user_all',
    //                   data: res.data.data,
    //                 })
    //             }

    //           })
    //         } else {
    //           console.log('获取用户登录态失败！' + res.errMsg)
    //         }
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    module.exports = function get_token({ head_pic, access_token, mobile_validated, nickname, refresh_token, access_token_expire_at, refresh_token_expire_at}){
      var user_token = wx.getStorageSync("user_all")
      user_token.head_pic = head_pic || user_token.head_pic
      user_token.access_token = access_token || user_token.access_token
      user_token.mobile_validated = mobile_validated || user_token.mobile_validated
      user_token.nickname = nickname || user_token.nickname
      user_token.refresh_token = refresh_token || user_token.refresh_token
      user_token.access_token_expire_at = access_token_expire_at || user_token.access_token_expire_at
      user_token.refresh_token_expire_at = refresh_token_expire_at || user_token.refresh_token_expire_at
      wx.setStorage({
        key: 'user_all',
        data: user_token,
      })
    }
    module.exports = function user_login(){
      wx.login({
        success: function (res) {
          // 如果用户拒绝获取个人信息
          var self_code = res.code
          wx.getUserInfo({
            success: function (res) {
              console.log(111111111111)
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              if (self_code) {
                console.log(self_code)
                //发起网络请求
                wx.request({
                  url: 'https://nb.yeshitou.com/index.php/v1/user/outh_login',
                  data: {
                    code: self_code,
                    type: 2,
                    nickName: nickName,
                    avatarUrl: avatarUrl,
                    gender: gender

                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'   // 默认值
                  },
                  method: 'POST',
                  success: function (res) {
                    console.log(res.data.data)
                    wx.setStorage({
                      key: 'user_all',
                      data: res.data.data,
                    })
                    
                  }

                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },
            complete: function (res) {
              console.log(res)
            }
          })
        }
      })
    }
   }
  },
  globalData: {
    userInfo: null
  }
})