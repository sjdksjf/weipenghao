// pages/logs/logsorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳到物流的页面
  jump_status:function(e){
    wx.navigateTo({
      url: '../order/order_status?id=' + e.currentTarget.dataset.num,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.list_num)
  this.setData({
    listnum:options.list_num
  })
  var user_info = wx.getStorageSync('user_all')
  var that = this
  console.log(user_info)
  wx.request({
    url: 'https://nb.yeshitou.com/index.php/v1/order/order_list', //仅为示例，并非真实的接口地址
    method: "GET",
    header: {
      'x-access-token': user_info.access_token // 默认值
    },
    success: function (res) {
      console.log(res.data.data.order_list)
      var now_order = ''
      if(options.list_num == 0) {
        now_order = res.data.data.order_list
      } else {
        now_order = res.data.data.order_list.filter(function(item){
          return item.order_status_code == options.list_num
        })
      }
      that.setData({
        userorder:now_order,
        all_order:res.data.data.order_list
      })
    }
  })
  },
  // 改变订单列表的下标
  change_listnum:function(e){
    console.log(e.currentTarget.dataset.num)
    console.log(this.data.all_order)
    var now_order = ''
    if (e.currentTarget.dataset.num == 0) {
      now_order = this.data.all_order
    } else {
      now_order = this.data.all_order.filter(function (item) {
        return item.order_status_code == e.currentTarget.dataset.num
      })
    }
    this.setData({
      listnum: e.currentTarget.dataset.num,
      userorder:now_order
    })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
// 订单详情页面
  jumporderdetail:function(e){
    wx.navigateTo({
      url: 'orderdetail?order_id=' + e.currentTarget.dataset.num,
    })
    
  },
  // 跳转到评论
  jump_comment:function(e){
    console.log(e.currentTarget.dataset.num)
    wx.navigateTo({
      url: 'order_comment?order_id=' + e.currentTarget.dataset.num
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.listnum)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    if (this.data.listnum){
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/order/order_list', //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'x-access-token': user_info.access_token // 默认值
        },
        success: function (res) {
          console.log(res.data.data.order_list)
          var now_order = ''
          if (that.data.listnum == 0) {
            now_order = res.data.data.order_list
          } else {
            now_order = res.data.data.order_list.filter(function (item) {
              return item.order_status_code == that.data.listnum
            })
          }
          that.setData({
            userorder: now_order,
            all_order: res.data.data.order_list
          })
        }
      })
    }
   

  },
  // 取消订单
  cancle_order:function(e){
    console.log(e.currentTarget.dataset.num)
    console.log(this.data.userorder)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/order/cancel_order?id=' + e.currentTarget.dataset.num.order_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(11111111111111111111)
        console.log(res.data)
        if (res.data.code == 200) {
          wx.showToast({
            title: '取消订单成功',
          })
          wx.request({
            url: 'https://nb.yeshitou.com/index.php/v1/order/order_list', //仅为示例，并非真实的接口地址
            method: "GET",
            header: {
              'x-access-token': user_info.access_token // 默认值
            },
            success: function (res) {
              console.log(res.data.data.order_list)
              var now_order = ''
              console.log(that.data.list_num)
              if (that.data.listnum == 0) {
                now_order = res.data.data.order_list
                console.log(now_order)
              } else {
                now_order = res.data.data.order_list.filter(function (item) {
                  return item.order_status_code == that.data.listnum 
                })
              }
              that.setData({
                userorder: now_order,
                all_order: res.data.data.order_list
              })
            }
          })
        }

      }
    })
  },
  goto_buy:function(e){
    console.log(e.currentTarget.dataset.num)
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/pay/get_pay_api', //仅为示例，并非真实的接口地址
      method: "POST",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      data: {
        order_id: e.currentTarget.dataset.num.order_id,
        applet: 1,
        pay_code: 'weixin'

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
            console.log(res)
            wx.request({
              url: 'https://nb.yeshitou.com/index.php/v1/order/order_list', //仅为示例，并非真实的接口地址
              method: "GET",
              header: {
                'x-access-token': user_info.access_token // 默认值
              },
              success: function (res) {
                console.log(res.data.data.order_list)
                var now_order = ''
                if (that.data.listnum == 0) {
                  now_order = res.data.data.order_list
                } else {
                  now_order = res.data.data.order_list.filter(function (item) {
                    return item.order_status_code == that.data.listnum
                  })
                }
                that.setData({
                  userorder: now_order,
                  all_order: res.data.data.order_list
                })
              }
            })
          },
          'fail': function (res) {
            console.log(res)

          }
        })


      }
    })
  },
  // 确认收货
  commfirm_post: function (e) {
    console.log(this.data.userorder)
    var user_info = wx.getStorageSync('user_all')
    console.log()
    var that = this
    console.log(user_info)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/order/recieve?id=' + e.currentTarget.dataset.num, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_info.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 400) {
          wx.showToast({
            title: '订单确认出错',
            image: '../order/images/sleep.png'
          })
        } else {
          wx.showToast({
            title: '收货确认成功',
          })
          wx.request({
            url: 'https://nb.yeshitou.com/index.php/v1/order/order_list', //仅为示例，并非真实的接口地址
            method: "GET",
            header: {
              'x-access-token': user_info.access_token // 默认值
            },
            success: function (res) {
              console.log(res.data.data.order_list)
              var now_order = ''
              if (that.data.listnum == 0) {
                now_order = res.data.data.order_list
              } else {
                now_order = res.data.data.order_list.filter(function (item) {
                  return item.order_status_code == that.data.listnum
                })
              }
              that.setData({
                userorder: now_order,
                all_order: res.data.data.order_list
              })
            }
          })
        }


      }
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