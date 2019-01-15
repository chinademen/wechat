Component({
  data: {
    model: 1,   //  1V领-套衫  2圆领-套衫  3半高领-套衫  4樽领-套衫  5一字领-套衫 6V领-开衫  7圆领-开衫  8半高领-开衫
    modelShow:true,
    XionShow:false,
    sizeRange:["110/56","120/60","130/64","140/68","150/72","160/76"],
    size:'',
    oldStyle:'',
    title:"V领",
    nowCloth:"../../image/main/show/1.png",
    positivePhoto:'',
    showList:[
      {
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
    var formData = wx.getStorageSync("formData");
    var size = this.data.size ? this.data.size : this.data.sizeRange[0];
    this.setData({
      size: size,
      positivePhoto: formData.positivePhoto,
      oldStyle: formData.oldStyle
    })
  },
  methods: {
    changePage() {
      this.triggerEvent("changePage", { path: 4 })
    },
    changeModel(e) {
      const id = Number(e.currentTarget.dataset.index);
      this.setData({
        model: id ,
        title: this.data.showList[id-1].name,
        nowCloth: this.data.showList[id-1].src
      })
    },
    changeSize(e){
      this.setData({
        size: e.currentTarget.dataset.size
      })
    },
    handleXionShow(){
      this.setData({
        modelShow:false,
        XionShow:true
      })
    },
    handleModelShow(){
      this.setData({
        modelShow:true,
        XionShow:false
      })
    },
    toggleModal: function () {
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})