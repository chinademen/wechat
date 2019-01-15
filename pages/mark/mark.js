var app = getApp()

Page({
  data: {
    currentTarget: '',
    markList: [],
    inputValue1: '',
    imgUrl: '',
    tempFilePath: ''
  },
  onLoad(option) {
    const id = option.id
    const imgUrl = option.imgUrl;
    const storageMarkList = wx.getStorageSync(`markList${id}`);
    this.setData({
      markList: storageMarkList || [],
      currentTarget: id,
      imgUrl: imgUrl
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
    const id = this.data.currentTarget;
    const _this = this;
    const dataMarkList = this.data.markList
    wx.showToast({
      title: "成功提交",
      icon: 'success',
      duration: 2000
    });
    wx.setStorageSync(`markList${id}`, dataMarkList);
    const ctx = wx.createCanvasContext('imgcrop');
    ctx.strokeStyle = '#fff';
    ctx.drawImage(this.data.imgUrl, 0, 0, 299, 299);
    for (let i = 0; i < dataMarkList.length; i++) {
      ctx.drawImage("../../image/markcutter/cuterrBg.png", dataMarkList[i].x, dataMarkList[i].y, 29.5, 34.5);
      ctx.strokeText(`${i + 1}`, dataMarkList[i].x + 12, dataMarkList[i].y + 18);
    }
    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'imgcrop',
        success(response) {
          console.log(`canvas生成的图片地址是${response.tempFilePath}`);
          const tempFilePaths = response.tempFilePath
          wx.uploadFile({
            url: app.url + 'weiapp/Api/upload&PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
            filePath: tempFilePaths,
            name: 'download',
            header: { "Content-Type": "multipart/form-data" },
            success: function (res) {
              console.log('上传图片到服务器成功')
            },
            fail: function (res) {
              console.log('上传图片到服务器失败')
            },
            complete: function (res) {
              console.log(res)
            }
          })

        }
      })
    })
    // wx.canvasToTempFilePath({
    //   x: 0,
    //   y: 0,
    //   width: 500,
    //   height: 500,
    //   destWidth: 100,
    //   destHeight: 100,
    //   canvasId: 'imgcrop',
    //   success(res) {
    //     _this.setData({
    //       tempFilePath:res.tempFilePath
    //     })
    //     console.log(res.tempFilePath)
    //   }
    // })

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
    const markList = this.data.markList;
    console.log(e)
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
    this.data.markList.splice(indx, 1);
    const markList = this.data.markList;
    this.setData({
      markList: markList
    });
  },

})