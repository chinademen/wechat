

let markList =  []
Page({
  data: {
    currentTarget:'',
    markList: [],
    inputValue1: ''
  },
  onLoad(option) {
    const id = option.id
    const storageMarkList = wx.getStorageSync(`markList${id}`);
    console.log(id)
    this.setData({
      markList: storageMarkList || markList,
      currentTarget:id
    });
    
  },
  bindKeyInput(e) {
    const indx = Number(e.currentTarget.dataset.index);
    const newMarkList = this.data.markList[indx];
    newMarkList.inputValue = e.detail.value;
    this.setData({
      ["list[" + indx + "]"]: newMarkList
    })
  },
  naviGoBack() {
    const id = this.data.currentTarget
    wx.showToast({
      title: "成功提交",
      icon: 'success',
      duration: 2000
    });
    wx.setStorageSync(`markList${id}`, this.data.markList)
    // wx.navigateBack();
  },
  onChange(e) {
    const indx = Number(e.currentTarget.dataset.index);
    const newMarkList = this.data.markList[indx];
    newMarkList.x = e.detail.x;
    newMarkList.y = e.detail.y;
    this.setData({
      ["list[" + indx + "]"]: newMarkList
    })

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
  bindDele(e) {
    const indx = Number(e.currentTarget.dataset.index);
    markList.splice(indx, 1);
    this.setData({
      markList: markList
    });
  },

})