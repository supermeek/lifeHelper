const app = getApp()
import util from '../../utils/util.js'
Page({

  data: {
    theme: app.globalData.theme,
    userInfo: app.globalData.userInfo,
    colors: util.colors,
    colorIndex: 0,
    showTheme: false,
    typeList: util.typeList,
    outcomeTotal: 0,

  },

  onLoad: function (options) {
    // 获取userInfo
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || app.globalData.userInfo,
    })

    let that = this
    let month = util.formatDate(new Date(), 'month')
    let start = month + '-' + '01'
    let arr = start.split('-');
    let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')
    this.getBillPie(start, end,(res)=>{
      console.log(res)
      let outcomeTotal = 0
      for(let i in res.data.outcome){
        outcomeTotal = util.add(outcomeTotal,res.data.outcome[i].value) 
      }
      that.setData({
        typeList:res.data.outcome,
        outcomeTotal: outcomeTotal
      })
    })
  },


  toggleTheme: function () {
    this.setData({
      showTheme: !this.data.showTheme
    })
  },



  // 修改主题颜色
  switchSkin: function (e) {
    console.log(e)
    if (!e.currentTarget.dataset.index){
      this.setData({
        showTheme: false
      })
      return
    }
    let index = e.currentTarget.dataset.index
    let color = this.data.colors[index]
    wx.setStorageSync('themeColor', color)
    app.setThemeColor()
    this.setData({
      colorIndex: index,
      theme: app.globalData.theme,
      showTheme: false
    })
  },


  // 类型消费统计
  getBillPie: function (start, end, callback) {
    let that = this
    app.service.getBillPie(start, end)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          if (typeof (callback == 'function')) {
            callback(res)
          }
        }
      })
  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    console.log(app.globalData.theme)
  },

  onShareAppMessage: function () {

  }
})