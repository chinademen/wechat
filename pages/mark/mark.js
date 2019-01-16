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
  
    wx.setStorageSync(`markList${id}`, dataMarkList);


    if(!dataMarkList){
      wx.navigateBack();
      return false;
    } 
    wx.showLoading({
      title: 'loading',
      mask: true
    })

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
          
          const tempFilePaths = response.tempFilePath

          _this.setData({
            tempFilePath: tempFilePaths
        })
          wx.uploadFile({
            url: app.url + 'weiapp/Api/upload&PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
            filePath: tempFilePaths,
            name: 'download',
            header: { "Content-Type": "multipart/form-data" },
            success: function (res) {
              wx.hideLoading();
              const data = JSON.parse(res.data)
              wx.setStorageSync(`markImg${id}`, data.data.url);
              wx.navigateBack();
            },
            fail: function (res) {
              console.log('上传图片到服务器失败')
            },
            complete: function (res) {
              
            }
          })

        }
      })
    })
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
    if (markList.length < 3) {
      markList.push({
        x: e.detail.x,
        y: e.detail.y,
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
    for (let i = 0; i < markList.length; i++) {
      markList[i].x = markList[i].x+30;
    }
    this.setData({
      markList: markList
    });
  },

})