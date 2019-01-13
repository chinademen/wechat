Component({
  data: {

  },
  methods: {
    changePage(){
      this.triggerEvent("changePage", { path: 5 })
    },
    nativeGo(){
      wx.navigateTo({
        url: '../writeAddress/writeAddress'
      })
    }
  }
})