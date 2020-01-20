const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['王星月', '张胖子', '小月月', '大超超','新增对象 '],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSetting({
      success: res => {
        console.log(res)
      }
    })

  },

  requestMsg: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['gyoswKcyvpTLvJa9OXy98bRSf7RbazL_7mlNaaDXcMs'],
      success(res) {
        console.log("6****6")
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
    console.log(app.globalData)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})