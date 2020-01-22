const app = getApp()
import util from '../../utils/util.js'
var bindInput = require('../../utils/bindInput')

Page(Object.assign({

  data: {
    targetId: null,
    weightId: null,
    maxDate: util.formatDate(new Date(), 'day'),
    date: util.formatDate(new Date(), 'day'),
    disabled: false,
    weight: '',
    height: ''
  },

  onLoad: function (options) {

    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })

    console.log(options)
    if (options.targetId) {
      this.setData({
        targetId: options.targetId
      })
    }
    if (options.weightId) {
      this.setData({
        weightId: options.weightId
      })
      this.getWeight(options.targetId, options.weightId)
    }
  },


  getWeight: function (targetId, weightId) {
    let that = this
    app.service.getWeightDetail(targetId, weightId)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            weight: res.data.weight,
            height: res.data.height,
            date: util.formatDate(new Date(res.data.record_datetime), 'day'),
          })
        }
      })
  },


  // 日期切换
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },



  // 确认提交
  submitConfirm: function (e) {
    console.log(e.detail.value)
    let that = this
    let value = e.detail.value
    let time = value.date + " " + util.formatDate(new Date(), 'time')
    let weight = value.weight
    let height = value.height
    that.setData({ disabled: true })
    that.creatWeight(time, weight, height,'创建成功')
  },


  // 创建账单
  creatWeight: function ( time, weight, height, info ) {
    let targetId = this.data.targetId
    let weightId = this.data.targeweightIdtId
    app.service.creatWeightList(targetId, weightId, time, weight, height, info)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        } else {
          that.setData({ disabled: false })
        }
      }).catch(res => {
        that.setData({ disabled: false })
      })
  }

}, bindInput))