const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * delBtnWidth: 删除按钮的宽度单位
   * list: 循环的mock数据
   * startX: 收支触摸开始滑动的位置
   */
  data: {
    month: util.formatDate(new Date(), 'month'),
    maxData: util.formatDate(new Date(), 'month'),
    typeList: util.typeList,
    items: [],
    startX: 0, //开始坐标
    startY: 0
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
    // 页面渲染完成
    var oDelList = app.globalData.delList;
    this.setData({
      list: oDelList
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setThemeColor()
    this.setData({
      theme: app.globalData.theme
    })
    this.add.updateData(app.globalData.theme)
    // 加载默认
    this.getBill()
  },

  onPullDownRefresh: function () {
    this.getBill()
  },

  onShareAppMessage: function () {

  },

  // 日起下拉
  getDateTime: function (e) {
    console.log(e.detail.value)
    this.setData({
      month: e.detail.value
    })
    this.getBill()
  },

  // 上个月
  getPreMonth: function() {
    var arr = this.data.month.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
      year = parseInt(year) - 1;
      month2 = 12;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    var lastMonth = year + '-' + month2
    this.setData({ month: lastMonth })
    this.getBill()
  },
  

  // 下个月
  getNextMonth: function() {
    var arr = this.data.month.split('-');
    var year = arr[0];
    var month = arr[1];
    var days = new Date(year, month, 0);
    days = days.getDate();
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    var nextMonth = year2 + '-' + month2
    this.setData({ month: nextMonth })
    this.getBill()
  },



  // 单选变化
  selectType: function (e) {
    let index = e.currentTarget.dataset.index
    let that = this
    let typeList = that.data.typeList
    typeList[index].checked = !typeList[index].checked
    that.setData({
      ['typeList[' + index + ']']: typeList[index]
    })
    this.getBill()
  },


  // 类型变化

  checkboxChange: function (e) {
    console.log(e.detail.value)
  },



  // 获取查询账单参数
  getBill: function () {
    let start = this.data.month + '-' + '01'
    let arr = start.split('-');
    let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')
    let typeList = this.data.typeList
    let types = []
    typeList.forEach(item => {
      if (item.checked) {
        types.push(item.name)
      }
    })

    // 调取接口
    this.searchBill(start, end, types, res => {
      let hash = {}
      var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      for (let i in res.data) {
        let date = util.formatDate(new Date(res.data[i].pay_datetime))
        let newDate = new Date(date)
        if (!hash[date]) {
          hash[date] = {
            records: [],
            newDate: weekDay[newDate.getDay()]
          }
          hash[date].records.push(res.data[i])
          res.data[i]
        } else {
          hash[date].records.push(res.data[i])
        }
      }
      this.setData({ list: hash })
      console.log(hash)
    })
  },


  //编辑事件
  edit: function (e) {

  },

  //删除事件
  del: function (e) {
    let that = this
    let key = e.currentTarget.dataset.key
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.id
    console.log(e)
    util.showModal('确定删除该选项吗？', '', () => {
      // 调取接口
      that.deleteBill(id, '删除成功', res => {
        this.data.list[key].records.splice(index, 1)
        if (this.data.list[key].records.length <= 0) {
          delete this.data.list[key]
        }
        this.setData({
          list: this.data.list
        })
      })
    })
  },



  // 查询列表
  searchBill: function (start, end, types, callback) {
    let that = this
    app.service.getBill(start, end, types)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          if (typeof (callback == 'function')) {
            callback(res)
          }
        }
      })
  },

  // 删除账单
  deleteBill: function (id, info, callback) {
    let that = this
    app.service.deleteBill(id, info)
      .then(res => {
        console.log(res)
        if (typeof (callback == 'function')) {
          callback(res)
        }
      })
  },


  /** ******** 左滑删除 ********** */

  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      key = e.currentTarget.dataset.key, //当前日期索引
      index = e.currentTarget.dataset.index, //当前列表索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });

    that.data.list[key].records.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },



})