Component({
  data: {

  },
  methods: {
    changePage(){
      wx.navigateTo({
        url: '../paySuccess/paySuccess'
      })
    }
  }
})