const app = getApp()
import util from '../../utils/util.js'

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}


Page({

  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],

    typeObject: [{
      name: '消费类型', key: 'type', select: null, arr: [
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
      ]
    }],
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

  bindChange: function (e) {
    const val = e.detail.value
    console.log(e)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})