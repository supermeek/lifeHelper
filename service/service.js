const app = getApp();
import request from './request.js'
import apis from './api.js'

class service {
  constructor() {
    this._baseUrl = 'https://yueyatianchong.cn'
    this._defaultHeader = {
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': "Token " + wx.getStorageSync('token').data
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    this._request._header = this._defaultHeader
  }

  setHeader(key) {
    this._defaultHeader.Authorization = "Token " + key;
  }



  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    // console.error("接口报错了")
    console.error(res)
    console.log(res)
    var that = this;
    if (res.statusCode == 401) {
      wx.redirectTo({
        url: '/pages/index/loading',
      })
    } else {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: '出错了',
        icon: 'none'
      })
    }
  }


  /**
   * name: http.js
   * description: request服务 
   * date: 2019-12-3
   * 统一的request请求归纳
   * 统一接收参数
   *      message: 请求中是否展示loading提示信息
   *      info: 成功提示信息
   *      api: 请求接口（包含域名）
   * 请求方式 （如需其他方式需在request中另加）
   *      getRequest
   *      postRequest
   *      deleteRequest
   *      putRequest
   *      formRequest
   */

  /**  *********************** 登陆模块 *************************** */

  /**
   * function: 微信code登录
   * method: POST
   * parameter:
        js_code: 微信code
   * response:
        code:0, 
        data"token"
  */
  wxlogin(code, info = null, message = null) {
    let data = { js_code: code }
    let url = this._baseUrl + apis.WX_LOGIN
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }



  /**
   * function: 创建订单
   * method: POST/PUT 创建/编辑
   * request: 
   *        id: 编辑时候需要id
   *        item_type: str, 类型
            outcome: bool,是否是支出(default: True)
            money: 金额
            pay_datetime: datetime, 付款时间
            desc: str(0-85), 备注
   * response: { code: 0 }
   */
  creatBill(id, type, outcome, money, time, desc, info = null, message = null) {
    let data = {
      item_type: type,
      outcome: outcome,
      money: money,
      pay_datetime: time,
      desc: desc
    }
    if (id == null) {
      let url = this._baseUrl + apis.CREAT_BILL.replace(/{id}\//, '')
      return this._request.postRequest(url, data, info, message).then(res => res.data)
    } else {
      let url = this._baseUrl + apis.CREAT_BILL.replace(/{id}/, id)
      return this._request.putRequest(url, data, info, message).then(res => res.data)
    }
  }


  /**
   * function: 查询订单
   * method: POST
   * request: 
   * start: date, 开始时间
     end: date, 开始时间
     outcome: bool, 是否支出
     item_type_name: str, 类型名称
     is_all: 是否返回全部
   * response: {}
   */
  getBill(start, end, types, outcome, is_all = true, info = null, message = null) {
    let data = {
      start: start,
      end: end,
      item_type_name: types,
      is_all: is_all
    }
    if (outcome) data['outcome'] = outcome
    let url = this._baseUrl + apis.GET_BILL
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 删除订单
   * method: DELETE
   */
  deleteBill(id, info = null, message = null) {
    let data = {}
    let url = this._baseUrl + apis.GET_BILL_DELETE.replace(/{id}/, id)
    return this._request.deleteRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 查看订单
   * method: GET
   * request: {id}
   * response: {}
   */
  getBillDetail(id, info = null, message = null) {
    let data = {}
    let url = this._baseUrl + apis.GET_BILL_DETAIL.replace(/{id}/, id)
    console.log(url)
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 查询类型金额统计
   * method: POST
   * request: 
   * start: date, 开始时间
     end: date, 开始时间
   * response: {}
   */
  getBillPie(start, end, info = null, message = null) {
    let data = {
      start: start,
      end: end
    }
    let url = this._baseUrl + apis.GET_BILL_PIE
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 消费趋势统计
   * method: POST
   * request: 
   * start: date, 开始时间
     end: date, 开始时间
   * response: {}
   */
  getBillLine(start, end, type, year, info = null, message = null) {
    console.log(type)
    if (type == 'date') {
      var data = {
        start: start,
        end: end,
        group_by: type
      }
    } else {
      var data = {
        year: year,
        group_by: type
      }
    }
    let url = this._baseUrl + apis.GET_BILL_LINE
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }


  /********************** 体重模块 *********************** */
  /**
  * function: 查询对象
  * method: GET
  */
  getTarget(info = null, message = null) {
    var data = {}
    let url = this._baseUrl + apis.GET_TARGET
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
  * function: 创建对象
  * method: POST
  */
  creatTarget(parame, info = null, message = null) {
    var data = parame
    let url = this._baseUrl + apis.CREAT_TARGET
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }



  /**
  * function: 查询对象体重记录
  * method: GET
  */
  getWeightList(target_pk, info = null, message = null) {
    var data = {}
    let url = this._baseUrl + apis.GET_WEIGHT_LIST.replace(/{target_pk}/, target_pk)
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
  * function: 查询单条体重记录的详情
  * method: GET
  */
  getWeightDetail(targetId, weightId, info = null, message = null) {
    var data = {}
    let url = this._baseUrl + apis.GET_WEIGHT_DETAIL.replace(/{target_pk}/, targetId).replace(/{id}/, weightId)
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 删除体重记录
   * method: DELETE
   */
  deleteWeight(targetId, weightId, info = null, message = null) {
    let data = {}
    let url = this._baseUrl + apis.DELETE_WEIGHT_LIST.replace(/{target_pk}/, targetId).replace(/{id}/, weightId)
    return this._request.deleteRequest(url, data, info, message).then(res => res.data)
  }

  /**
  * function: 创建对象体重记录
  * method: POST
  */
  creatWeightList(targetId, weightId, time, weight, height, info = null, message = null) {
    let data = {
      record_datetime: time,
      weight: weight,
      height: height
    }
    if (weightId == null) {
      let url = this._baseUrl + apis.CREAT_WEIGHT_LIST.replace(/{target_pk}/, targetId)
      return this._request.postRequest(url, data, info, message).then(res => res.data)
    } else {
      let url = this._baseUrl + apis.MODIFY_WEIGHT_LIST.replace(/{target_pk}/, targetId).replace(/{id}/, weightId)
      return this._request.putRequest(url, data, info, message).then(res => res.data)
    }
  }

}

const $service = new service()

export default service