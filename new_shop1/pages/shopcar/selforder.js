// pages/shopcar/shopcar.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中的判断
    // 判断是否是编辑状态
    write_bool: false,
    prompt_bool:true

  },
  // 返回首页
  back_home: function () {
    wx.navigateBack()
  },
  // 选择地址
  chooseaddress:function(){
    wx.navigateTo({
      url: '../address/address?is_buy=1&buy_now='+this.data.the_style,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_info = wx.getStorageSync('user_all')
    var that = this
    console.log(user_info)
    console.log(11111111111111111111111)
    console.log(options)
    console.log(11111111111111111111111)
    
    if (options.address_id){
      this.setData({
        the_styleaddress: options.address_id
      })
    }
    this.setData({
      the_style:options.buy_now
    })
    if(options.buy_now==0){
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/cart/cart_list', //仅为示例，并非真实的接口地址
        method: "POST",
        header: {
          'x-access-token': user_info.access_token // 默认值
        },
        success: function (res) {
          // console.log(res.data.data)
          var arr = res.data.data.filter(function (item) {
            return item.selected == 1
          })
          var userorder_num = 0
          var userorder_price = 0
          var bool = false
          for (var i = 0; i < arr.length; i++) {
            userorder_num += arr[i].goods_num
            userorder_price += arr[i].goods_num * arr[i].member_goods_price
          }
          that.setData({
            userorder: arr,
            choose_bool: bool,
            userorder_num: userorder_num,
            userorder_price: userorder_price.toFixed(2)
          })
        }
      })
    } else {
      var my_order = wx.getStorageSync('my_buy_now')
      console.log(22222222222222222222)
      console.log(my_order)
      console.log(111111111111111111111111)
      var userorder_num = 0
      var userorder_price = 0
      var bool = false
      for (var i = 0; i < my_order.length; i++) {
        userorder_num += my_order[i].goods_num
        userorder_price += my_order[i].goods_num * my_order[i].member_goods_price
      }
      that.setData({
        userorder: my_order,
        choose_bool: bool,
        userorder_num: userorder_num,
        userorder_price: userorder_price.toFixed(2)
      })
    }
    
     
  },
  // 时刻更新商品价格数量的函数
  updataorder: function () {
    var userorder_num = 0
    var userorder_price = 0
    for (var i = 0; i < this.data.userorder.length; i++) {
      if (this.data.userorder[i].selected == 1) {
        userorder_num += this.data.userorder[i].goods_num
        userorder_price += this.data.userorder[i].goods_num * this.data.userorder[i].member_goods_price
      }
    }
    this.setData({
      userorder_num: userorder_num,
      userorder_price: userorder_price.toFixed(2)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      transformOrigin: "50% 50%",
      delay: 0
    })
    this.close_prompt = animation
    this.prompt_animation = animation

   
  },
  // 提交订单
  settlement:function(){
    console.log(this.data.userselectedaddress.address_id)
    var default_address = ''
    if(this.data.userselectedaddress==''){
      default_address = ''
      wx.showToast({
        title: '你没有选择收货地址',
        image: '../order/images/sleep.png'
      })
      return false
      
    } else {
      default_address = this.data.userselectedaddress.address_id
    }
    var user_info = wx.getStorageSync('user_all')
    if(user_info.length <=0) {
      wx.openSetting({
        success: function (res) {
          wx.getSetting({
            success: function (res) {
              user_login()
            }
          })
        }
      })
    } else {
      var that = this
      if(this.data.the_style==0) {
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/order/order_commit', //仅为示例，并非真实的接口地址
          method: "POST",
          header: {
            'x-access-token': user_info.access_token // 默认值
          },
          data: {
            address_id: default_address
          },
          success: function (res) {
            if (res.data.error == 10027) {
              wx.showToast({
                title: '请先添加地址',
              })
            } else {
              wx.showToast({
                title: '生成订单成功',
              })
              // this.close_prompt.bottom(0).step()
              // this.setData({
              //   prompt_bool: false
              // })
              // var that = this
              // setTimeout(function () {
              //   that.setData({
              //     animationData: that.close_prompt.export()
              //   })
              // }, 0)
              setTimeout(function () {
                wx.redirectTo({
                  url: '../logs/logsorder?list_num=0',
                })
              }, 1500)
            }
          }
        })
      } else {
        console.log(that.data.userorder)
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/order/order_commit', //仅为示例，并非真实的接口地址
          method: "POST",
          header: {
            'x-access-token': user_info.access_token // 默认值
          },
          data: {
            address_id: default_address,
            goods_id:that.data.userorder[0].goods_id,
            goods_num:that.data.userorder[0].goods_num,
            goods_spec: that.data.userorder[0].selectedItemId
          },
          success: function (res) {
            console.log(res)
            if (res.data.error == 10027) {
              wx.showToast({
                title: '请先添加地址',
              })
            } else {
              if(res.data.code == 200) {
                wx.showToast({
                  title: '生成订单成功',
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../logs/logsorder?list_num=0',
                  })
                }, 1500)
              } else {
                wx.showToast({
                  title: '订单提交失败',
                  image: '../order/images/sleep.png'

                })
              }
             
            }
          }
        })
      }
     
      
    }
  },
  // 关闭蒙版
  close:function(){
    console.log(this.close_prompt)
    var that = this
    
    this.prompt_animation.bottom('-700rpx').step()
    this.setData({
      animationData: that.prompt_animation.export()
    })
    
    setTimeout(function () {
      that.setData({
        prompt_bool: true
      })
    }, 200)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('qqqqqqq')
    console.log(this.data.the_styleaddress)
    console.log('qqqqqqq')
    if(this.data.the_styleaddress){
      var url = 'https://nb.yeshitou.com/index.php/v1/order/order_comfirm?address_id=' + this.data.the_styleaddress + '&buy_now=' + this.data.the_style
    } else {
      var url = 'https://nb.yeshitou.com/index.php/v1/order/order_comfirm?buy_now=' + this.data.the_style
    }
    var that = this
    var user_token = wx.getStorageSync('user_all')
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(1234)
        console.log(res)
        console.log(5678)
        if(res.data.code=='400') {
            that.setData({
            msg: "请填写收货地址",
            userselectedaddress: ''
          })
        } else {
          console.log(res.data.data.address)
          var string = res.data.data.address.province[0].name + res.data.data.address.city[0].name + res.data.data.address.district[0].name + res.data.data.address.address
          that.setData({
            msg: string,
            userselectedaddress: res.data.data.address
          })
        }
        // if (res.data.code == '400') {
        //   that.setData({
        //     msg: "你没有设置默认地址,点击去更改地址",
        //     userselectedaddress: ''
        //   })
        // } else {
        //   var the_judge = true
        //   for (var i = 0; i < res.data.data.info.length; i++) {
        //     if (res.data.data.info[i].is_default == 1) {
        //       the_judge = false
        //       var string = res.data.data.info[i].province_city_district[0].name + res.data.data.info[i].province_city_district[1].name + res.data.data.info[i].province_city_district[2].name + res.data.data.info[i].province_city_district[3].name + res.data.data.info[i].address
        //       console.log(string)
        //       that.setData({
        //         msg: string,
        //         userselectedaddress: res.data.data.info[i]
        //       })
        //     }
        //   }
        //   if(the_judge) {
        //     that.setData({
        //       msg: "你没有设置默认地址,点击去更改地址",
        //       userselectedaddress: ''
        //     })
        //   }
        // }


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
  },
  // 防止冒泡
  ssss:function(){

  }
})