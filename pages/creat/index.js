const app = getApp()
import util from '../../utils/util.js'
var bindInput = require('../../utils/bindInput')

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2000; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


Page(Object.assign({

  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [date.getFullYear() - 2000, date.getMonth(), date.getDate() - 1, 0],

    // 以上暂未使用

    outcome: true,
    date: util.formatDate(date),
    typeIndex: 0,
    amount: '',
    remark:'',
    typeList: [
      { id: 2, icon: 'icon-1.png', name: '餐饮', checked: true },
      { id: 3, icon: 'icon-2.png', name: '萌宠', checked: false },
      { id: 10, icon: 'icon-3.png', name: '宝贝', checked: false },
      { id: 4, icon: 'icon-4.png', name: '交通', checked: true },
      { id: 5, icon: 'icon-5.png', name: '居家', checked: false },
      { id: 6, icon: 'icon-6.png', name: '娱乐', checked: true },
      { id: 7, icon: 'icon-7.png', name: '衣装', checked: false },
      { id: 1, icon: 'icon-8.png', name: '社交', checked: true },
      { id: 9, icon: 'icon-9.png', name: '还款', checked: false },
      { id: 8, icon: 'icon-10.png', name: '其他', checked: true },
    ],

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
    console.log(e.detail)
  },

  onShow: function () {
    app.setThemeColor()
    console.log(app.globalData.theme)
    this.setData({ theme: app.globalData.theme })
  }

}, bindInput))