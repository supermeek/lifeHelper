const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: util.typeList,
    list:[
      {
        time: '2020年12月21日 周三',
        list:[
          { id: 1, icon: 'icon-1.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 2, icon: 'icon-2.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 3, icon: 'icon-3.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 4, icon: 'icon-3.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 5, icon: 'icon-4.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true }
        ]
      },
      {
        time: '2020年12月21日 周三',
        list: [
          { id: 1, icon: 'icon-5.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 2, icon: 'icon-6.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 3, icon: 'icon-7.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 4, icon: 'icon-7.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 5, icon: 'icon-8.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true }
        ]
      },
      {
        time: '2020年12月21日 周三',
        list: [
          { id: 1, icon: 'icon-9.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 2, icon: 'icon-9.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 3, icon: 'icon-9.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 4, icon: 'icon-9.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 5, icon: 'icon-10.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.add = this.selectComponent("#add")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    this.add.updateData(app.globalData.theme)
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

  },


  // 单选变化
  selectType: function(e){
    let index = e.currentTarget.dataset.index
    let that = this
    let typeList = that.data.typeList
    typeList[index].checked = !typeList[index].checked
    that.setData({
      ['typeList[' + index + ']']: typeList[index]
    })
  },

  // 类型变化
  checkboxChange: function(e){
    console.log(e.detail.value)
    
  }


})