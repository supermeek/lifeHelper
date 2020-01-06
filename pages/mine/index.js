const app = getApp()
Page({

  data: {
    theme: app.globalData.theme,
    userInfo: app.globalData.userInfo,
    colors: ['#8DC53E', '#FFB6C9', '#FF6A6A', '#FFD700', '#FFB90F', '#1ad8ff', '#A020F0',],
    colorIndex: 0,
    showTheme:false
  },

  onLoad: function (options) {
    // 获取userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    //TODO 最后删掉
    app.userInfoReadyCallback = res => {
      console.log(res)
      this.setData({
        userInfo: res.userInfo || app.globalData.userInfo,
      })
    }
  },

  toggleTheme: function(){
    this.setData({
      showTheme: !this.data.showTheme
    })
  },

  // 修改主题颜色
  switchSkin: function(e){
    let index = e.currentTarget.dataset.index
    let color = this.data.colors[index]
    app.setThemeColor(color)
    this.setData({
      colorIndex:index,
      theme: app.globalData.theme,
      showTheme: false
    })
    wx.setStorageSync('themeColor', color)
  },

  onReady: function () {

  },

  onShow: function () {
    app.setThemeColor(wx.getStorageSync('themeColor') || '#8DC53E')
    this.setData({ theme: app.globalData.theme })
  },

  onShareAppMessage: function () {

  }
})