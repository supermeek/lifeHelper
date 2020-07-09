
// new Date参数说明
// new Date('2020', '0', '0')  ==>  2019-12-31
// new Date('2020', '0', '01')  ==>  2020-01-1
// new Date('2020', '0', '31')  ==>  2020-01-31
// new Date('2020', '01', '0')  ==>  2020-01-31
// new Date('2020', '12', '0')  ==>  2020-12-31
// new Date('2020', '01', '01')  ==>  2020-02-01
// new Date('2020', '12', '01')  ==>  2021-01-01

// 个位为0、则月份不加一、保持不变、各位变最大
// 只要各位大于0、月份就要加一、
// 个位为0、十位也为0、则百位减去1、个位、十位均为最大

// 2020-8-8 12:00:00
const formatDate = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

  switch (type) {
    case 'year': return year; break;
    case 'month': return [year, month].map(formatNumber).join('-'); break;
    case 'day': return [year, month, day].map(formatNumber).join('-'); break;
    case 'houer': return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'); break;
    case 'time': return [hour, minute, second].map(formatNumber).join(':'); break;
    case 'week': return weekDay[date.getDay()]; break;
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

// 消费类型
const typeList = [
  { id: 1, icon: 'icon-1.png', name: '餐饮', checked: false, value: 0, percent:'0', color: '#FFAFA9' },
  { id: 2, icon: 'icon-2.png', name: '萌宠', checked: false, value: 0, percent: '0', color: '#CACACA' },
  { id: 3, icon: 'icon-3.png', name: '家人', checked: false, value: 0, percent: '0', color: '#937773' },
  { id: 4, icon: 'icon-4.png', name: '出行', checked: false, value: 0, percent: '0', color: '#FA746A' },
  { id: 5, icon: 'icon-5.png', name: '居家', checked: false, value: 0, percent: '0', color: '#87C05A' },
  { id: 6, icon: 'icon-6.png', name: '娱乐', checked: false, value: 0, percent: '0', color: '#49B7EA' },
  { id: 7, icon: 'icon-7.png', name: '衣妆', checked: false, value: 0, percent: '0', color: '#A3D9BD' },
  { id: 8, icon: 'icon-8.png', name: '社交', checked: false, value: 0, percent: '0', color: '#FF5252' },
  { id: 9, icon: 'icon-9.png', name: '转账', checked: false, value: 0, percent: '0', color: '#A3D4FF' },
  { id: 10, icon: 'icon-10.png', name: '其他', checked: false, value: 0, percent: '0', color: '#FEF001' },
]
const types = ['餐饮', '萌宠', '宝贝', '出行', '居家', '娱乐', '衣装', '社交', '转账', '其他']

// 返回类型的index
const typeIndex = (name) => {
  let index = null
  typeList.forEach((item,i) => {
    if(item.name == name){
      index = i
    }
  })
  return index
}

// 用户头像
const avatarList = [
  { id: 1, icon: 'user11.png', gander: 'female', checked: false },
  { id: 2, icon: 'user12.png', gander: 'female', checked: false },
  { id: 3, icon: 'user13.png', gander: 'female', checked: false },
  { id: 4, icon: 'user14.png', gander: 'female', checked: false },
  { id: 5, icon: 'user15.png', gander: 'female', checked: false },
  { id: 6, icon: 'cat1.png', gander: 'female', checked: false },
  { id: 7, icon: 'user21.png', gander: 'male', checked: false },
  { id: 8, icon: 'user22.png', gander: 'male', checked: false },
  { id: 9, icon: 'user23.png', gander: 'male', checked: false },
  { id: 10, icon: 'user24.png', gander: 'male', checked: false },
  { id: 11, icon: 'user25.png', gander: 'male', checked: false },
  { id: 12, icon: 'dog1.png', gander: 'male', checked: false }
]

// 用户类别
const raceList= [
  { id: 1, name: '本人', value: 'me' },
  { id: 2, name: '他人', value: 'other' },
  { id: 3, name: '宠物', value: 'pet' },
]
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



module.exports = {
  formatDate: formatDate,
  colors: colors,
  typeList: typeList,
  types: types,
  typeIndex: typeIndex,
  showToast: showToast,
  showModal: showModal,
  add: add,
  sub: sub,
  mul: mul,
  div: div,
  avatarList:avatarList,
  raceList: raceList
}
