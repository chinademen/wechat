var app = getApp()
Component({
  data: {
    checked:2,
    formData: '',
    timeReceipt: ['周一到周五', '均可'],
    score: wx.getStorageSync("score"),
    coupon_sn:''
  },
  attached: function () {
    var formData = wx.getStorageSync("formData");
    this.setData({
      formData: formData
    })
  },
  methods: {
    changePage(){
      wx.showLoading({
        title: 'loading'
      })

      if (!this.data.coupon_sn){
        wx.showToast({
          title: '请输入优惠券',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      const that = this;
      that.data.formData.coupon_sn = that.data.coupon_sn;
      wx.request({
        url: app.url + 'weiapp/api/submitOrders',
        header: {
          'content-type': 'application/json'
        },
        method :'POST',
        data: {
          formData: that.data.formData,
          PHPSESSID: wx.getStorageSync('PHPSESSID')
        },
        success: function (res) {
          wx.hideLoading();
          if(res.data.errcode){
            wx.showToast({
              title: '请填写正确的优惠券码或登录官方微商城，购买积分',
              icon: 'none',
              duration: 2000
            })
            return ;
          }else{

           wx.navigateTo({
            url: '../paySuccess/paySuccess'
          })

          }
         
        },
        complete: function (res) {

        }
      })


      
     
    },
    bindInputInput(e){
      this.setData({
        coupon_sn: e.detail.value
      })
    },
    changeRadio(e){
     
      wx.showToast({
        title: '您的积分不足够，请登录官方微商城，购买积分',
        icon: 'none',
        duration: 2000
      })
      if (e.detail.value == 1 && this.data.score < 6000) {

        
        return false
      }else{

        this.setData({
          checked: Number(e.detail.value)
        })
      }

      
    }
  }
})