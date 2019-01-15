let observerList = []
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
      url: "../../image/main/zheng.png",
      show: false
    },
    cropperResultBei: {
      url: "../../image/main/zheng.png",
      show: false
    },
    currentPage: 2,
    photoList: []
  },
  methods: {
    navigateGo(e){
      const indx = e.currentTarget.dataset.index
      wx.navigateTo({
        url: `../mark/mark?id=${indx}`
      })
    },  
    uploadTap(e) {
      let _this = this;
      const { pos } = e.currentTarget.dataset;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          _this.setData({
            originUrl: res.tempFilePaths[0],
            currentResule: pos
          })
        }
      })
    },
    getCropperImg(e) {
      const { currentResule, } = this.data;
      if (e.detail.url) {
        if (currentResule == "1") {
          this.setData({
            originUrl: '',
            cropperResultZheng: {
              url: e.detail.url,
              show: true
            }
          })
        } else if (currentResule == "2") {
          this.setData({
            originUrl: '',
            cropperResultBei: {
              url: e.detail.url,
              show: true
            }
          })
        }
      } else {
        this.setData({
          originUrl: '',
        })
      }
    },
    changePage() {
      this.triggerEvent("changePage", { path: 3 })
    },
    handleReadImg() {
      let _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const url = res.tempFilePaths[0];
          observerList.push(url);
          console.log(observerList)
          _this.setData({
            photoList:observerList
          })
        }
      })
    }
  }
})