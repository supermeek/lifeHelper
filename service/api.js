// API文档地址：

// api接口

const apis = {

  WX_LOGIN: '/api/wx-auth/', //获取用户openid
  CREAT_BILL: '/api/fatwang/bills/', //创建订单
  GET_BILL: '/api/fatwang/bills/search/', //查询订单

  GET_BILL_PIE: '/api/fatwang/bills/statistic_pie/', //类型消费金额统计
  GET_BILL_LINE: '/api/fatwang/bills/statistic_trend/', //类型消费金额统计
  

}

export default apis