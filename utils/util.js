const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 深色系
// const colors = [
//   { color: '#8DC53E', mainColor: 'green', subColor: 'yellow', name: '绿色' },
//   { color: '#FFB6C9', mainColor: 'pink', subColor: 'blue', name: '粉色' },
//   { color: '#FF6A6A', mainColor: 'red', subColor: 'blue', name: '红色' },
//   { color: '#FFD700', mainColor: 'yellow', subColor: 'blue', name: '黄色' },
//   { color: '#65D8FF', mainColor: 'blue', subColor: 'pink', name: '蓝色' },
//   { color: '#A020F0', mainColor: 'purple', subColor: 'yellow', name: '紫色' }
// ]

// 浅色系
const colors = [
  { color: '#A4D165', mainColor: 'green', subColor: 'yellow', name: '绿色' },
  { color: '#FFB6C9', mainColor: 'pink', subColor: 'blue', name: '粉色' },
  { color: '#FF7979', mainColor: 'red', subColor: 'blue', name: '红色' },
  { color: '#FFE133', mainColor: 'yellow', subColor: 'blue', name: '黄色' },
  { color: '#74DCFF', mainColor: 'blue', subColor: 'pink', name: '蓝色' },
  { color: '#C679F6', mainColor: 'purple', subColor: 'yellow', name: '紫色' }
]

/**
 * toast提示
 */

const showToast = (msg, icon, callback, scd) => {
  wx.showToast({
      title: msg,
      icon: icon || 'none',
      duration: scd || 2000,
      complete: function(res) {
          if (typeof(callback) == "function") {
              callback()
          }
      }
  })
}

/**
 * Modal 弹窗
 */
const showModal = (title, msg, callback, cancel = true) => {
  wx.showModal({
      title: title,
      content: msg,
      showCancel: cancel,
      confirmText: "确定",
      cancelText: "取消",
      confirmColor: '#00C3C0',
      // cancelColor: '#808080',
      success: function(res) {
          if (res.confirm) {
              if (typeof(callback) == 'function') {
                  callback()
              }
          }
      }
  });
}

/**
 * 正则表达式方法集合
 */
const regExp = {
  /* 手机号码 */
  validatePhoneNumber: (str) => {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      return reg.test(str)
  },
  /* 手机号码和固定电话 */
  validatePhTelNumber: (str) => {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      return reg.test(str)
  },
  /* 固定电话 */
  validateTelephone: (str) => {
      const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
      return reg.test(str)
  },
  /* 电子邮箱 */
  validateEmail: (str) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return reg.test(str)
  },
  /* 身份证 */
  validateIDCard: (str) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return reg.test(str)
  },
  /* 银行卡号 15位或者16位或者19位 */
  validateBank: (str) => {
      const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
      return reg.test(str)
  }
}

module.exports = {
  formatTime: formatTime,
  colors: colors
}
