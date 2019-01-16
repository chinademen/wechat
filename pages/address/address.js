Component({
  data: {
    storeList: wx.getStorageSync("storeLists"),
    checked: 1, // 1 快递 2 门店
    index: 0,
    formData: ''
  },
  attached: function() {
    var formData = wx.getStorageSync("formData");
    this.setData({
      formData: formData
    })

  },
  methods: {
    changePage() {
   
      if (this.data.checked == 2) {
       
        this.data.formData.store = this.data.storeList.stores[this.data.index];
        this.data.formData.storeAddress = this.data.storeList.storeAddress[this.data.index];
      }
      this.data.formData.senType = this.data.checked;

      wx.setStorageSync("formData", this.data.formData);

      this.triggerEvent("changePage", {
        path: 5
      })
    },
    nativeGo() {
 
      wx.navigateTo({
        url: '../writeAddress/writeAddress'
      })
    },
    changeRadio(e) {
      this.setData({
        checked: Number(e.detail.value)
      })
    },
    changeStore(e) {
      this.setData({
        index: e.detail.value
      })
    }

  }
})