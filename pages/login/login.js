var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '鄂尔多斯1980',
    logo: '../../image/icon/logo.jpg',
  },
  saveUserInfo: function (baseUrl, res) {
    wx.setStorageSync("userInfo", res.userInfo)
    wx.request({
      url: baseUrl + 'weiapp/api/saveUserInfo',
      data: {
        iv: res.iv,
        encryptedData: res.encryptedData,
        PHPSESSID: wx.getStorageSync('PHPSESSID')
      },
      success: function (res) {
        var data = res.data.data;
        wx.setStorageSync('mobile',data.mobile);
        wx.setStorageSync('score', data.score);
        wx.navigateTo({
          url: '/pages/index/index'
        })
      },
      complete:function(res){
        
      }
    })
  },
  login: function (e) {
    this.saveUserInfo(app.url, e.detail)
  }
})