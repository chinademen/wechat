
Component({
  data: {
    getStoreList:wx.getStorageSync("getStoreList"),
    checked:1 , // 1 快递 2 门店
  },

  methods: {
    changePage(){
      this.triggerEvent("changePage", { path: 5 })
    },
    nativeGo(){
      wx.navigateTo({
        url: '../writeAddress/writeAddress'
      })
    },
    changeRadio(e){
      this.setData({
        checked:Number(e.detail.value)
      })
    }
  }
})