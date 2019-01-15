Component({
  data: {
    gender: 1,    // 1男    2女
    oldStyle: 1,     // 1套衫  2开衫
    oldModel: 1,     // 1V领-套衫  2圆领-套衫  3半高领-套衫  4樽领-套衫  5一字领-套衫 6V领-开衫  7圆领-开衫  8半高领-开衫
    oldChest: '',    // 胸围
    oldLength: '',  // 旧衣服长度
    taoSanList: [
      {
        id: 1,
        name: 'V领',
        src: '../../image/main/model/1.png'
      },
      {
        id: 2,
        name: '圆领',
        src: '../../image/main/model/2.png'
      },
      {
        id: 3,
        name: '半高领',
        src: '../../image/main/model/3.png'
      },
      {
        id: 4,
        name: '樽领',
        src: '../../image/main/model/4.png'
      },
      {
        id: 5,
        name: '一字领',
        src: '../../image/main/model/5.png'
      }
    ],
    kaiSanList: [
      {
        id: 6,
        name: 'V领',
        src: '../../image/main/model/6.png'
      },
      {
        id: 7,
        name: '圆领',
        src: '../../image/main/model/7.png'
      },
      {
        id: 8,
        name: '半高领',
        src: '../../image/main/model/8.png'
      }
    ]
  },
  attached: function () {
    

  },
  methods: {
    changePage() {
    
      var formData = wx.getStorageSync("formData");
      formData.gender = this.data.gender;
      formData.oldStyle = this.data.oldStyle;
      formData.oldModel = this.data.oldModel;
      formData.oldChest = this.data.oldChest;
      formData.oldLength = this.data.oldLength;
      
      wx.setStorageSync("formData", formData);

      if (!this.data.oldChest || !this.data.oldLength){
        wx.showToast({
          title: '胸围尺码范围40-100cm，衣长尺码范围51-100cm',
          icon: 'none',
          duration: 1000
        });
        return;
      }
      this.triggerEvent("changePage", { path: 2 })
    },
    changeGender(e) {
      this.setData({
        gender: Number(e.currentTarget.dataset.index)
      })
    },
    changeStyle(e) {
      var _style = e.currentTarget.dataset.index;
      var oldModel = _style == 1?1:6;
      this.setData({
        oldStyle: Number(e.currentTarget.dataset.index),
        oldModel: oldModel
      })


    },
    changeModel(e) {
      this.setData({
        oldModel: Number(e.currentTarget.dataset.index)
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
      if (value && (value < 40 || value > 100)) {
        wx.showToast({
          title: '胸围尺码范围40-100cm',
          icon: 'none',
          duration: 1000
        });
        this.setData({
          oldChest: '', 
        })
      }else if(value){
        this.setData({
          oldChest: value
        })
      }
    },
    bindReplaceLength(e) {
      const value = Number(e.detail.value);
      if (value && (value < 50 || value > 100)) {
        wx.showToast({
          title: '衣长尺码范围51-100cm',
          icon: 'none',
          duration: 1000
        })
        this.setData({
          oldLength: '', 
        })
      } else if (value){
        this.setData({
          oldLength: value,
        })
      }
    }
  }
})