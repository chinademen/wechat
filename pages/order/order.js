// pages/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    statusType: ["全部", "待接收", "未成功", "已接收"],
    currentType: 0,
    orderList: [
      {
        "id": "146",
        "price": "0.01",
        "money": "56.12",
        "socre": "56.12",
        "closths_size": "圆领套衫、130/64",
        "img": "https://erdos.alex90.cn/closths/img-1.png",
        "status":"1"
      },
      {
        "id": "146",
        "price": "0.01",
        "money": "56.12",
        "socre": "56.12", 
        "closths_size": "圆领套衫、130/64",
        "img": "https://erdos.alex90.cn/closths/img-1.png",
        "status": "2"
      }
    ]
  },
  statusTap: function (e) {
    wx.showToast({
      icon: 'loading',
      duration: 2000})

    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  cancelOrderTap: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userInfo = wx.getStorageSync('userInfo');
    var score = wx.getStorageSync('score');
    var activeIndex =0;
   
    this.setData({
      userInfo:userInfo,
      score: score,
      activeIndex: activeIndex
    })
    // wx.showLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})