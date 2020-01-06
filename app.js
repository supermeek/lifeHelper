import service from './service/service.js'
App({

  service: new service(),

  // 默认全局数据
  globalData: {
    userInfo: null,
    theme: { color: '#8DC53E', minColor: 'green', subColor: 'yellow', name: '绿色' }
  },

  // 启动
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)


    let that = this
    wx.login({
      success: res => {
        that.service.wxlogin(res.code).then(res => {
          that.service.setHeader(res.data)
          that.toPage()
        })
      }
    });
  },

  // 判断是否授权跳转页面
  toPage: function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权 使用oppenid直接登陆/跳转登陆页面
          wx.getUserInfo({
            success: res => {
              // console.log(res) //用户微信信息
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {  //回调
                this.userInfoReadyCallback(res)
              }
              setTimeout(() => {
                wx.switchTab({ url: '/pages/home/index' })
              }, 1000)
            }
          })
        } else {
          //TODO 跳转授权页面 授权后使用oppenid登陆然后跳转home页面
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/index/allow' })
          }, 1000)
        }
      }
    })
  },


  // 切换主题颜色
  setThemeColor: function () {

    let color = { color: '#8DC53E', minColor: 'green', subColor: 'yellow', name: '绿色' }

    if (wx.getStorageSync('themeColor')){
      color = wx.getStorageSync('themeColor')
    }

    this.globalData.theme = {
      mainColor: color.mainColor,
      subColor: color.subColor,
    }
    wx.setTabBarStyle({
      selectedColor: color.color
    })
    wx.setNavigationBarColor({
      frontColor: '#000000', // 必写项
      backgroundColor: color.color, // 必写项
      // animation: { // 可选项
      //   duration: 400,
      //   timingFunc: 'easeIn'
      // }
    })
  }

})