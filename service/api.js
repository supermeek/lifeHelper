// API文档地址：

// api接口

const apis = {

  WX_LOGIN: '/api/wx-auth/', //获取用户openid
  GET_BILL: '/api/fatwang/bills/search/', //查询订单
  CREAT_BILL: '/api/fatwang/bills/{id}/', //创建订单
  GET_BILL_DETAIL: '/api/fatwang/bills/{id}/', //查看订单
  GET_BILL_DELETE: '/api/fatwang/bills/{id}/', //删除订单

  GET_BILL_PIE: '/api/fatwang/bills/statistic_pie/', //饼形图数据
  GET_BILL_LINE: '/api/fatwang/bills/statistic_trend/', //线型图数据

  GET_TARGET: '/api/fatwang/recordtargets/search/', //查询对象
  CREAT_TARGET: '/api/fatwang/recordtargets/', //创建对象
  MODIFY_TARGET: '/api/fatwang/recordtargets/{id}/', //修改对象
  DELETE_TARGET: '/api/fatwang/recordtargets/{id}/', //删除对象
  GET_WEIGHT_LIST: '/api/fatwang/recordtargets/{target_pk}/records/search/', //查看体重列表
  CREAT_WEIGHT_LIST: '/api/fatwang/recordtargets/{target_pk}/records/', //创建体重列表
  MODIFY_WEIGHT_LIST: '/api/fatwang/recordtargets/{target_pk}/records/{id}/', //修改体重列表
  DELETE_WEIGHT_LIST: '/api/fatwang/recordtargets/{target_pk}/records/{id}/', //删除体重列表

}

export default apis