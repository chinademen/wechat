//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    hideModal1: true, //模态框的状态  true-隐藏  false-显示
    hideModal2: true, //模态框的状态  true-隐藏  false-显示
    showBindPhone: false,
    showRule: wx.getStorageSync("showRule"),
    goNext:false
  },
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        content: '绑定手机号码可以更好的为您服务',
        confirmText: '好的',
        showCancel: false,
        success(res) {
        }
      })
    } else {
      wx.request({
        url: app.url + 'weiapp/api/getPhonenumber',
        header: {
          'content-type': 'application/json'
        },
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          PHPSESSID: wx.getStorageSync('PHPSESSID')
        },
        success: function (res) {
          var data = res.data.data;
          if (data.mobile) {

            wx.setStorageSync("mobile", data.mobile)
            wx.setStorageSync("score", data.score)
            that.setData({
              showBindPhone: false
            })

          } else {
            app.error('绑定失败');
          }
        },
        complete: function (res) {
          console.log('complete')
          console.log(res)
        }
      })
    }
  },
  //填写旧衣信息
  next: function () {
    var mobile = wx.getStorageSync('mobile');
    if (!mobile) {
      this.setData({
        showBindPhone: true
      })
    } else {
      wx.navigateTo({
        url: '../main/main'
      })
    }

    if(!this.data.showRule){
      this.setData({
        isShow2: !this.data.isShow2,
        showRule:true,
        goNext:true
      })
      wx.setStorageSync("showRule", true);
      return;
    }
    wx.navigateTo({
      url: '../main/main'
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../rule/rule'
    })
  },
  // 显示遮罩层
  toggleModal1: function () {
    this.setData({
      isShow1: !this.data.isShow1
    })
  },
  // 隐藏遮罩层
  toggleModal2: function () {
   
    this.setData({
      isShow2: !this.data.isShow2
    })
    wx.setStorageSync("showRule", true);
    if (this.data.goNext) {
      this.setData({
        goNext: false
      })
      wx.navigateTo({
        url: '../main/main'
      })
    }
  },
  toOrder: function () {
    wx.navigateTo({
      url: "/pages/order/order"
    });
  },


})
