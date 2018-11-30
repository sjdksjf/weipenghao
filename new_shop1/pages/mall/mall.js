//mall.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
var geturl = require('../../utils/util.js')
const app = getApp()
function dateformat(micro_second) {
  // 总秒数
  // var second = Math.floor(micro_second / 1000);
  var second = micro_second
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return hr + "小时" + min + "分钟" + sec + "秒";
  // return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
}
function countdown(that) {
  var EndTime = that.data.end_time || [];
  // console.log(EndTime)
  var NowTime = new Date().getTime().toString().slice(0, 10);
  // console.log(NowTime)
  var total_micro_second = EndTime - NowTime || [];
  // console.log('剩余时间：' + total_micro_second);
  // 渲染倒计时时钟

  that.setData({
    clock: dateformat(total_micro_second)
  });
  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    return;
  }
  if (total_micro_second >= 7200) {
    that.setData({
      the_name: '开始'
    })
  }
  if (total_micro_second < 7200 && total_micro_second > 0) {
    that.setData({
      the_name: '结束'
    })
  }
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }
    , 1000)
}
Page({
  data: {
    first_carousel: '',
    // 大的那个分类
    class_bigdata: ''

  },
  jump_jump: function (e) {
    console.log(e.currentTarget.dataset.num)
    var num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: num,
    })
  },
  // 轮播换图片时
  changecurrent: function (res) {
    console.log(res.detail)
  },
  // 跳转到详情分类
  jumpdetail: function (e) {
    var num = e.currentTarget.dataset.detail
    console.log(num)
    wx.navigateTo({
      url: '../order/order?goods_id=' + num,
    })

  },
  // 轮播图跳转
  jump_other_page: function (e) {
    var num = e.currentTarget.dataset.num
    console.log(num)
    wx.navigateTo({
      url: num.id,
    })
  },
  // 抢购详情
  jump_robdetail: function (e) {
    console.log(e.currentTarget.dataset.num)
    wx.navigateTo({
      url: '../rob_pay/rob_detail?goods_id=' + e.currentTarget.dataset.num.goods_id + "&" + this.data.the_total_time,
    })
  },
  // 商品列表
  goodslist: function (e) {
    var num = e.currentTarget.dataset.classid
    console.log(num)
    wx.navigateTo({
      url: '../classification/classlist?cat_id=' + num.cate2[1].id,
    })
    for (var key in num.cate2) {
      console.log(key)
      console.log(num.cate2[1])
    }
    // wx.request({
    //   url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list?cat_id=31', //仅为示例，并非真实的接口地址
    //   method: "GET",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  // 初次渲染时
  onReady: function () {
    wx.showTabBar({
      success: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/activity/flash_sale_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        var the_arr = []
        for (var heha in res.data.data) {
          the_arr.push(res.data.data[heha])
        }
        console.log(the_arr)
        var the_time_detail = 'start_time=' + the_arr[0].start_time + '&end_time=' + the_arr[0].end_time + '&p=1'
        console.log(the_time_detail)
        if (res.data.code == 200) {
          that.setData({
            the_timeline: the_arr,
            the_selectedNum: the_arr[0].font,
            the_total_time: the_time_detail,
            end_time: the_arr[0].end_time
          })
          countdown(that)
          wx.request({
            url: 'https://nb.yeshitou.com/index.php/v1/activity/ajax_flash_sale?' + the_time_detail, //仅为示例，并非真实的接口地址
            method: "GET",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data.data)
              if (res.data.code == 200) {
                that.setData({
                  goods_list: res.data.data
                })
              }

            }
          })
        } else {
          wx.showToast({
            title: '数据发生错误,请尝试刷新页面',
            image: 'images/sleep.png'
          })
        }

      }
    })
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var that = this
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/home/home_page', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        console.log(res.data.data.home_nav[0].name.split('|'))
        for (var i = 0; i < res.data.data.home_nav.length; i++) {
          // res.data.data.home_nav[i].name = res.data.data.home_nav[0].name.split('|')
          res.data.data.home_nav[i].name1 = res.data.data.home_nav[i].name.split('|')
        }
        that.setData({
          first_carousel: res.data.data.carouse_course,
          six_and_six: res.data.data.home_nav
        })
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/cate_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          class_bigdata: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/goods/goods_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          cainixihuan: res.data.data
        })
      }
    })



  },
  // 跳转到抢购页面
  jump_rub: function () {
    wx.navigateTo({
      url: '../rob_pay/rob_pay',
    })
  },
  onLoad: function () {
    var info = wx.getStorageSync('userInfo')
    if (info) {
      return
    } else {
      wx.navigateTo({
        url: '../londing/londing',
      })
    }
  }
})
