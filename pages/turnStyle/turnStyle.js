Component({
  data: {
    model: '', //  1V领-套衫  2圆领-套衫  3半高领-套衫  4樽领-套衫  5一字领-套衫 6V领-开衫  7圆领-开衫  8半高领-开衫
    modelShow: true,
    XionShow: false,
    sizeRange: [],
    tips: {
      '110/56': '胸围: 34.5cm; 身长: 43.5cm; 袖长: 52.5cm; 肩宽: 28.5cm',
      '120/60': '胸围: 37cm; 身长: 46cm; 袖长: 55cm; 肩宽: 30cm',
      '130/64': '胸围: 40cm; 身长: 49cm; 袖长: 58cm; 肩宽: 32cm',
      '140/68': '胸围:43cm; 身长:52cm; 袖长:61cm; 肩宽:33.5cm',
      '150/72': '胸围:45.5cm; 身长:54.5cm; 袖长:64cm; 肩宽:35cm',
      '160/76': '胸围:48cm; 身长:57cm; 袖长:67cm; 肩宽:36.5cm'
    },
    size: '',
    title: "",
    formData: '',
    showList: [{
      id: 1,
      name: 'V领',
      src: '../../image/main/show/1.png'
    },
    {
      id: 2,
      name: '圆领',
      src: '../../image/main/show/2.png'
    },
    {
      id: 3,
      name: '半高领',
      src: '../../image/main/show/3.png'
    },
    {
      id: 4,
      name: '樽领',
      src: '../../image/main/show/4.png'
    },
    {
      id: 5,
      name: '一字领',
      src: '../../image/main/show/5.png'
    },
    {
      id: 6,
      name: 'V领',
      src: '../../image/main/show/6.png'
    },
    {
      id: 7,
      name: '圆领',
      src: '../../image/main/show/7.png'
    },
    {
      id: 8,
      name: '半高领',
      src: '../../image/main/show/8.png'
    }
    ],
    modelList: []
  },
  attached: function () {
    var formData = wx.getStorageSync("formData");
    var modelList = [],
      sizeRange = [];
    switch (formData.oldModel) {
      case 1:
        modelList = [{
          id: 1,
          name: 'V领',
          src: '../../image/main/model/1.png'
        }]
        break;
      case 2:
        modelList = [{
          id: 2,
          name: '圆领',
          src: '../../image/main/model/2.png'
        }, {
          id: 5,
          name: '一字领',
          src: '../../image/main/model/5.png'
        }]
        break;
      case 3:
        modelList = [{
          id: 2,
          name: '圆领',
          src: '../../image/main/model/2.png'
        },
        {
          id: 3,
          name: '半高领',
          src: '../../image/main/model/3.png'
        }
        ]


        break;
      case 4:
        modelList = [{
          id: 4,
          name: '樽领',
          src: '../../image/main/model/4.png'
        }, {
          id: 2,
          name: '圆领',
          src: '../../image/main/model/2.png'
        },
        {
          id: 3,
          name: '半高领',
          src: '../../image/main/model/3.png'
        }
        ]
        break;
      case 5:
        modelList = [{
          id: 2,
          name: '圆领',
          src: '../../image/main/model/2.png'
        }, {
          id: 5,
          name: '一字领',
          src: '../../image/main/model/5.png'
        }]
        break;
      case 6:
        modelList = [{
          id: 6,
          name: 'V领',
          src: '../../image/main/model/6.png'
        }]
        break;
      case 7:
        modelList = [{
          id: 7,
          name: '圆领',
          src: '../../image/main/model/7.png'
        }]
        break;
      case 8:
        modelList = [{
          id: 8,
          name: '半高领',
          src: '../../image/main/model/8.png'
        }]
        break;
    }
    const oldChest = formData.oldChest;
    const oldLength = formData.oldLength;
    const min = Math.min(formData.oldChest, formData.oldLength)
    if (min == oldChest) {

      if (oldChest > 55) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68", "150/72", "160/76"];
      } else if (oldChest > 52) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68", "150/72"];
      } else if (oldChest > 49) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68"];
      } else if (oldChest > 46) {
        sizeRange = ["110/56", "120/60", "130/64"];
      } else if (oldChest > 43) {
        sizeRange = ["110/56", "120/60"];
      } else if (oldChest > 40) {
        sizeRange = ["110/56"];
      }
    } else {
      if (oldLength > 66) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68", "150/72", "160/76"];
      } else if (oldLength > 64) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68", "150/72"];
      } else if (oldLength > 62) {
        sizeRange = ["110/56", "120/60", "130/64", "140/68"];
      } else if (oldLength > 56) {
        sizeRange = ["110/56", "120/60", "130/64",];
      } else if (oldLength > 54) {
        sizeRange = ["110/56", "120/60"];
      } else if (oldLength > 51) {
        sizeRange = ["110/56"];
      }

    }

    var size = this.data.size ? this.data.size : sizeRange[0];

    this.setData({
      formData: formData,
      size: size,
      positivePhoto: formData.positivePhoto,
      modelList: modelList,
      sizeRange: sizeRange,
      model: formData.oldModel,
      title: this.data.showList[formData.oldModel - 1].name
    })
  },
  methods: {
    nativeGo() {

      this.data.formData.newModel = this.data.model;
      this.data.formData.newSize = this.data.size;
      wx.setStorageSync("formData", this.data.formData);
      wx.navigateTo({
        url: '../sureStyle/sureStyle'
      })
    },
    changeModel(e) {
      const id = Number(e.currentTarget.dataset.index);
      this.setData({
        model: id,
        title: this.data.showList[id - 1].name
      })
    },
    changeSize(e) {
      this.setData({
        size: e.currentTarget.dataset.size
      })
    },
    handleXionShow() {
      this.setData({
        modelShow: false,
        XionShow: true
      })
    },
    handleModelShow() {
      this.setData({
        modelShow: true,
        XionShow: false
      })
    },
    toggleModal: function () {
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})