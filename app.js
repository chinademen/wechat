//app.js
var common = require('utils/common.js')
App({
  url: 'https://erdos.alex90.cn/index.php?pbid=80&s=/',
  PHPSESSID: '',
  common: common,
  onLaunch: function () {
    common.initApp(this.url + 'weiapp/Api/', true)
  },
  success: function (msg) {
    if (!msg) {
      msg = '操作成功'
    }
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    });
  },
  error: function (msg) {
    if (!msg) {
      msg = '操作成功'
    }
    wx.showToast({
      title: msg,
      image: '/image/icon/icon_wrong.png',
      duration: 12000
    });
  },
  globalData: {
    userInfo: null
  }
})