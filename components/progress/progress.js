Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      observer: function (newval, oldval) {
        this.setData({
          list: newval
        })
      }
    },
    showType:{
      type: String,
      value: 'number'  // number | percent
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
