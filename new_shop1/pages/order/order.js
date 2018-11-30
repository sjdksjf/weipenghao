// pages/order/order.js
var user_login = require('../../app.js')
var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 提示文本的蒙版
    prompt_bool:true,
    // 提示文本的动画
    animationData:'',
    // 商品规格的蒙版
    rule_bool:true,
    animationRule: '',
    // 商品的规格分类
    goodsuserchoose:'',
    goodsspec:'',
    // 商品的数量
    goodscommitnum: 1,
    scroll:'one',
    // 导航栏是否浮在最上面
    nav_bool: false,
    ceshi_jump:''
    
  
  },
// 给客服发送消息
  post_msgtype:function(){
    console.log('点击成功')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var user_token = wx.getStorageSync('user_all')
    console.log(user_token)
    if(!user_token) {
      user_token.access_token == ''
    }
    console.log("options",options)
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_info?goods_id='+options.goods_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(11111111111111111111111)
        console.log(res.data.data)
        let options = []
        for (let key in res.data.data.spec) {
          options.push({
            title: key,
            items: res.data.data.spec[key],
            // selectedItemId: -1,
            // selectedItem: -1
            selectedItemId: res.data.data.spec[key][0].item_id,
            selectedItem: res.data.data.spec[key][0].item
          });
        }
        console.log(options)
        that.setData({
          goodsuserchoose: res.data.data,
          options: options,
          isselectedItem: false,
          the_factprice: res.data.data.spec_goods_price[0].price
        })
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_detail?goods_id=' + options.goods_id + "&type=1", //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log(11111)
        if(res.data.code == 200) {
          let content = res.data.data.goods_content
          // content = content.replace(/(\/public.+?\.jpg|jpeg|png)/gi, config.web.root + '$1');
          // console.log(content)
          WxParse.wxParse('content111', 'html', content, that);
          that.setData({
            goods_attr: res.data.data,
            nodes: [{
              name: 'p',
              children: [{
                type: 'text',
                text: res.data.data.goods_content
              }]
            }]
          })
        }
        
        
        
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/comment/comment_list?goods_id=' + options.goods_id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': user_token.access_token // 默认值
      },
      success: function (res) {
        console.log(111)
        console.log(res.data)
        that.setData({
          order_comments:res.data.data
        })
        console.log(222)

      }
    })
  },
  // 立即购买
  buy_now: function () {
    var user_info = wx.getStorageSync('user_all')
    if (user_info) {
      if (user_info.mobile_validated == 0) {
        // wx.navigateTo({
        //   url: '../binding/binding',
        // })
      }
      if (!this.data.isselectedItem) {
        this.change_rule()
      } else {
        if(this.data.goodsstore <= 0) {
          wx.showToast({
            title: "商品库存不足",
            image: '../rob_pay/images/sleep.png'
          })
          return false
        }
        console.log(this.data.options, this.data.goodscommitnum, this.data.goodsuserchoose.goods_id)
        let optionsprice = []
        let spec_key_names = ''
        for (var i = 0; i < this.data.options.length; i++) {
          optionsprice.push(this.data.options[i].selectedItemId)
          spec_key_names += this.data.options[i].title + ':' + this.data.options[i].selectedItem + " "
        }
        console.log(this.data.goodsuserchoose)
        console.log(this.data.goodscommitnum)
        var obj = [{
          goods_id: this.data.goodsuserchoose.goods_id,
          goods_num: this.data.goodscommitnum,
          goods_name: this.data.goodsuserchoose.goods_name,
          member_goods_price: this.data.goodsprice,
          market_price: this.data.goodsuserchoose.market_price,
          selectedItemId: optionsprice.join('_'),
          selected: 1,
          img: this.data.goodsuserchoose.imgs[0].image_url,
          spec_key_name: spec_key_names
        }]
        console.log(obj)
        wx.setStorageSync('my_buy_now', obj)
        wx.navigateTo({
          url: '../shopcar/selforder?buy_now=1',
        })
        console.log(spec_key_names)
        // data: {
        //   goods_id: this.data.goodsuserchoose.goods_id,
        //   goods_num: this.data.goodscommitnum,
        //   goods_spec: optionsprice.join('_')
        // }
      }
    } else {
      wx.openSetting({
        success: function (res) {
          wx.getSetting({
            success: function (res) {
              user_login()
            }
          })
        }
      })
    }
  },// 立即购买
  buy_now1: function () {
    var user_info = wx.getStorageSync('user_all')
    if (user_info) {
      if (user_info.mobile_validated == 0) {
        // wx.navigateTo({
        //   url: '../binding/binding',
        // })
      }
      if (!this.data.isselectedItem) {
        wx.showToast({
          title: '请选择规格',
          image: 'images/sleep.png'
        })
      } else {
        if (this.data.goodsstore <= 0) {
          wx.showToast({
            title: "商品库存不足",
            image: '../rob_pay/images/sleep.png'
          })
          return false
        }
        console.log(this.data.options, this.data.goodscommitnum, this.data.goodsuserchoose.goods_id)
        let optionsprice = []
        let spec_key_names = ''
        for (var i = 0; i < this.data.options.length; i++) {
          optionsprice.push(this.data.options[i].selectedItemId)
          spec_key_names += this.data.options[i].title + ':' + this.data.options[i].selectedItem + " "
        }
        console.log(this.data.goodsuserchoose)
        console.log(this.data.goodscommitnum)
        var obj = [{
          goods_id: this.data.goodsuserchoose.goods_id,
          goods_num: this.data.goodscommitnum,
          goods_name: this.data.goodsuserchoose.goods_name,
          member_goods_price: this.data.goodsprice,
          market_price: this.data.goodsuserchoose.market_price,
          selectedItemId: optionsprice.join('_'),
          selected: 1,
          img: this.data.goodsuserchoose.imgs[0].image_url,
          spec_key_name: spec_key_names
        }]
        console.log(obj)
        wx.setStorageSync('my_buy_now', obj)
        wx.navigateTo({
          url: '../shopcar/selforder?buy_now=1',
        })
        console.log(spec_key_names)
        // data: {
        //   goods_id: this.data.goodsuserchoose.goods_id,
        //   goods_num: this.data.goodscommitnum,
        //   goods_spec: optionsprice.join('_')
        // }
      }
    } else {
      wx.openSetting({
        success: function (res) {
          wx.getSetting({
            success: function (res) {
              user_login()
            }
          })
        }
      })
    }
  },
  // 收藏商品
  collect_goods:function(){
    var user_info = wx.getStorageSync('user_all')
    console.log(this.data.goodsuserchoose)
    console.log(user_info)
    var that = this
    if (user_info) {
    if(this.data.goodsuserchoose.collect==0){
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/collect/collect_goods?id=' + this.data.goodsuserchoose.goods_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'x-access-token': user_info.access_token // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.data.goodsuserchoose.collect=1
          that.setData({
            goodsuserchoose:that.data.goodsuserchoose
          })


        }
      })
    } else {
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/collect/cancel_collect?goods_id=' + this.data.goodsuserchoose.goods_id, //仅为示例，并非真实的接口地址
        method: "GET",
        header: {
          'x-access-token': user_info.access_token // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.data.goodsuserchoose.collect = 0
          that.setData({
            goodsuserchoose: that.data.goodsuserchoose
          })


        }
      })
    }
  } else {
    wx.openSetting({
      success: function (res) {
        wx.getSetting({
          success: function (res) {
            user_login()
          }
        })
      }
    })
  }
   
  },
  // 将商品数量添加
  changenumadd:function(){
    this.setData({
      goodscommitnum: this.data.goodscommitnum+1
    })
  },
  // 将商品数量减少
 changenumreduce:function(){
   if (this.data.goodscommitnum == 1) {

   } else {
     this.setData({
       goodscommitnum: this.data.goodscommitnum - 1
     })
   }
 },
