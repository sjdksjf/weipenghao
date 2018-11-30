// pages/classification/classlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnum:'综合',
    price_bool:true,
    price_name:'价格'
  },
  // 改变排列方式
  changelistnum:function(e){
    var that = this
    this.setData({
      listnum:e.currentTarget.dataset.num
    })
    if(e.currentTarget.dataset.num == '综合'){
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?cat_id=' + that.data.options.cat_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 400) {
            that.setData({
              ahhhhhhh: true
            })
          } else {
            that.setData({
              classlist: res.data.data
            })
          }

        }
      })
    } else if (e.currentTarget.dataset.num == '销量') {
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?orderby=num&cat_id=' + that.data.options.cat_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 400) {
            that.setData({
              ahhhhhhh: true
            })
          } else {
            that.setData({
              classlist: res.data.data
            })
          }

        }
      })
    } else if (e.currentTarget.dataset.num == '新品'){
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?orderby=new&cat_id=' + that.data.options.cat_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 400) {
            that.setData({
              ahhhhhhh: true
            })
          } else {
            that.setData({
              classlist: res.data.data
            })
          }

        }
      })
    }
    if(e.currentTarget.dataset.num == '价格'){
      var heheheh = !that.data.price_bool
      this.setData({
        price_bool: heheheh
      })
    } else {
      this.setData({
        price_bool:true,
        price_name:"价格"
      })
    }
    },
    high:function(){
      var that = this
     this.setData({
       price_bool:true,
       price_name:"价格升序"
     })
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?orderby=priasc&cat_id=' + this.data.options.cat_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 400) {
            that.setData({
              ahhhhhhh: true
            })
          } else {
            that.setData({
              classlist: res.data.data
            })
          }

        }
      })
      
    },
    low:function(){
      var that = this
        this.setData({
          price_bool:true,
          price_name:"价格降序"
        })
        wx.request({
          url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?orderby=pridesc&cat_id=' + this.data.options.cat_id, //仅为示例，并非真实的接口地址
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code == 400) {
              that.setData({
                ahhhhhhh: true
              })
            } else {
              that.setData({
                classlist: res.data.data
              })
            }

          }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      options:options
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?cat_id='+options.cat_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code == 400) {
          that.setData({
            ahhhhhhh:true
          })
        } else {
          that.setData({
            classlist: res.data.data
          })
        }
        
      }
    })
  },
  // 跳转到详情分类
  jumpdetail: function (e) {
    var num = e.currentTarget.dataset.detail
    console.log(num)
    wx.navigateTo({
      url: '../order/order?goods_id=' + num,
    })

  },
// 返回
  back_home:function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    this.animate = animation
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