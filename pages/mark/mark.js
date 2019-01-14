let markList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markList: [

    ],
    inputValue1: ''
  },
  bindKeyInput(e) {
    const indx = Number(e.currentTarget.dataset.index) ;
    const newMarkList =  this.data.markList[indx];
    newMarkList.inputValue =  e.detail.value;
    this.setData({
      ["list["+ indx + "]"]:newMarkList
    })
  },
  naviGoBack() {
    wx.navigateBack()
  },
  addMark(e) {
    if (markList.length < 3) {
      markList.push({
        x: e.detail.x - 42,
        y: e.detail.y - 25,
        inputValue: ''
      });
      this.setData({
        markList: markList
      })
    } else {
      wx.showToast({
        title: '最多只能添加三处',
        icon: 'none',
        duration: 1000
      })
    }
  },
  bindDele(e){
    const indx = Number(e.currentTarget.dataset.index) ;
    markList.splice(indx,1);
    this.setData({
      markList: markList
    });
  }

})