// pages/binding/binding.js
var get_token = require("../../app.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms:'',
    // 用于判断是否已经发送过验证码
    sms_bool:false,
    // 判断手机号码长度是否正确
    mobile_length: true,
    sms_name:'获取验证码'
  },
  // 发送验证码请求
  send_sms:function(event){
    var that = this
    
    console.log(wx.getStorageSync('user_all'))
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/user/send_sms?mobile=' + this.data.phone, 
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.error_code == 100012) {
          that.setData({
            mobile_length: false
          })
        } else{
          that.setData({
            sms_bool:true
          })
          var i = 60
          var sms_time = setInterval(function(){
            that.setData({
              sms_name:"重新发送"+i
            })
            i--
            if (i == 0 ) {
              clearInterval(sms_time)
              that.setData({
                sms_bool:false,
                sms_name:'获取验证码'
              })
            }
          },1000)
        }
      }
    })
  }
  ,
  // 获取手机号
  getphone: function (event) {
    this.setData({
      phone: event.detail.value
    })

  }, 
  // 判断手机号码是否是11位
  getphonenum:function(event){
    var phone_length = event.detail.value
    console.log(phone_length)
    if(phone_length){
      if (phone_length.length < 11) {
        this.setData({
          mobile_length: false,
          // phone: phone_length
        })
      } else {
        this.setData({
          mobile_length: true,
          phone: phone_length
        })
      }
    }
    
  },
  // 获取验证码
  getsms: function (event) {
    console.log(event.detail.value)
    this.setData({
      sms: event.detail.value
    })

  },
  // 确认绑定自己的号码
  bindphone:function(){
    var phone = this.data.phone
    var sms = this.data.sms
    wx.getStorage({
      key: 'user_all',
      success: function(res) {
        wx.request({
          url: "https://nb.yeshitou.com/index.php/v1/user/mobile_validate",
          method: "POST",
          header: {
            'x-access-token': res.data.access_token // 默认值
          },
          data: {
            mobile: phone,
            sms_code: sms
          },
          success: function (res) {
            console.log(res.data)
            if(res.data.code == 400) {
              wx.showToast({
                title: '验证码错误',
                icon:'loading'
              })
            } else if(res.data.code == 200){
              res.data.data.mobile_validated = 1
              // user_token(res.data.data)
            }
            
          }

        })
      },
    })
  },
  // 返回上一层
  backbefore:function(){
    wx.navigateBack({
      delta:1
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