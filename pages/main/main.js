const app = getApp()
Page({
  data: {
    currentPage:3, 
  },
  onLoad: function () {

    var formData = wx.getStorageSync("formData");
    if(!formData){
      formData = 
        {
          gender:1,
          oldStyle:1,
          oldModel: 1,
          oldChest: '',
          oldLength: ''
        }
      wx.setStorageSync("formData", formData);
    }
    wx.request({
      url: app.url + 'weiapp/api/getStoreList',
      header: {
        'content-type': 'application/json'
      },
      data: {},
      success: function (res) {
        wx.setStorage({
          key:"storeLists",
          data: res.data.data
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