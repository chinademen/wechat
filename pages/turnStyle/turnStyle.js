Component({
  data: {

  },
  methods: {
    changePage(){
      this.triggerEvent("changePage", { path: 4 })
    }
  }
})