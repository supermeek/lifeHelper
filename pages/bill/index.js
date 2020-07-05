const app = getApp()
import util from '../../utils/util.js'
Page({

    data: {
        isLogin: false,
        month: util.formatDate(new Date(), 'month'),
        maxData: util.formatDate(new Date(), 'month'),
        list: {},
        typeList: util.typeList,
        noneList: 0, //0加载中 1加载成功 -1没有数据
        outcomeTotal: 0,
        incomeTotal: 0,
        outcomeTime: 0,
        incomeTime: 0,
    },


    onLoad: function (options) {

    },


    onShow: function () {
        app.setThemeColor()
        this.setData({
            theme: app.globalData.theme
        })
        this.getBill()
    },

    // 下拉刷新
    onPullDownRefresh: function () {
        this.getBill()
    },

    onShareAppMessage: function () {

    },

    // 日期下拉
    getDateTime: function (e) {
        console.log(e.detail.value)
        this.setData({
            month: e.detail.value
        })
        this.getBill()
    },

    // 上个月
    getPreMonth: function () {
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
    getNextMonth: function () {
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
        let that = this
        let start = this.data.month + '-' + '01'
        let arr = start.split('-');
        let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')
        let typeList = this.data.typeList
        let types = []
        that.setData({ noneList: 0 })
        typeList.forEach(item => {
            if (item.checked) {
                types.push(item.name)
            }
        })

        // 调取接口
        this.searchBill(start, end, types, res => {
            let hash = {}
            let outcomeTotal = 0
            let incomeTotal = 0
            let outcomeTime = 0
            let incomeTime = 0
            for (let i in res.data) {
                if (res.data[i].outcome) {
                    outcomeTotal = util.add(outcomeTotal, res.data[i].money)
                    outcomeTime = outcomeTime + 1
                } else {
                    incomeTotal = util.add(incomeTotal, res.data[i].money)
                    incomeTime = incomeTime + 1
                }
                let date = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].pay_datetime)

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
            }

            if (res.data.length > 0) {
                that.setData({ noneList: 1 })
            } else {
                that.setData({ noneList: -1 })
            }
            this.setData({
                list: hash,
                outcomeTotal: outcomeTotal,
                incomeTotal: incomeTotal,
                outcomeTime: outcomeTime,
                incomeTime: incomeTime,
            })
            console.log(this.data.list)
        })
    },


    //编辑事件
    edit: function (e) {
        console.log(e.detail.id)
        let id = e.detail.id
        wx.navigateTo({
            url: '/pages/bill/creat?id=' + id,
        })
    },

    //删除事件
    del: function (e) {
        let that = this
        console.log(e)
        let id = e.detail.id
        let index = e.detail.index
        let key = e.detail.key
        let list = this.data.list
        that.deleteBill(id, '删除成功', res => {
            list[key].records.splice(index, 1)
            if (list[key].records.length <= 0) {
                delete list[key]
            }
            this.setData({
                list: list
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
                } else {
                    that.setData({ noneList: -1 })
                }
            }).catch((res) => {
                that.setData({ noneList: -1 })
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
    }


})