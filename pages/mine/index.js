const app = getApp()
import util from '../../utils/util.js'
import * as echarts from '../../ec-canvas/echarts';
var Chart = null

Page({
  data: {
    theme: app.globalData.theme,
    lineColor: ["#04B404", "#ff0000"],
    ec: {
      lazyLoad: true
    },
    date: util.formatDate(new Date(), 'month'),
    maxData: util.formatDate(new Date(), 'month'),
    typeList: util.typeList,
    outcomeTotal: 0,
    incomeTotal: 0,
    dataX: [],
    seriesData: [],
    groupType: 'date'
  },


  onLoad: function (options) {

  },

  onShow: function () {
    app.setThemeColor()
    this.setData({ theme: app.globalData.theme })
    this.getLine()
  },

  // 切换年月
  switchTab: function (e) {
    if (this.data.groupType == 'date') {
      this.setData({
        groupType: 'month',
        date: util.formatDate(new Date(), 'year'),
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
  },

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
        dataX: res.data.dates
      })
      // **** 初始化图表 ****
      that.echartsComponnet = that.selectComponent('#mychart-dom-line');
      if (!Chart) {
        that.init_echarts(); //初始化图表
      } else {
        that.setOption(Chart); //更新数据
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
    var type = this.data.groupType
    if (type == 'date'){
      var arr = this.data.date.split('-')
      var date = arr[0] + '年' + arr[1] + '月'
    }else{
      var date = this.data.date + '年'
    }
    var dataX = this.data.dataX
    var seriesList = this.data.seriesData
    var colors = this.data.lineColor

    var option = {
      color: colors,
      title: {
        text: date + '收支情况',
        left: '3%',
        textStyle:{
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
        // axisPointer: {
        //   type: 'cross',
        //   label: {
        //     backgroundColor: '#6a7985'
        //   }
        // }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '12%',
        containLabel: true
      },
      xAxis: {
        data: dataX,
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: function (value, index) {
            var date = new Date(value);
            if (type == 'date') {
              var texts = [(date.getMonth() + 1), date.getDate()];
              return texts.join('月');
            }else{
              return value+'月'
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
      // dataZoom: [{  //缩放功能
      //   type: 'inside',
      //   startValue: 0,
      //   endValue: 31,
      // }, {
      //   bottom: 0,
      //   fillerColor: 'rgba(4, 180, 4, 0.2)',
      //   borderColor: '#eee',
      //   handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      //   handleSize: '80%',
      //   handleStyle: {
      //     color: '#fff',
      //     borderWidth: 0.5,
      //     borderType: 'solid',
      //     borderColor: 'rgba(0, 0, 0, 0.1)',
      //   }
      // }],
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