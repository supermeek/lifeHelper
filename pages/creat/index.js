const app = getApp()
import util from '../../utils/util.js'
var bindInput = require('../../utils/bindInput')

Page(Object.assign({

  data: {
    outcome: true,
    outtext: '消费',
    maxDate: util.formatDate(new Date(), 'day'),
    date: util.formatDate(new Date(), 'day'),
    typeIndex: null,
    amount: '',
    desc:'',
    typeList: util.typeList,
    disabled: false
  },

  onLoad: function (options) {

  },



  onReady: function () {

  },


  // 收入支出点击
  tabClick: function (e) {
    console.log(e)
    let outcome = e.currentTarget.dataset.tab
    if (outcome == 1) {
      this.setData({
        outcome: true,
        outtext: '消费'
      })
    } else {
      this.setData({
        outcome: false,
        outtext: '收入'
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
    let time = value.date + " " + util.formatDate(new Date(), 'time')
    if (that.data.amount == 0 || !that.data.amount){
      util.showToast('请输入'+that.data.outtext+'金额')
      return
    }else{
      var money = parseFloat(that.data.amount).toFixed(2)
    }
    if (value.type == null) {
      util.showToast('请选择' + that.data.outtext + '类型')
      return
    }else{
      var type = that.data.typeList[value.type].name
    }

    that.setData({ disabled: true })
    that.creatBill(type, that.data.outcome, money, time, value.desc, '创建成功')
  },


  // 创建账单
  creatBill: function (type, outcome, money, time, desc, info){
    let that = this
    app.service.creatBill(type, outcome, money, time, desc, info)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          wx.navigateBack({
            delta: 1
          })
        }else{
          that.setData({ disabled: true })
        }
      }).catch(res => {
        that.setData({ disabled: true })
      })
  },


  onShow: function () {
    app.setThemeColor()
    console.log(app.globalData.theme)
    this.setData({ theme: app.globalData.theme })
  }

}, bindInput))