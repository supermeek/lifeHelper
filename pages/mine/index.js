const app = getApp()
import util from '../../utils/util.js'
import * as echarts from '../../ec-canvas/echarts';
var Chart = null



Page({

  data: {
    theme: app.globalData.theme,
    ec: {
      lazyLoad: true
    },
    month: util.formatDate(new Date(), 'month'),
    maxData: util.formatDate(new Date(), 'month'),
    typeList: util.typeList,
    outcomeTotal: 0,
    incomeTotal: 0,
    dataX: [],
    seriesData: []
  },


  onLoad: function (options) {
    
  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    this.getLine()
  },


  getLine: function(){
    let that = this
    let start = this.data.month + '-' + '01'
    let arr = start.split('-');
    let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')

    this.getBillLine(start, end, res => {
      console.log(res)
      let incomeTotal = 0
      let outcomeTotal = 0
      let seriesData = []
      for (let i in res.data.series) {
        let item = res.data.series[i]
        seriesData.push({
          name: item.name,
          type: 'line',
          smooth: true,
          data: item.series
        })
        if (item.name == "收入") {
          for (let key in item.series) {
            incomeTotal = util.add(incomeTotal, item.series[key])
          }
        } else {
          for (let key in item.series) {
            outcomeTotal = util.add(outcomeTotal, item.series[key])
          }
        }
      }
      that.setData({
        incomeTotal: incomeTotal,
        outcomeTotal: outcomeTotal,
        seriesData: seriesData,
        dataX: res.data.dates
      })

      // **** 初始化图表 ****
      that.echartsComponnet = that.selectComponent('#mychart-dom-line');
      if (!Chart) {
        console.log("第一次")
        that.init_echarts(); //初始化图表
      } else {
        console.log("第多次")

        that.setOption(Chart); //更新数据
      }
    })
  },

  
  // 日期下拉
  getDateTime: function (e) {
    console.log(e.detail.value)
    this.setData({
      month: e.detail.value
    })
    this.getLine()
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
    this.getLine()
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
    this.getLine()
  },

  // 获取线型图数据
  getBillLine: function (start, end, callback){
    app.service.getBillLine(start, end)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          if (typeof (callback == 'function')) {
            callback(res)
          }
        }
      })
  },

  // 类型消费统计数据
  getBillPie: function (start, end, callback) {
    let that = this
    app.service.getBillPie(start, end)
      .then(res => {
        console.log(res)
        if (res.code == 0) {
          if (typeof (callback == 'function')) {
            callback(res)
          }
        }
      })
  },


  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      return Chart;
    })
  },

  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },


  getOption: function () {
    let dataX = this.data.dataX
    let seriesList = this.data.seriesData
    var option = {
      color: ["#04B404", "#ff0000"],
      legend: {
        data: ['收入', '支出'],
        top: 10,
        left: 'center',
        backgroundColor: '#eee',
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: dataX
      },
      yAxis: {
        splitLine: {
          show: false
        }
      },
      dataZoom: [{  //缩放功能
        type: 'inside',
        startValue: 0,
        endValue: 30,
      }, {
        bottom: 0,
        handleSize: '80%'
      }],
      series: seriesList
    }
    return option;
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    this.getLine()
  },

  onShareAppMessage: function () {

  }
})