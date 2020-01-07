const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[
      { id: 2, icon: 'icon-1.png', name: '餐饮', checked: true },
      { id: 3, icon: 'icon-2.png', name: '萌宠', checked: false },
      { id: 10, icon: 'icon-3.png', name: '宝贝', checked: false },
      { id: 4, icon: 'icon-4.png', name: '交通', checked: true },
      { id: 5, icon: 'icon-5.png', name: '居家', checked: false },
      { id: 6, icon: 'icon-6.png', name: '娱乐', checked: true },
      { id: 7, icon: 'icon-7.png', name: '衣装', checked: false },
      { id: 1, icon: 'icon-8.png', name: '社交', checked:true },
      { id: 9, icon: 'icon-9.png', name: '还款', checked: false },
      { id: 8, icon: 'icon-10.png', name: '其他', checked: true },
    ],
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