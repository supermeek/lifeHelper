const app = getApp()
Page({
  data: {
    theme: app.globalData.theme
  },

  onLoad: function (options) {

    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })

    setTimeout(() => {
      wx.switchTab({ url: '/pages/home/index' })
    }, 2000)

    let that = this
    // wx.login({
    //   success: data => {
    //     app.service.wxlogin(data.code).then(res => {
    //       if(res.code == 0){
    //         app.service.setHeader(res.data)
    //         wx.setStorageSync('token', res)
    //         that.toPage()
    //       }
    //     })
    //   }
    // });
  },


  // 判断是否授权跳转页面
  toPage: function () {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          // setTimeout(() => {
          wx.switchTab({ url: '/pages/home/index' })
          // }, 1000)
        } else {
          //TODO 跳转授权页面 授权后使用oppenid登陆然后跳转home页面
          // setTimeout(() => {
          wx.redirectTo({ url: '/pages/index/allow' })
          // }, 1000)
        }
      }
    })
  },
})