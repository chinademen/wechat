Component({
  data: {

  },
  methods: {
    changePage(){
      this.triggerEvent("changePage", { path: 5 })
    }
  }
})