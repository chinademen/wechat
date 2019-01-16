let observerList = []
var app = getApp()
Component({
  properties: {
    url: {
      type: String,
      observer(newVal, oldVal) {
        console.log(oldVal)
      }
    }
  },
  data: {
    ratio: 102 / 152,
    originUrl: '',
    currentResule: '',
    cropperResultZheng: {
      url: "",
      show: false
    },
    cropperResultBei: {
      url: "",
      show: false
    },
    currentPage: 2,
    photoList: []
  },
  methods: {
    navigateGo(e) {
      const indx = e.currentTarget.dataset.index
      const imgUrl = indx == 1 ? this.data.cropperResultZheng.url : this.data.cropperResultBei.url
      wx.navigateTo({
        url: `../mark/mark?id=${indx}&imgUrl=${imgUrl}`
      })
    },
    uploadTap(e) {
      let _this = this;
      const {
        pos
      } = e.currentTarget.dataset;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          wx.removeStorage({
            key: `markList${pos}`
          })
          wx.removeStorage({
            key: `markImg${pos}`
          })

          _this.setData({
            originUrl: res.tempFilePaths[0],
            currentResule: pos
          })
        }
      })
    },
    getCropperImg(e) {
      const {
        currentResule,
      } = this.data;
      var formData = wx.getStorageSync("formData");
      if (e.detail.url) {
        if (currentResule == "1") {
          this.setData({
            originUrl: '',
            cropperResultZheng: {
              url: e.detail.url,
              show: true
            }
          });
          formData.positivePhoto = e.detail.url;
        } else if (currentResule == "2") {
          this.setData({
            originUrl: '',
            cropperResultBei: {
              url: e.detail.url,
              show: true
            }
          })
          formData.backPhoto = e.detail.url;
        }
      } else {
        this.setData({
          originUrl: '',
        })
      }
      wx.setStorageSync("formData", formData);
    },
    changePage() {
      var positivePhoto = this.data.cropperResultZheng.url;
      var backPhoto = this.data.cropperResultBei.url;

      if (!positivePhoto || !backPhoto) {
        wx.showToast({
          title: '请先上传旧衣照片',
          icon: 'none',
          duration: 1000
        });
        return;
      }

      var formData = wx.getStorageSync("formData");
      formData.positivePhoto = positivePhoto;
      formData.backPhoto = backPhoto;
      formData.markList1 = wx.getStorageSync("markList1");
      formData.markList2 = wx.getStorageSync("markList2");
      formData.markImg1 = wx.getStorageSync("markImg1");
      formData.markImg2 = wx.getStorageSync("markImg2");
      formData.markImg2 = wx.getStorageSync("markImg2");
      formData.photoList = this.data.photoList;

      wx.setStorageSync("formData", formData);

      this.triggerEvent("changePage", {
        path: 3
      })
    },
    handleReadImg() {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const url = res.tempFilePaths[0];
          wx.showLoading({
            title: 'loading',
            mask: true
          })
          wx.uploadFile({
            url: app.url + 'weiapp/Api/upload&PHPSESSID=' + wx.getStorageSync('PHPSESSID'),
            filePath: url,
            name: 'download',
            header: { "Content-Type": "multipart/form-data" },
            success: function (res) {
              const data = JSON.parse(res.data)
              wx.hideLoading()
              observerList.push(data.data.url);
              _this.setData({
                photoList: observerList
              })

            },
            fail: function (res) {
              console.log('上传图片到服务器失败')
            },
            complete: function (res) {
              
            }
          })

          
        }
      })
    }
  }
})