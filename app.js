import service from './service/service.js'
App({

  service: new service(),

  globalData: {
    userInfo: null,
    theme: { color: '#A4D165', minColor: 'green', subColor: 'yellow', name: '绿色' }
  },


  onLaunch: function () {

  },


  // 切换主题颜色
  setThemeColor: function () {
    let color = { color: '#A4D165', mainColor: 'green', subColor: 'yellow', name: '绿色' }
    if (wx.getStorageSync('themeColor')){
      color = wx.getStorageSync('themeColor')
    }
    this.globalData.theme = {
      color: color.color,
      mainColor: color.mainColor,
      subColor: color.subColor,
    }
    wx.setTabBarStyle({
      selectedColor: color.color
    })
    wx.setNavigationBarColor({
      frontColor: '#000000', // 必写项
      backgroundColor: color.color, // 必写项
    })
  }

})