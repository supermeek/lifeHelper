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

	getUserInfo: function (e) {
		console.log(e)
		if (e.detail.errMsg == "getUserInfo:ok") {
			app.globalData.userInfo = e.detail.userInfo
			wx.switchTab({
				url: '/pages/home/index',
			})
		}
	}
})