// 点击提示弹出提示蒙版
  change_prompt: function () {
    console.log(this.prompt_animation)
    this.prompt_animation.bottom(0).step()
    this.setData({
      prompt_bool: false
    })
    var that = this
    setTimeout(function () {
      that.setData({
        animationData: that.prompt_animation.export()
      })
    }, 0)
  }, 
  // 商品规格
  change_rule: function () {
    // console.log(this.prompt_animation)
    this.prompt_animation.bottom(0).step()
    this.setData({
      rule_bool: false,
      isselectedItem:true
    })
    var that = this
    setTimeout(function () {
      that.setData({
        animationRule: that.prompt_animation.export()
      })
    }, 0)
   this.calculate()
  },
  // 用于计算价格
  calculate:function(){
    if (!this.data.isselectedItem){
      this.setData({
        goodsprice: this.data.goodsuserchoose.market_price,
        goodsstore: 0
      })
      return false
    }
    let optionsprice = []
    for (var i = 0; i < this.data.options.length; i++) {
      optionsprice.push(this.data.options[i].selectedItemId)
    }
    //console.log(optionsprice.join('_'))
    for (var j = 0; j < this.data.goodsuserchoose.spec_goods_price.length; j++) {
      if (optionsprice.join('_') == this.data.goodsuserchoose.spec_goods_price[j].key) {
        this.setData({
          goodsprice: this.data.goodsuserchoose.spec_goods_price[j].price,
          goodsstore: this.data.goodsuserchoose.spec_goods_price[j].store_count
        })
      }
    }
  },
  // 改变选择的规格
  changeuserrule:function(e){
  var options = this.data.options
  options[e.target.dataset.big].selectedItemId = options[e.target.dataset.big].items[e.target.dataset.small].item_id
  options[e.target.dataset.big].selectedItem = options[e.target.dataset.big].items[e.target.dataset.small].item
  var qwerty = true 
  for(var i = 0; i < options.length; i++){
   // console.log(options[i])
    if (options[i].selectedItemId == -1) {
      qwerty = false
    }
  }
  this.setData({
    options:options,
    isselectedItem:qwerty
  })
  this.calculate()

  }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 消息蒙版的关闭
  down_prompt: function () {
    this.close_prompt.bottom('-180rpx').step()
    var that = this
    this.setData({
      animationData: this.close_prompt.export()
    })
    setTimeout(function () {
      that.setData({
        prompt_bool: true
      })
    }, 200)
    
  }, 
  // 商品规格蒙版的隐藏
  down_rule: function () {
    this.close_prompt.bottom('-660rpx').step()
    var that = this
    this.setData({
      animationRule: this.close_prompt.export()
    })
    setTimeout(function () {
      that.setData({
        rule_bool: true
      })
    }, 200)
  },
  onReady: function () {
    var query = wx.createSelectorQuery()
    var that = this
    query.select('.pic_detail').boundingClientRect(function (res) {
      // console.log(res)
      // console.log(res.height)
     
    }).exec()
 
    
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      transformOrigin: "50% 50%",
      delay: 0
    })
    this.close_prompt = animation
    this.prompt_animation = animation
    // 获取一次试验的详细信息
   
  },
