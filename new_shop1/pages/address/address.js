// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.buy_now) {
      this.setData({
        buy_now: options.buy_now
      })
    } else {
     
    }
    this.setData({
      is_whereBuy:options.is_buy
    })
  },
  // 跳转到编辑页面
  jumpchange:function(e){
    var num = e.currentTarget.dataset.num
    wx.setStorageSync('changeid', num)
    wx.navigateTo({
      url: 'changeaddress'
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 设置默认地址
  set_default: function (e) {
    console.log(e.currentTarget.dataset.num)
    var that = this
    var user_token = wx.getStorageSync('user_all')
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/address/set_default?id=' + e.currentTarget.dataset.num.address_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/address/address_list', //仅为示例，并非真实的接口地址
          method: "GET",
          header: {
            'x-access-token': user_token.access_token // 默认值
          },
          success: function (res) {
            console.log(res)
            if (!res){
              
            } else {
              that.setData({
                useraddress: res.data.data.info
              })
            }

          }
        })
      }
    })
  },
  back_buy:function(e){
    console.log(e.currentTarget.dataset.num)
    var free_address = "address_id="+e.currentTarget.dataset.num.address_id
    if (this.data.is_whereBuy == 0 ){

    } else {

      wx.navigateTo({
        url: '../shopcar/selforder?' + free_address + '&buy_now='+this.data.buy_now
      })
    }
  },
  // 删除地址
  delete_address: function (e) {
    console.log(e.currentTarget.dataset.num)
    var that = this
    var user_token = wx.getStorageSync('user_all')
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/address/del_address?id=' + e.currentTarget.dataset.num.address_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == '200') {
          wx.request({
            url: 'https://nb.yeshitou.com/index.php/v1/address/address_list', //仅为示例，并非真实的接口地址
            method: "GET",
            header: {
              'x-access-token': user_token.access_token // 默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.code == '200') {
                wx.showToast({
                  title: '删除成功',
                  image: '../order/images/sleep.png'
                })
                that.setData({
                  useraddress: res.data.data.info
                })
              } else {
                that.setData({
                  useraddress: ''
                })
                if(res.data.error_msg="您还没添加地址"){
                  wx.showToast({
                    title: '删除成功',
                    image: '../order/images/sleep.png'
                  })
                }
                
              }
            }
          })
        } else {
          wx.showToast({
            title: '地址信息尚未完善',
            image: '../order/images/sleep.png'
          })
        }
       
      }
    })
  },
  // 添加新的收货地址
  newaddress:function(){
    wx.navigateTo({
      url: 'newaddress',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var user_token = wx.getStorageSync('user_all')
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/address/address_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(res)
        if(res.data.error_code=='100027') {

        } else {
          that.setData({
            useraddress: res.data.data.info
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