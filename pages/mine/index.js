const app = getApp()
import util from '../../utils/util.js'
Page({

  data: {
    theme: app.globalData.theme,
    userInfo: app.globalData.userInfo,
    colors: util.colors,
    colorIndex: 0,
    showTheme:false
  },

  onLoad: function (options) {
    // 获取userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    console.log(app.globalData)
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
    console.log(e)
    let index = e.currentTarget.dataset.index
    let color = this.data.colors[index]
    console.log(this.data.theme)
    wx.setStorageSync('themeColor', color)
    app.setThemeColor()
    this.setData({
      colorIndex:index,
      theme: app.globalData.theme,
      showTheme: false
    })
  },

  onReady: function () {

  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    console.log(app.globalData.theme)
  },

  onShareAppMessage: function () {

  }
})