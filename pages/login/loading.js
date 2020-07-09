const app = getApp()
Page({
  data: {
    theme: app.globalData.theme
  },

  onLoad: function (options) {

    // 设置主题
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })

    this.toPage()

  },

  // 判断是否授权跳转页面
  toPage: function () {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo)
              app.globalData.userInfo = res.userInfo
              that.toLogin()
            }
          })
        } else {
          //TODO 跳转授权页面 授权后使用oppenid登陆然后跳转home页面
            wx.redirectTo({ url: '/pages/login/allow' })
        }
      }
    })
  },

  // 使用code登陆（后台自动根据code获取oppenid）
  toLogin: function () {
    wx.login({
      success: data => {
        app.service.wxlogin(data.code).then(res => {
          if (res.code == 0) {
            app.service.setHeader(res.data)
            wx.setStorageSync('token', res)
            wx.switchTab({ url: '/pages/home/index' })
          }
        })
      }
    });
  }
})