Component({
  data: {
    checked:1
  },
  methods: {
    changePage(){
      wx.navigateTo({
        url: '../paySuccess/paySuccess'
      })
    },
    changeRadio(e){
      this.setData({
        checked:Number(e.detail.value)
      })
    }
  }
})