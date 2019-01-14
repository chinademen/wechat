const app = getApp()
Page({
  data: {
    currentPage:1, 
  },
  onLoad: function () {
    wx.request({
      url: app.url + 'weiapp/api/getStoreList',
      data: {},
      success: function (res) {
        wx.setStorage({
          key:"getStoreList",
          data:res.data.data
        })
      }

    })
  },
  changePage(e){
    this.setData({
      currentPage: e.detail.path
    });
    wx.pageScrollTo({
      scrollTop: 0
    });
  }
})