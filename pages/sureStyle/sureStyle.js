Page({
  data: {
    formData: '',
    score: '',
    gender:['男','女'],
    styles: ['套衫','开衫'],
    models:['V领','圆领','半高领','樽领','一字领','V领','圆领','半高领'],
    mark:''
  },
  onLoad: function(option) {
    
    const formData = wx.getStorageSync("formData");
    const score = wx.getStorageSync("score")
    this.setData({
      formData: formData,
      score: score
    })
  },
  bindTextareaInput(e){
    this.setData({
      mark: e.detail.value
    })

    this.data.formData.mark = e.detail.value
    wx.setStorageSync("formData", this.data.formData);
  },
  naviGoBack() {
   
    
    wx.navigateTo({
      url: '../main/main?id=4'
    })
  },
})