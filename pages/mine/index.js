const app = getApp()
Page({

  data: {
    theme: app.globalData.theme,
    userInfo: app.globalData.userInfo,
    colors: [
      { color: '#8DC53E', mainColor: 'green', subColor: 'yellow', name:'绿色' },
      { color: '#FFB6C9', mainColor: 'pink', subColor: 'blue', name: '粉色' },
      { color: '#FF6A6A', mainColor: 'red', subColor: 'blue', name: '红色' },
      { color: '#FFD700', mainColor: 'yellow', subColor: 'blue', name: '黄色' },
      { color: '#1ad8ff', mainColor: 'blue', subColor: 'pink', name: '蓝色' },
      { color: '#A020F0', mainColor: 'purple', subColor: 'yellow', name: '紫色' }
    ],
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