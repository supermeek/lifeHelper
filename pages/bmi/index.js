const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetList: [],
    targetIndex: 0,
    groupType: 'list',
    raceList: [
      {id:1, name:'本人', value:'me'},
      {id:2, name:'他人', value:'other'},
      {id:3, name:'宠物', value:'pet'},
    ],
    raceIndex: 0,
    showDialog: false,
    showAvatar: false,
    avatarList: util.avatarList,
    avatarIndex: 0,
    target:{
      icon: 'user11.png',
      name: '',
      age: null,
      sex: 'female',
      race: '',
      height: null,
      weight: null,
    },
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

  // 切换头像
  switchAvatar:function(e){
    this.setData({
      showAvatar: true,
    })
  },
  confirmAvatar:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.setData({
      avatarIndex: index,
      showAvatar: false,
      ['target.icon']: this.data.avatarList[index].icon,
      ['target.sex']: this.data.avatarList[index].gander,
    })
  },

  bindRaceChange: function(e){
    console.log(e)
    let value = e.detail.value
    this.setData({
      raceIndex: value
    })
  },

  // 确定创建对象
  submitConfirm: function(e){
    let target = e.detail.value
    console.log(target)
    target.race = this.data.raceList[this.data.raceIndex].value
    target.age = parseInt(target.age)
    target.height = parseFloat(target.height)
    target.weight = parseFloat(target.weight)
    target.target_weight = parseFloat(target.target_weight)
    target.sex = this.data.target.sex
    target.icon = this.data.target.icon
    if(!target.name){
      util.showToast('请输入姓名')
      return
    }
    if(!target.height){
      util.showToast('请输入身高')
      return
    }
    if(!target.weight){
      util.showToast('请输入体重')
      return
    }
    let that = this
    app.service.creatTarget(target,'创建成功')
      .then(res => {
        console.log(res)
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


  // 获取成员列表
  getTarget: function(){
    let that = this
    app.service.getTarget()
      .then(res => {
        console.log(res)
        if(res.code == 0){
          if(res.data.length == 0){
            that.setData({
              raceIndex: 0
            })
          }else{
            res.data.push({name:'新增成员'})
            that.setData({
              raceIndex: 1,
              targetList: res.data
            })
          }
        }
      })
  },
  // 切换成员
  bindTargetChange: function(e){
    let value = e.detail.value
    console.log(value)
    if((value*1+1) == this.data.targetList.length){
      this.openDialog()//新增对象
    }else{
      this.setData({
        targetIndex: value
      })
      // 切换对象
    }
  }

  

})