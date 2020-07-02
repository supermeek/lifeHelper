const app = getApp()
Page({
  data: {
    theme: app.globalData.theme
  },

  onLoad: function (options) {

    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })

    // setTimeout(() => {
    //   wx.switchTab({ url: '/pages/home/index' })
    // }, 2000)

    let that = this
    wx.login({
      success: data => {
        app.service.wxlogin(data.code).then(res => {
          if (res.code == 0) {
            app.service.setHeader(res.data)
            wx.setStorageSync('token', res)
            // wx.switchTab({ url: '/pages/home/index' })
            that.toPage()
          }
        })
      }
    });
  },


  // 判断是否授权跳转页面
  toPage: function () {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          wx.getUserInfo({
            success: res => {
              // console.log(res) //用户微信信息
              wx.setStorageSync('userInfo', res.userInfo)
              app.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {  //回调
                that.userInfoReadyCallback(res)
              }
            }
          })
          wx.switchTab({ url: '/pages/home/index' })
        } else {
          //TODO 跳转授权页面 授权后使用oppenid登陆然后跳转home页面
          wx.redirectTo({ url: '/pages/index/allow' })
        }
      }
    })
  },
})