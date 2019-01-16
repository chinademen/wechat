Component({
  data: {
    formData: '',
    styles: ['套衫', '开衫'],
    models: ['V领', '圆领', '半高领', '樽领', '一字领', 'V领', '圆领', '半高领']
  },
  attached: function() {
    const formData = wx.getStorageSync("formData")
    this.setData({
      formData: formData
    })
  },
  methods: {
    nativeGo() {
      wx.navigateTo({
        url: '../sureStyle/sureStyle'
      })
    }
  }
})