import service from './service/service.js'

App({

  service: new service(),

  globalData: {
    userInfo: {},
    theme: { color: '#A4D165', minColor: 'green', subColor: 'yellow', name: '绿色' }
  },


  onLaunch: function () {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          wx.getUserInfo({
            success: res => {
              // console.log(res) //用户微信信息
              wx.setStorageSync('userInfo', res.userInfo)
              // that.globalData.userInfo = res.userInfo
              // if (that.userInfoReadyCallback) {  //回调
              //   that.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    })
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