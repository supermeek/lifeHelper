/**
 * 组件：搜索框
 * 带入数据 placeholder 输入提示文字
 * 返回数据 无 （点击跳转至搜索页面）
 */

Component({
  properties: {
    placeholder: {
      type: String,
      value: '请输入'
    }
  },

  data: {
    inputShowed: false,
    inputVal: ""
  },

  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    search: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
      this.triggerEvent('searchEnter', { value: e.detail.value })
    }
  }
})
