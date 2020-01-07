const app = getApp()
Page({
  data: {
  },
  onShow: function(){
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
  },
  onLoad: function (options) {
    
  },
  

})