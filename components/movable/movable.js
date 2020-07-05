const app = getApp()
import util from '../../utils/util.js'
Component({
  properties: {
    dateObject: {
      type: Object,
      observer: function (newval, oldval) {
        this.setData({
          list: newval
        })
      }
    },
    key: String,
    type: String //bill 使用药品item组件  bmi使用体重item组件
  },

  /*** 启用插槽 */
  options: {
    multipleSlots: true,
    styleIsolation: 'apply-shared'
  },

  data: {
    startX: 0, //开始坐标
    startY: 0,
    list: []
  },

  methods: {

    //编辑事件
    edit: function (e) {
      let id = e.currentTarget.id
      this.triggerEvent('edit', { id: id })
    },

    //删除事件
    del: function (e) {
      let that = this
      let key = e.currentTarget.dataset.key
      let index = e.currentTarget.dataset.index
      let id = e.currentTarget.id
      util.showModal('确定删除该选项吗？', '', () => {
        that.triggerEvent('del', { id: id, index: index, key: key })
      })
    },


    /** ******** 左滑删除 ********** */

    //手指触摸动作开始 记录起点X坐标

    touchstart: function (e) {
      //开始触摸时 重置所有删除
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
      })
    },

    //滑动事件处理
    touchmove: function (e) {
      var that = this,
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

      that.data.list.records.forEach(function (v, i) {
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
  }
})
