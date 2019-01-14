Component({
  data: {
    model: 1,     // 1V领  2圆领  3半高领  4樽领  5一字领,
    modelShow:true,
    XionShow:true,
    sizeRange:["110/56","120/60","130/64","150/68","150/72","170/76"],
    size:'',
  },
  attached: function () { 
    var size = this.data.size ? this.data.size : this.data.sizeRange[0];
    this.setData({
      size: size
    })
  },
  methods: {
    changePage() {
      this.triggerEvent("changePage", { path: 4 })
    },
    changeModel(e) {
      this.setData({
        model: Number(e.currentTarget.dataset.index)
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