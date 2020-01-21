const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['创建对象'],
    radioItems: [
      { name: '男', value: '0' },
      { name: '女', value: '1', checked: true }
    ],
    showDialog: false,
    index: 0,
    groupType: 'list',
    list: {
      '2020-01-04': {
        date: ["2020-01-04"],
        records: [
          {
            "id": 4,
            "record_datetime": "2020-01-20 17:57:17",
            "height": "172.0",
            "weight": "66.00",
            'bmi': '25',
            'level': 2,
            "create_datetime":"2020-01-20 17:57:17",
            "target": "d7fc32d5-1346-48f7-8c96-99cff3ef8f09"
          },
          {
            "id": 4,
            "record_datetime": "2020-01-20 17:57:17",
            "height": "172.0",
            "weight": "66.00",
            'bmi':'25',
            'level': 1,
            "create_datetime":"2020-01-20 17:57:17",
            "target": "d7fc32d5-1346-48f7-8c96-99cff3ef8f09"
          }
        ],
        weekDay: "星期六"
      },
      '2020-01-05': {
        date: ["2020-01-04"],
        records: [
          {
            "id": 4,
            "record_datetime": "2020-01-20 17:57:17",
            "height": "172.0",
            "weight": "66.00",
            "create_datetime":
              "2020-01-20 17:57:17",
            "target": "d7fc32d5-1346-48f7-8c96-99cff3ef8f09"
          },
          {
            "id": 4,
            "record_datetime": "2020-01-20 17:57:17",
            "height": "172.0",
            "weight": "66.00",
            "create_datetime":
              "2020-01-20 17:57:17",
            "target": "d7fc32d5-1346-48f7-8c96-99cff3ef8f09"
          }
        ],
        weekDay: "星期六"
      }


    }

  },


  onLoad: function (options) {
    this.add = this.selectComponent("#add")
    this.getTarget()
  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    this.add.updateData(app.globalData.theme)
  },

  onPullDownRefresh: function () {},

  onShareAppMessage: function () {},

  // 打开弹窗
  // openDialog: function () {
  //   this.selectComponent('#dialog').openDialog()
  // },

  openDialog: function () {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },


  // 切换视图
  switchTab: function (e) {
    if (this.data.groupType == 'list') {
      this.setData({
        groupType: 'canvas',
      })
    } else {
      this.setData({
        groupType: 'list',
      })
    }
    // this.getLine()
    // this.getPie()
  },


  getTarget: function(){
    let that = this
    app.service.getTarget()
      .then(res => {
        console.log(res)
      })
  }

  

})