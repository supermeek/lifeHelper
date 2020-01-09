const app = getApp()
import util from '../../utils/util.js'
var bindInput = require('../../utils/bindInput')

Page(Object.assign({

  data: {
    outcome: true,
    date: util.formatDate(new Date(), 'day'),
    typeIndex: 0,
    amount: '',
    desc:'我和胖超的晚饭',
    typeList: util.typeList,

  },

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 收入支出点击
  tabClick: function (e) {
    console.log(e)
    let outcome = e.currentTarget.dataset.tab
    if (outcome == 1) {
      this.setData({
        outcome: true
      })
    } else {
      this.setData({
        outcome: false
      })
    }
  },

  // 日期切换
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 类型选择
  bindTypeChange: function(e){
    const val = e.detail.value
    console.log(e)
    this.setData({
      typeIndex: val
    })
  },

  // 金额输入
  bindInputAmount: function(e){
    let value = e.detail.value
    value = value.replace(/[^\d.]/g, "")
    value = value.replace(/^\./g, "")
    value = value.replace(/\.{2,}/g, ".")
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    this.setData({
      amount: value
    })
  },

  // 确认提交
  submitConfirm: function(e){
    console.log(e.detail.value)
    let that = this
    let value = e.detail.value
    let type = that.data.typeList[value.type].name
    let outcome = that.data.outcome
    let money = parseFloat(that.data.amount).toFixed(2)
    let time = value.date + " " + util.formatDate(new Date(), 'time')
    let desc = value.desc

    app.service.creatBill(type, outcome, money, time, desc, '创建成功' )
      .then(res => {
          console.log(res)
        if (res.code == 0) {
        }
      })
  },

  

  onShow: function () {
    app.setThemeColor()
    console.log(app.globalData.theme)
    this.setData({ theme: app.globalData.theme })
  }

}, bindInput))