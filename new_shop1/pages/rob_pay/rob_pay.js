// pages/rob_pay/rob_pay.js
var util = require('../../utils/util.js');
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
  var NowTime = new Date().getTime().toString().slice(0,10);
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
        the_name:'开始',
        the_now_buy_is:'即将开抢'
      })
  }
  if (total_micro_second < 7200 && total_micro_second > 0) {
    that.setData({
      the_name: '结束',
      the_now_buy_is: '立即抢购'
      
    })
  }
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }
    , 1000)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // 跳转测试
  jump_change:function(e){
  console.log(e.currentTarget)
  var that = this
  var the_time_detail = 'start_time=' + e.currentTarget.dataset.num.start_time + '&end_time=' + e.currentTarget.dataset.num.end_time + '&p=1'
  console.log(the_time_detail)
  this.setData({
    the_selectedNum: e.currentTarget.dataset.num.font,
    the_total_time: the_time_detail,
    end_time: e.currentTarget.dataset.num.end_time
  })
  wx.request({
    url: 'https://nb.yeshitou.com/index.php/v1/activity/ajax_flash_sale?' + the_time_detail, //仅为示例，并非真实的接口地址
    method: "GET",
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data.data)
      that.setData({
        goods_list: res.data.data
      })
    }
  })
  },
  // 跳到详情页
  jump_robdetail:function(e){
    console.log(e.currentTarget.dataset.num)
    wx.navigateTo({
      url: 'rob_detail?goods_id=' + e.currentTarget.dataset.num.goods_id + "&" + this.data.the_total_time,
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
    var that = this
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/activity/flash_sale_list', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        var the_arr = []
        for(var heha in res.data.data){
            the_arr.push(res.data.data[heha])
        }
        console.log(the_arr)
        var the_time_detail = 'start_time=' + the_arr[0].start_time + '&end_time=' + the_arr[0].end_time+ '&p=1'
        console.log(the_time_detail)
        if(res.data.code == 200) {
          that.setData({
            the_timeline: the_arr,
            the_selectedNum:the_arr[0].font,
            the_total_time:the_time_detail,
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
              if(res.data.code == 200 ){
                that.setData({
                  goods_list: res.data.data
                })
              }
              
            }
          })
        }else {
          wx.showToast({
            title: '数据发生错误,请尝试刷新页面',
            image: 'images/sleep.png'
          })
        }
        
      }
    })
    wx.request({
      url: 'https://nb.yeshitou.com/index.php/v1/activity/flash_sale_img', //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          first_carousel: res.data.data
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var date = new Date()
    console.log(date)
    var time_eee = Date.now()
    console.log(1111111)
    console.log(time_eee.toString())
    console.log(time_eee.toString().slice(0,10))
    this.setData({
      time_now: time_eee.toString().slice(0,10)
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