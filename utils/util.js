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


module.exports = {
  formatTime: formatTime,
  colors: colors
}
