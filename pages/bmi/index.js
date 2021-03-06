const app = getApp()
import util from '../../utils/util.js'
import * as echarts from '../../ec-canvas/echarts';
var Chart = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        targetList: [],
        targetIndex: 0,
        targetDetail: {},
        ec: {
            lazyLoad: true
        },
        lineDataX: [],
        noneList: 0, //0加载中 1加载成功 -1没有数据
        groupType: 'list',
        raceList: util.raceList,
        raceIndex: 0,
        showDialog: false,
        showAvatar: false,
        avatarList: util.avatarList,
        avatarIndex: 0,
        target: {
            icon: 'user11.png',
            name: '',
            age: null,
            sex: 'female',
            race: '',
            height: null,
            weight: null,
        },
        list: {}
    },


    onLoad: function (options) {
        this.getTarget()
    },

    onShow: function () {
        app.setThemeColor()
        this.setData({ theme: app.globalData.theme })
        this.getTarget()
    },

    onPullDownRefresh: function () {
        this.getWeightList()
    },

    onShareAppMessage: function () { },


    // 打开弹窗
    openDialog: function () {
        if (this.data.groupType == 'list') {
            this.setData({
                istrue: true
            })
        } else {
            this.setData({
                groupType: 'list',
                istrue: true,
            })
        }
    },
    closeDialog: function () {
        this.setData({
            istrue: false
        })
    },

    // 切换头像
    switchAvatar: function (e) {
        this.setData({
            showAvatar: true,
        })
    },
    confirmAvatar: function (e) {
        console.log(e)
        let index = e.currentTarget.dataset.index
        this.setData({
            avatarIndex: index,
            showAvatar: false,
            ['target.icon']: this.data.avatarList[index].icon,
            ['target.sex']: this.data.avatarList[index].gander,
        })
    },
    // 切换性别
    switchGander: function (e) {
        console.log(e)
        let gander = e.currentTarget.dataset.gander
        this.setData({
            ['target.sex']: gander
        })
    },

    // 切换种族
    bindRaceChange: function (e) {
        console.log(e)
        let value = e.detail.value
        this.setData({
            raceIndex: value
        })
    },

    // 确定创建对象
    submitConfirm: function (e) {
        let target = e.detail.value
        console.log(target)
        target.race = this.data.raceList[this.data.raceIndex].value
        target.age = parseInt(target.age)
        target.sex = this.data.target.sex
        target.icon = this.data.target.icon
        if (!target.name) {
            util.showToast('请输入姓名')
            return
        }
        if (!target.height) {
            util.showToast('请输入身高')
            return
        }
        if (!target.weight) {
            util.showToast('请输入体重')
            return
        }
        if (!target.target_weight) {
            util.showToast('请输入目标体重')
            return
        }
        let that = this
        app.service.creatTarget(target, '创建成功')
            .then(res => {
                if (res.code == 0) {
                    that.closeDialog()
                    that.getTarget(true)
                    that.setData({
                        target: {
                            icon: 'user11.png',
                            name: '',
                            age: null,
                            sex: 'female',
                            race: '',
                            height: null,
                            weight: null,
                            target_weight: null
                        }
                    })
                }
            }).catch(() => {
                that.closeDialog()
            })
    },

    // 切换视图
    switchTab: function (e) {
        if (this.data.groupType == 'list') {
            this.setData({
                groupType: 'canvas',
            })
            this.init_line_echarts(); //初始化图表
        } else {
            this.setData({
                groupType: 'list',
            })
        }
    },


    // 获取成员列表
    getTarget: function (change) {
        let that = this
        app.service.getTarget()
            .then(res => {
                if (res.code == 0) {
                    if (res.data.length == 0) {
                        that.setData({ raceIndex: 0 })
                    } else {
                        res.data.push({ name: '新增成员' })
                        that.setData({
                            raceIndex: 1,
                            targetList: res.data
                        })
                    }
                    if (change) {
                        that.setData({ targetIndex: res.data.length - 2 })
                    }
                    that.getWeightList()
                }
            }).catch(() => {
                that.setData({
                    noneList: -1
                })
            })
    },

    // 切换成员
    bindTargetChange: function (e) {
        let value = e.detail.value
        console.log(value)
        if ((value * 1 + 1) == this.data.targetList.length) {
            this.openDialog()//新增对象
        } else {
            this.setData({
                targetIndex: value,
                groupType: 'list'
            })
            this.getWeightList()
        }
    },



    //编辑事件
    edit: function (e) {
        console.log(e.detail.id)
        util.showToast('暂不可编辑')
        // let weightId = e.detail.id
        // let targetId = this.data.targetList[this.data.targetIndex].uid
        // wx.navigateTo({
        //   url: '/pages/bmi/creat?targetId=' + targetId + '&weightId=' + weightId,
        // })
    },

    //删除事件
    del: function (e) {
        let that = this
        console.log(e)
        let targetId = this.data.targetList[this.data.targetIndex].uid
        let weightId = e.detail.id
        let index = e.detail.index
        let key = e.detail.key
        app.service.deleteWeight(targetId, weightId, '删除成功')
            .then(res => {
                this.data.list[key].records.splice(index, 1)
                if (this.data.list[key].records.length <= 0) {
                    delete this.data.list[key]
                }
                this.setData({
                    list: this.data.list
                })
            })
    },


    // 获取成员体重记录
    getWeightList: function () {
        let that = this
        that.setData({ noneList: 0 })
        let targetId = that.data.targetList[that.data.targetIndex].uid
        app.service.getWeightList(targetId)
            .then(res => {
                if (res.code == 0) {
                    let hash = {}
                    let weightList = []
                    let heightList = []
                    let bmiList = []
                    let lineDataX = []
                    if (res.data.length > 0) {
                        for (let i in res.data) {
                            let date = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].record_datetime)
                            if (!hash[date]) {
                                hash[date] = {
                                    records: [],
                                    date: date,
                                    weekDay: util.formatDate(new Date(date), 'week'),
                                }
                                hash[date].records.push(res.data[i])
                                res.data[i]
                            } else {
                                hash[date].records.push(res.data[i])
                            }
                            weightList.push(parseFloat(res.data[i].weight))
                            heightList.push(parseFloat(res.data[i].height))
                            bmiList.push(parseFloat(res.data[i].bmi))
                            lineDataX.push(util.formatDate(new Date(res.data[i].record_datetime), 'day'))
                        }
                        that.setData({
                            list: hash,
                            noneList: 1,
                            lineDataX: lineDataX.reverse(),
                            weightList: weightList.reverse(),
                            heightList: heightList.reverse(),
                            bmiList: bmiList.reverse()
                        })
                    } else {
                        that.setData({
                            noneList: -1,
                            list: hash
                        })
                    }
                    if (this.groupType == 'canvas'){
                        that.init_line_echarts(); //初始化图表
                    }
                } else {
                    that.setData({ noneList: -1 })
                }
            }).catch((res) => {
                console.log(res)
                // that.setData({ noneList: -1 })
            })
    },





    //初始化图表
    init_line_echarts: function () {
        this.echartsComponnetLineWeight = this.selectComponent('#mychart-weight-line');
        this.echartsComponnetLineHeight = this.selectComponent('#mychart-height-line');
        this.echartsComponnetLineBmi = this.selectComponent('#mychart-bmi-line');
        let weightList = this.data.weightList
        let heightList = this.data.heightList
        let bmiList = this.data.bmiList
        this.echartsComponnetLineWeight.init((canvas, width, height) => {
            Chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setLineOption(Chart, '体重', weightList, ['#FF6A6A']);
            return Chart;
        })
        this.echartsComponnetLineHeight.init((canvas, width, height) => {
            Chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setLineOption(Chart, '身高', heightList, ['#32CD32']);
            return Chart;
        })
        this.echartsComponnetLineBmi.init((canvas, width, height) => {
            Chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setLineOption(Chart, 'BMI', bmiList, ['#FFC125']);
            return Chart;
        })
    },

    setLineOption: function (Chart, name, list, colors) {
        Chart.clear();  // 清除
        Chart.setOption(this.getLineOption(name, list, colors));
    },



    // 线型图配置
    getLineOption: function (name, dataX, colors) {
        let lineDataX = this.data.lineDataX
        let markLine = {}
        let targetWeight = this.data.targetList[this.data.targetIndex].target_weight
        let targetBmi = this.data.targetList[this.data.targetIndex].target_bmi
        if (name == '体重' && targetWeight) {
            markLine = {
                data: [{
                    name: '目标体重',
                    yAxis: targetWeight
                }]
            }
        }
        if (name == 'BMI' && targetBmi) {
            markLine = {
                data: [{
                    name: '目标BMI',
                    yAxis: targetBmi
                }]
            }
        }

        var option = {
            color: colors,
            title: {
                text: name + '变化情况',
                left: '3%',
                textStyle: {
                    fontSize: 14,
                    color: '#666',
                    fontWeight: 'bold'
                }
            },
            legend: {
                data: [name],
                right: '5%'
            },
            tooltip: {
                show: true,
                trigger: 'axis',
            },
            grid: {
                left: '5%',
                right: '8%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: {
                data: lineDataX,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        var date = new Date(value);
                        var texts = [(date.getMonth() + 1), date.getDate()];
                        return texts.join('月');
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                    }
                },
            },
            yAxis: {
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999",
                    }
                },
                splitLine: {
                    lineStyle: {
                        width: 0.5,
                        type: 'dashed',
                        color: '#eee'
                    }
                }
            },
            series: [{
                name: name,
                type: 'line',
                smooth: true,
                symbol: 'none',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                markLine: markLine,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colors[0]
                    }, {
                        offset: 1,
                        color: '#ffe'
                    }])
                },
                data: dataX
            }]
        }
        return option;
    },



})