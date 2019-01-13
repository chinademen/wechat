Component({
  data: {
    gender:1,    // 1男    2女
    style:1,     // 1套衫  2开衫
    model:1,     // 1V领  2圆领  3半高领  4樽领  5一字领
    chest:'',    // 胸围
    length:''  // 旧衣服长度
  },
  methods: {
    changePage(){
      this.triggerEvent("changePage", { path: 2 })
    },
    changeGender(e){
      this.setData({
        gender:Number( e.currentTarget.dataset.index )
      })
    },
    changeStyle(e){
      this.setData({
        style:Number( e.currentTarget.dataset.index )
      })
    },
    changeModel(e){
      this.setData({
        model:Number( e.currentTarget.dataset.index )
      })
    }
  }
})