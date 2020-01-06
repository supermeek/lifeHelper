App({

  globalData: {
    userInfo: null,
    theme: { //默认主题颜色
      fontColor: "color: #8DC53E",
      bgColor: "background: #8DC53E; color: #fff",
      borderColor: "border:1rpx solid #8DC53E; background: #fff; color:#8DC53E",
      borderBottomColor: "border-bottom:1rpx solid #8DC53E" ,
    }
  },

  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          wx.getUserInfo({
            success: res => {
              // console.log(res) //用户微信信息
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况   
              if(this.userInfoReadyCallback){
                this.userInfoReadyCallback(res)
              }

              //TODO 使用oppenid登陆然后跳转home页面
              setTimeout(() => {
                wx.switchTab({ url: '/pages/home/index' })
              },2000)
            }
          })
        }else{
          //TODO 跳转授权页面 授权后使用oppenid登陆然后跳转home页面
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/index/allow' })
          },2000)
        }
      }
    })
  },

  // 切换主题颜色
  setThemeColor: function(color){
    this.globalData.theme = {
      fontColor: "color: " + color,
      bgColor: "background: " + color + "; color: #fff",
      borderColor: "border:1rpx solid " + color + "; background: #fff; color:" + color,
      borderBottomColor: "border-bottom:1rpx solid " + color ,
    }
    wx.setTabBarStyle({
      selectedColor: color
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: color, // 必写项
      // animation: { // 可选项
      //   duration: 400,
      //   timingFunc: 'easeIn'
      // }
    })
  }
  
})