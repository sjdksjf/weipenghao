// pages/address/newaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province_arr: '',
    city_arr: '',
    town_arr:'',
    villages_arr:'',
    province_index: 0,
    city_index: 0,
    town_index: 0,
    villages_index:0,
    username:'',
    userphone:'',
    detailaddress:'',
    userzip:'',
  },
// 改变省份
  changeprovince: function (e) {
    console.log(e.detail.value)
    this.setData({
      province_index: e.detail.value,
      city_index:0,
      town_index:0,
      villages_index:0
    })
    var parent_id = this.data.province_arr[e.detail.value].id
    var that = this
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          city_arr: res.data.data.list
        })
        var parent_id = res.data.data.list[0].id
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var city_town = res.data.data.list.slice(1)
            that.setData({
              town_arr: city_town
            })
            var parent_id = city_town[0].id
              wx.request({
                url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
                method: "GET",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  that.setData({
                    villages_arr: res.data.data.list
                  })
                }
              })
          }
        })
      }
    })
  }, 
  changecity: function (e) {
    console.log(e.detail.value)
    this.setData({
      city_index: e.detail.value,
      town_index: 0,
      villages_index:0
    })
    var that = this
    var parent_id = this.data.city_arr[e.detail.value].id
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var city_town = res.data.data.list.slice(1)
        that.setData({
          town_arr: city_town
        })
        var parent_id = city_town[0].id
          wx.request({
            url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
            method: "GET",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              that.setData({
                villages_arr: res.data.data.list
              })
            }
          })
      }
    })
  },
  changetown: function (e) {
    // var city_town = res.data.data.list.slice(1)
    this.setData({
      town_index: e.detail.value
    })
    var that = this
    var parent_id = this.data.town_arr[e.detail.value].id
    console.log(parent_id)
    if (this.data.town_arr[that.data.town_index].name == '市辖区') {
      that.setData({
        villages_arr: ''
      })
    } else {
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            villages_arr: res.data.data.list
          })
        }
      })
    }
  },
   changevillages: function (e) {
    console.log(e.detail.value)
    this.setData({
      villages_index: e.detail.value
    })
  },
  // 取消操作
  cancle_operation:function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack()
        } else if (res.cancel) {
          
        }
      }
    })
  },
  // 保存操作
  save_operation:function(){
    if (this.data.username == '' || this.data.userphone == '' || this.data.detailaddress == ''){
      wx.showToast({
        title: '地址信息尚未完善',
        image:'../order/images/sleep.png'
      })
    } else {
      console.log(222)
      var user_token = wx.getStorageSync('user_all')
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/address/add_address', //仅为示例，并非真实的接口地址
        method: "POST",
        data:{
          province: this.data.province_arr[this.data.province_index].id,
          city: this.data.city_arr[this.data.city_index].id,
          twon: this.data.town_arr[this.data.town_index].id,
          district: this.data.villages_arr[this.data.villages_index].id,
          address: this.data.detailaddress,
          zipcode: this.data.userzip,
          mobile: this.data.userphone,
          consignee  :this.data.username
        },
        header: {
          'x-access-token': user_token.access_token // 默认值
        },
        success: function (res) {
          console.log(res)
          if(res.data.error_code == '100021'){
            wx.showToast({
              title: '手机号码书写错误',
              image: '../order/images/sleep.png'
            })
            return false
          }
          if (res.data.code == 200) {
            wx.showToast({
              title: '添加地址成功',
              success:function(){
                setTimeout(function(){
                  wx.navigateBack()
                },1500)
              }
            })
            // wx.redirectTo({
            //   url: 'address'
            // })
          }
        }
      })
    }
    // console.log(this.data.detailaddress)
    // console.log(this.data.username)
    // console.log(this.data.userphone)
    // console.log(this.data.userzip)
    // console.log(this.data.province_arr[this.data.province_index].id)
    // console.log(this.data.city_arr[this.data.city_index].id)
    // console.log(this.data.town_arr[this.data.town_index].id)
    // console.log(this.data.villages_arr[this.data.villages_index].id) 
    // console.log(this.data.province_arr[this.data.province_index].name)
    // console.log(this.data.city_arr[this.data.city_index].name)
    // console.log(this.data.town_arr[this.data.town_index].name)
    // console.log(this.data.villages_arr[this.data.villages_index].name)
  },
  // 收货人的名字
  username:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  // 收货人的手机号码
  userphone:function(e){
    this.setData({
      userphone:e.detail.value
    })
  },
  // 收货人的详细地址
  detailaddress:function(e){
    this.setData({
      detailaddress:e.detail.value
    })
  },
  // 收货人的邮编
  userzip:function(e){
    this.setData({
      userzip:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=0', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          province_arr: res.data.data.list
        })
        var parent_id = res.data.data.list[that.data.province_index].id
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id='+parent_id, //仅为示例，并非真实的接口地址
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              city_arr: res.data.data.list
            })
            var parent_id = res.data.data.list[that.data.city_index].id
            wx.request({
              url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
              method: "GET",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                var city_town = res.data.data.list.slice(1)
                that.setData({
                  town_arr: city_town
                })
                console.log(res.data.data.list)
                var parent_id = city_town[that.data.town_index].id
                console.log(parent_id)
                  wx.request({
                    url: 'https://nb.yeshitou.com/index.php/v1/goods/getRegion?parent_id=' + parent_id, //仅为示例，并非真实的接口地址
                    method: "GET",
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                      that.setData({
                        villages_arr: res.data.data.list
                      })
                    }
                  })
              }
            })
          }
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