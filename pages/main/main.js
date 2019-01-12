
Page({
  data: {
    currentPage:2, 
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