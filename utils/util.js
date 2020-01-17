// 2020-8-8 12:00:00
const formatDate = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  switch (type) {
    case 'year': return year; break;
    case 'month': return [year, month].map(formatNumber).join('-'); break;
    case 'day': return [year, month, day].map(formatNumber).join('-'); break;
    case 'houer': return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'); break;
    case 'time': return [hour, minute, second].map(formatNumber).join(':'); break;
    default: return [year, month, day].map(formatNumber).join('-'); break;
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 浅色系
const colors = [
  { color: '#A4D165', mainColor: 'green', subColor: 'yellow', name: '绿色' },
  { color: '#FFB6C9', mainColor: 'pink', subColor: 'blue', name: '粉色' },
  { color: '#FF7979', mainColor: 'red', subColor: 'blue', name: '红色' },
  { color: '#FFE133', mainColor: 'yellow', subColor: 'blue', name: '黄色' },
  { color: '#74DCFF', mainColor: 'blue', subColor: 'pink', name: '蓝色' },
  { color: '#C679F6', mainColor: 'purple', subColor: 'yellow', name: '紫色' }
]


const typeList = [
  { id: 1, icon: 'icon-1.png', name: '餐饮', checked: false, percent: 32, color: '#FFAFA9' },
  { id: 2, icon: 'icon-2.png', name: '萌宠', checked: false, percent: 15, color: '#CACACA' },
  { id: 3, icon: 'icon-3.png', name: '宝贝', checked: false, percent: 5, color: '#937773' },
  { id: 4, icon: 'icon-4.png', name: '出行', checked: false, percent: 8, color: '#FA746A' },
  { id: 5, icon: 'icon-5.png', name: '居家', checked: false, percent: 10, color: '#87C05A' },
  { id: 6, icon: 'icon-6.png', name: '娱乐', checked: false, percent: 3, color: '#49B7EA' },
  { id: 7, icon: 'icon-7.png', name: '衣装', checked: false, percent: 21, color: '#A3D9BD' },
  { id: 8, icon: 'icon-8.png', name: '社交', checked: false, percent: 42, color: '#FF5252' },
  { id: 9, icon: 'icon-9.png', name: '转账', checked: false, percent: 21, color: '#A3D4FF' },
  { id: 10, icon: 'icon-10.png', name: '其他', checked: false, percent: 5, color: '#FEF001' },
]

// 返回类型的index
const typeIndex = (name) => {
  console.log("***************")
  // console.log(this.typeList)
  console.log(typeList)
  let index = null
  typeList.forEach((item,i) => {
    if(item.name == name){
      index = i
    }
  })
  return index
}

/**
 * toast提示
 */

const showToast = (msg, icon, callback, scd) => {
  wx.showToast({
    title: msg,
    icon: icon || 'none',
    duration: scd || 2000,
    complete: function (res) {
      if (typeof (callback) == "function") {
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
    success: function (res) {
      if (res.confirm) {
        if (typeof (callback) == 'function') {
          callback()
        }
      }
    }
  });
}

// 解决运算丢失精度问题

// 除法
const div = (num1, num2) => {
  var t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1)*100;
}
//乘法
const mul = (num1, num2) => {
  var m = 0, s1 = num1.toString(), s2 = num2.toString();
  try { m += s1.split(".")[1].length } catch (e) { };
  try { m += s2.split(".")[1].length } catch (e) { };
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//加法 
const add = (num1, num2) => {
  var r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return Math.round(num1 * m + num2 * m) / m;
}
//减法 
const sub = (num1, num2) => {
  var r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
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
  formatDate: formatDate,
  colors: colors,
  typeList: typeList,
  typeIndex: typeIndex,
  showToast: showToast,
  showModal: showModal,
  regExp: regExp,
  add: add,
  sub: sub,
  mul: mul,
  div: div
}
