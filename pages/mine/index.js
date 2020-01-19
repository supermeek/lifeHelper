const app = getApp()
import util from '../../utils/util.js'
import * as echarts from '../../ec-canvas/echarts';
var lineChart = null
var pieChart = null

Page({
  data: {
    theme: app.globalData.theme,
    lineColor: ["#04B404", "#ff0000"],
    pieColor: [],
    ec: {
      lazyLoad: true
    },
    date: util.formatDate(new Date(), 'month'),
    maxData: util.formatDate(new Date(), 'month'),
    typeList: util.typeList,
    outcomeTotal: 0,
    incomeTotal: 0,
    lineDataX: [],
    pieDataX: [],
    seriesData: [],
    groupType: 'date'
  },


  onLoad: function (options) {

  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    this.getLine()
    this.getPie()
  },

  // 切换年月
  switchTab: function (e) {
    if (this.data.groupType == 'date') {
      this.setData({
        groupType: 'month',
        date: JSON.stringify(util.formatDate(new Date(), 'year')),
        maxData: util.formatDate(new Date(), 'year'),
      })
      console.log(util.formatDate(new Date(), 'year'))
    } else {
      this.setData({
        groupType: 'date',
        date: util.formatDate(new Date(), 'month'),
        maxData: util.formatDate(new Date(), 'month'),
      })
    }
    this.getLine()
    this.getPie()
  },

  // 获取线型图数据
  getLine: function () {
    let that = this
    let start = this.data.date + '-' + '01'
    let arr = start.split('-');
    let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')
    let type = this.data.groupType
    let year = this.data.date
    let colors = this.data.lineColor
    this.getBillLine(start, end, type, year, res => {
      console.log(res)
      let incomeTotal = 0
      let outcomeTotal = 0
      let seriesData = []
      for (let i in res.data.series) {
        let item = res.data.series[i]
        if (item.name == "收入") { //收入
          for (let key in item.series) {
            if (item.series[key]) {
              incomeTotal = util.add(incomeTotal, item.series[key])
            }
          }
        } else { //支出
          item.series.forEach((outItem, key) => {
            if (outItem) {
              outcomeTotal = util.add(outcomeTotal, outItem)
            }
          })
        }
        seriesData.push({
          name: item.name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: colors[i]
            }, {
              offset: 1,
              color: '#ffe'
            }])
          },
          data: item.series
        })
      }
      that.setData({
        incomeTotal: incomeTotal,
        outcomeTotal: outcomeTotal,
        seriesData: seriesData,
        lineDataX: res.data.dates
      })
      // **** 初始化图表 ****
      that.echartsComponnetLine = that.selectComponent('#mychart-dom-line');
      if (!lineChart) {
        that.init_line_echarts(); //初始化图表
      } else {
        that.setLineOption(lineChart); //更新数据
      }
    })
  },

  // 获取饼形图数据
  getPie: function () {
    let that = this
    if (this.data.groupType == 'date') {
      var start = this.data.date + '-' + '01'
    } else {
      var start = this.data.date + '-' + '01' + '-' + '01'
    }
    let arr = start.split('-');
    let end = util.formatDate(new Date(arr[0], arr[1], '0'), 'day')
    this.getBillPie(start, end, (res) => {
      console.log(res)
      let outcomeTotal = 0
      let colors = []
      let datax = []
      for (let i in res.data.outcome) {
        outcomeTotal = util.add(outcomeTotal, res.data.outcome[i].value)
        let typeIndex = util.typeIndex(res.data.outcome[i].name)
        colors.push(util.typeList[typeIndex].color)
        datax.push(util.typeList[typeIndex].name)
      }
      for (let i in res.data.outcome) {
        res.data.outcome[i].percent = util.div(res.data.outcome[i].value, outcomeTotal).toFixed(2)
      }
      that.setData({
        typeList: res.data.outcome,
        pieColor: colors,
        pieDataX: datax
      })
      that.echartsComponnetPie = that.selectComponent('#mychart-dom-pie');
      if (!pieChart) {
        that.init_pie_echarts(); //初始化图表
      } else {
        that.setPieOption(pieChart); //更新数据
      }
    })
  },


  // 日期下拉
  getDateTime: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.getLine()
    this.getPie()
  },


  // 获取线型图数据
  getBillLine: function (start, end, type, year, callback) {
    app.service.getBillLine(start, end, type, year)
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
  init_line_echarts: function () {
    this.echartsComponnetLine.init((canvas, width, height) => {
      lineChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setLineOption(lineChart);
      return lineChart;
    })
  },
  init_pie_echarts: function () {
    this.echartsComponnetPie.init((canvas, width, height) => {
      pieChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setPieOption(pieChart);
      return pieChart;
    })
  },

  setLineOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getLineOption());  //获取新数据
  },

  setPieOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getPieOption());  //获取新数据
  },

  // 线型图配置
  getLineOption: function () {
    var type = this.data.groupType
    if (type == 'date') {
      var arr = this.data.date.split('-')
      var date = arr[0] + '年' + arr[1] + '月'
    } else {
      var date = this.data.date + '年'
    }
    var lineDataX = this.data.lineDataX
    var seriesList = this.data.seriesData
    var colors = this.data.lineColor

    var option = {
      color: colors,
      title: {
        text: date + '收支情况',
        left: '3%',
        textStyle: {
          fontSize: 14,
          color: '#666',
          fontWeight: 'bold'
        }
      },
      legend: {
        data: ['收入', '支出'],
        // backgroundColor: '#eee',
        right: '5%'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '5%',
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
            if (type == 'date') {
              var texts = [(date.getMonth() + 1), date.getDate()];
              return texts.join('月');
            } else {
              return value + '月'
            }
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
      series: seriesList
    }
    return option;
  },

  // 饼形图配置
  getPieOption: function () {
    var type = this.data.groupType
    if (type == 'date') {
      var arr = this.data.date.split('-')
      var date = arr[0] + '年' + arr[1] + '月'
    } else {
      var date = this.data.date + '年'
    }
    var pieDataX = this.data.pieDataX
    var dataList = this.data.typeList
    var colors = this.data.pieColor

    var option = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: date + '消费占比',
        left: '3%',
        textStyle: {
          fontSize: 14,
          color: '#666',
          fontWeight: 'bold'
        }
      },
      legend: {
        right: '5%',
        top: 'center',
        orient: 'vertical',
        data: pieDataX
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [{
        type: 'pie',
        radius: [0, 80],
        center: ['40%', '50%'],
        data: dataList
      }]
    };

    return option;
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    this.getLine()
    this.getPie()
  },

  onShareAppMessage: function () {

  }
})