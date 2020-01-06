const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[
      { id: 1, icon: 'icon_shop.png', name: '购物', checked:true },
      { id: 2, icon: 'icon_cai.png', name: '餐饮', checked: true },
      { id: 3, icon: 'icon_pika.png', name: '宠物', checked: false },
      { id: 4, icon: 'icon_car.png', name: '交通', checked: true },
      { id: 5, icon: 'icon_home.png', name: '家居', checked: false },
      { id: 6, icon: 'icon_snow.png', name: '娱乐', checked: true },
      { id: 7, icon: 'icon_huazhuang.png', name: '化妆', checked: false },
      { id: 8, icon: 'icon_health.png', name: '健身', checked: true },
      { id: 9, icon: 'icon_card.png', name: '还款', checked: false },
      { id: 10, icon: 'icon_other.png', name: '其他', checked: false }
    ],
    list:[
      {
        time: '2020年12月21日 周三',
        list:[
          { id: 1, icon: 'icon_shop.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 2, icon: 'icon_cai.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 3, icon: 'icon_pika.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 4, icon: 'icon_home.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 5, icon: 'icon_health.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true }
        ]
      },
      {
        time: '2020年12月21日 周三',
        list: [
          { id: 1, icon: 'icon_shop.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 2, icon: 'icon_cai.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 3, icon: 'icon_pika.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: false },
          { id: 4, icon: 'icon_home.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true },
          { id: 5, icon: 'icon_health.png', type: '购物', name: '买衣服', desc: '过年了给全家都卖了新衣服', income: true }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    app.setThemeColor(wx.getStorageSync('themeColor') || '#8DC53E')
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