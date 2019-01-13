
Page({
  data: {
    currentPage:1, 
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