Component({
  data: {
    gender: 1,    // 1男    2女
    style: 1,     // 1套衫  2开衫
    model: 1,     // 1V领  2圆领  3半高领  4樽领  5一字领
    chest: '',    // 胸围
    length: '',  // 旧衣服长度
    kaiSanList: [
      {
        name: 'V领',
        src: '../../image/main/v.png'
      },
      {
        name: '圆领',
        src: '../../image/main/b.png'
      },
      {
        name: '半高领',
        src: '../../image/main/yi.png'
      }
    ],
    taoSanList: [
      {
        name: 'V领',
        src: '../../image/main/v.png'
      },
      {
        name: '圆领',
        src: '../../image/main/b.png'
      },
      {
        name: '半高领',
        src: '../../image/main/yi.png'
      },
      {
        name: '樽领',
        src: '../../image/main/y.png'
      },
      {
        name: '一字领',
        src: '../../image/main/z.png'
      }
    ]
  },
  methods: {
    changePage() {
      this.triggerEvent("changePage", { path: 2 })
    },
    changeGender(e) {
      this.setData({
        gender: Number(e.currentTarget.dataset.index)
      })
    },
    changeStyle(e) {
      this.setData({
        style: Number(e.currentTarget.dataset.index)
      })
    },
    changeModel(e) {
      this.setData({
        model: Number(e.currentTarget.dataset.index)
      })
    },
    toggleModal: function () {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 尺码范围：胸围【40-100】 衣长【51-100】
    bindReplaceChest(e) {
      const value = Number(e.detail.value);
      if (value < 40 || value > 100) {
        wx.showToast({
          title: '胸围【40-100】',
          icon: 'none',
          duration: 1000
        });
        this.setData({
          chest: '', 
        })
      }
    },
    bindReplaceLength(e) {
      const value = Number(e.detail.value);
      if (value < 50 || value > 100) {
        wx.showToast({
          title: '衣长【51-100】',
          icon: 'none',
          duration: 1000
        })
        this.setData({
          length: '', 
        })
      }
    }
  }
})