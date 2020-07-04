const app = getApp()
Page({
	data: {
		theme: app.globalData.theme,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	onLoad: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
	},

	// 获取用户权限
	getUserInfo: function (e) {
		console.log(e)
		if (e.detail.errMsg == "getUserInfo:ok") {
			app.globalData.userInfo = e.detail.userInfo
			wx.setStorageSync('userInfo', e.detail.userInfo)
			this.login()
		}
	},

	// 使用code登陆（后台自动根据code获取oppenid）
	login: function(e){
		let that = this
    wx.login({
      success: data => {
        app.service.wxlogin(data.code).then(res => {
          if(res.code == 0){
            app.service.setHeader(res.data)
            wx.setStorageSync('token', res)
            wx.switchTab({
							url: '/pages/home/index',
						})
          }
        })
      }
    });
	}
})
