Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    timeReceipt: ['周一到周五', '均可'],
    focus: false,
    telephone: '',
    consignee: '',
    address: '',
    formData: ''
  },
  bindInputBlur1(e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  bindInputInput2(e) {
      this.setData({
        telephone: e.detail.value
      })
  },
  bindTextareaInput(e) {
    
    this.setData({
      address: e.detail.value
    })


  },
  addAddress() {




    if (!this.data.consignee || !this.data.telephone || !this.data.address){
      wx.showToast({
        title: '请填写完整后再提交！',
        icon: 'none',
        duration: 2000
      })
      return false
    }



    const telephone = this.data.telephone;
    const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    const res = myreg.test(telephone)
    if (!res) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        focus: true
      })
      return false
    }

    this.data.formData.consignee = this.data.consignee
    this.data.formData.telephone = this.data.telephone
    this.data.formData.timeReceipt = this.data.index
    this.data.formData.address = this.data.address
    wx.setStorageSync("formData", this.data.formData)

    wx.navigateTo({
      url: '../main/main?id=4'
    })
  },
  changeTime(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    const formData = wx.getStorageSync("formData");
   
    const score = wx.getStorageSync("score")
    this.setData({
      formData: formData,
      index: formData.timeReceipt ? formData.timeReceipt:0,
      telephone: formData.telephone,
      consignee: formData.consignee,
      address: formData.address
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})