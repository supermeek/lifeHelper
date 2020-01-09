const app = getApp()
import util from '../../utils/util.js'
Page({

  data: {
    theme: app.globalData.theme,
    userInfo: app.globalData.userInfo,
    colors: util.colors,
    colorIndex: 0,
    showTheme: false,
    typeList: util.typeList,
  },

  onLoad: function (options) {
    // 获取userInfo
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || app.globalData.userInfo,
    })
  },

  toggleTheme: function () {
    this.setData({
      showTheme: !this.data.showTheme
    })
  },

  // 修改主题颜色
  switchSkin: function (e) {
    console.log(e)
    if (!e.currentTarget.dataset.index){
      this.setData({
        showTheme: false
      })
      return
    }
    let index = e.currentTarget.dataset.index
    let color = this.data.colors[index]
    wx.setStorageSync('themeColor', color)
    app.setThemeColor()
    this.setData({
      colorIndex: index,
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