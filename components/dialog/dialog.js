/**
 * 组件：dialog
 * 带入数据 <slot name='content'></slot>启用插槽  height:内容高度
 * 返回数据 无 调用父组件函数
 */
Component({
  properties: {
    height: Number
  },

  /**
  * 启用插槽
  */
  options: {
    multipleSlots: true
  },

  data: {
    showDialog: false
  },

  methods: {
    openDialog: function () {
      this.setData({
        showDialog: true
      })
    },
    closeDialog: function () {
      this.setData({
        showDialog: false
      })
    },
    confirmDialog: function () {
      this.triggerEvent('confirmBtn',{})
    },
  }
})
