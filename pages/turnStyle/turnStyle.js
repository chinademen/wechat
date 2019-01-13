Component({
  data: {
    model: 1,     // 1V领  2圆领  3半高领  4樽领  5一字领,
    modelShow:true,
    XionShow:true
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
    nativeGo(){
      wx.navigateTo({
        url: '../rule/rule'
      })
    }
  }
})