// 防止冒泡
hhh:function(){

},
// 加入到购物车详情页
addshopcar:function(){
  var user_info = wx.getStorageSync('user_all')
  if (user_info) {
    if (user_info.mobile_validated == 0) {
      // wx.navigateTo({
      //   url: '../binding/binding',
      // })
    } 
    if (!this.data.isselectedItem) {
      this.change_rule()
    } else {
      //console.log(this.data.options, this.data.goodscommitnum, this.data.goodsuserchoose.goods_id)
      let optionsprice = []
      for (var i = 0; i < this.data.options.length; i++) {
        optionsprice.push(this.data.options[i].selectedItemId)
      }
      var user_token = wx.getStorageSync('user_all')
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/cart/add_cart', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          goods_id: this.data.goodsuserchoose.goods_id,
          goods_num: this.data.goodscommitnum,
          goods_spec: optionsprice.join('_')
        },
        header: {
          'x-access-token': user_token.access_token // 默认值
        },
        success: function (res) {
          //console.log(res.data)
          if (res.data.error_message == "商品库存不足") {
            wx.showToast({
              title: "商品库存不足",
              image: '../rob_pay/images/sleep.png'
            })
            return false
          }
          if (res.data.code == 200) {
            wx.showToast({
              title: '添加成功'
            })
          }
        }
      })
    }
  } else {
    wx.openSetting({
      success: function (res) {
        wx.getSetting({
          success: function (res) {
            user_login()
          }
        })
      }
    })
  }
},
// 加入到购物车规格页
addshopcar1: function () {
  var user_info = wx.getStorageSync('user_all')
  if (user_info) {
    if (user_info.mobile_validated == 0) {
      // wx.navigateTo({
      //   url: '../binding/binding',
      // })
    }
    if (!this.data.isselectedItem) {
      wx.showToast({
        title: '请选择规格',
        image:'images/sleep.png'
      })
    } else {
      let optionsprice = []
      for (var i = 0; i < this.data.options.length; i++) {
        optionsprice.push(this.data.options[i].selectedItemId)
      }
      var user_token = wx.getStorageSync('user_all')
      wx.request({
        url: 'https://nb.yeshitou.com/index.php/v1/cart/add_cart', //仅为示例，并非真实的接口地址
        method: "POST",
        data:{
          goods_id: this.data.goodsuserchoose.goods_id,
          goods_num: this.data.goodscommitnum,
          goods_spec: optionsprice.join('_')
        },
        header: {
          'x-access-token': user_token.access_token // 默认值
        },
        success: function (res) {
         // console.log(res.data)
          if(res.data.error_message == "商品库存不足"){
            wx.showToast({
              title:"商品库存不足",
              image:'../rob_pay/images/sleep.png'
            })
            return false
          }
          if(res.data.code == 200) {
            wx.showToast({
              title: '添加成功'
            })
          }
        }
      })

    }
  } else {
    wx.openSetting({
      success: function (res) {
        wx.getSetting({
          success: function (res) {
            user_login()
          }
        })
      }
    })
  }
},
// 图片滚动
pic_scroll: function () {
  
  this.setData({
    scroll:'one',
    ceshi_jump:'pic_detail'
  })
  //console.log(this.data.scroll)  
},
// 详情滚动
 data_scroll: function () {
  this.setData({
    scroll:'two',
    ceshi_jump: 'data_detail'
    
  })
  console.log(this.data.scroll)  
  
},
// recommend滚动
 recommend_scroll: function () {
  this.setData({
    scroll:'three',
    ceshi_jump: 'recommend_detail'
  })
 // console.log(this.data.scroll)  
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
  
  }, 
  onPageScroll: function (res) {
    console.log(res.scrollTop)

  },
  thetop:function(){
    var query = wx.createSelectorQuery()
    var that = this
    query.select('.thethree').boundingClientRect(function (res) {
      // console.log(res)
      console.log(res.top)
      if (res.top+100 <= 0) {
        if (that.data.nav_bool) {

        } else {
          that.setData({
            nav_bool: true
          })
        }
      } else {
        if (that.data.nav_bool) {

          that.setData({
            nav_bool: false
          })
        } else {

        }
      }
    }).exec()
    query.select('.pic_detail').boundingClientRect(function (res) {
      // console.log(res)
      // console.log(res.top)
      // console.log(res.height)
      if (res.top - 100>= -res.height) {
        if(that.data.scroll == 'one') {

        }else {
          that.setData({
            scroll:'one'
          })
        } 
      }
    }).exec()
    query.select('.data_detail').boundingClientRect(function (res) {
      // console.log(res)
      if (res.top + 100 <= 0 && res.top + 100 >= -res.height) {
        if (that.data.scroll == 'two') {

        } else {
          that.setData({
            scroll: 'two'
          })
        }
      }
      
    }).exec()
    query.select('.recommend_detail').boundingClientRect(function (res) {
      // console.log(res)
      if (res.top + 100 <= 0 && res.top + 100 >= -res.height) {
        if (that.data.scroll == 'three') {

        } else {
          that.setData({
            scroll: 'three'
          })
        }
      }
      
    }).exec()
  }
})