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
    if (res.statusCode == 403) {
      wx.showModal({
        title: '提示',
        content: '您的账号信息已过期，请退出重新进入',
        success: function () {
          if (res.confirm) {
          } else if (res.cancel) {
          } else {
          }
        },
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
   * method: POST
   * request: 
   *        item_type: str, 类型
            outcome: bool,是否是支出(default: True)
            money: 金额
            pay_datetime: datetime, 付款时间
            desc: str(0-85), 备注
   * response: { code: 0 }
   */
  creatBill(type, outcome, money, time, desc, info = null, message = null) {
    let data = {
      item_type: type,
      outcome: outcome,
      money: money,
      pay_datetime: time,
      desc: desc
    }
    let url = this._baseUrl + apis.CREAT_BILL
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 身份证登录
   * method: POST => formRequest
   * content-type: (application/x-www-form-urlencoded;charset=UTF-8)
   * request: {documentNumber,openId,passWord}
   * response: {个人信息}
   */
  userLogin(parame, info = '登录成功', message = '') {
    let data = {
      documentNumber: parame.documentNumber,
      openId: parame.openId,
      passWord: parame.passWord
    }
    let url = this._baseUrl + apis.USER_LOGIN
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 身份证注册 （默认密码为身份证后6位）
   * method: POST
   * parameter: {name,documentNumber,inviteCode,documentType,mobile,verifyCode,openId}
   * response: {个人信息}
   */
  userRegister(params, info = '注册成功', message = '') {
    let data = {
      name: params.name,
      documentType: params.documentType,
      documentNumber: params.documentNumber,
      inviteCode: params.inviteCode,
      mobile: params.mobile,
      verifyCode: params.verifyCode,
      openId: params.openId,
    }
    let url = this._baseUrl + apis.USER_REGISTER
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: oppenid登录
   * method: POST => formRequest
   * content-type: (application/x-www-form-urlencoded;charset=UTF-8)
   * request: {openId}
   * response: {个人信息}
   */
  oppenidLogin(openId, info = '', message = '') {
    let data = {
      openId: openId
    }
    let url = this._baseUrl + apis.OPPENID_LOGIN
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: oppenid解绑
   * method: POST
   * request: {}
   * response: {}
   */
  unbindOppenid(info = '解绑成功', message = '') {
    let data = {}
    let url = this._baseUrl + apis.UNBIND_OPPENID
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }



  /**  *********************** 个人中心 *************************** */


  /**
   * function: 获取认证信息
   * method: GET
   * parameter: {}
   * response: {认证信息}
   */
  getMineMessage(info = '', message = '') {
    let data = {}
    let url = this._baseUrl + apis.GET_MINE_MESSAGE
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 获取合同/提交数量
   * method: GET
   * parameter: {type:0 合同数量 , 1 提交数量}
   * response: {}
   */
  getCenterNumber(type, info = '', message = '') {
    let data = {
      type: type
    }
    let url = this._baseUrl + apis.GET_CENTER_NUMBER
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }



  /**
   * function: 修改手机号码
   * method: POST
   * parameter: {mobile,verifyCode}
   * response: {}
   */
  changeMobile(verify, info = '更改成功', message = '') {
    let data = {
      mobile: verify.mobile,
      verifyCode: verify.verifyCode
    }
    let url = this._baseUrl + apis.CHANGE_MOBILE
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 修改登录密码
   * method: POST
   * parameter: {passWord,verifyCode}
   * response: {}
   */
  changePassword(verify, passWord, info = '修改成功', message = '') {
    let data = {
      verifyCode: verify.verifyCode,
      passWord: passWord
    }
    let url = this._baseUrl + apis.CHANGE_PASSWORD
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 邀请码列表
   * method: GET
   * parameter: {pageNo,pageSize}
   * response: {}
   */
  getInviteCodeList(pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      pageNo: pageNo,
      pageSize: pageSize
    }
    let url = this._baseUrl + apis.GET_INVITECODE_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 邀请码详情
   * method: GET
   * parameter: {inviteCode}
   * response: {}
   */
  getInviteCodeDetail(inviteCode, info = '', message = '') {
    let data = {
      inviteCode: inviteCode
    }
    let url = this._baseUrl + apis.GET_INVITECODE_DETAIL
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 新增邀请码
   * method: POST => formRequest
   * content-type: (application/x-www-form-urlencoded;charset=UTF-8)
   * parameter: {inviteCode}
   * response: {}
   */
  addInviteCode(inviteCode, info = '新增成功', message = '') {
    let data = {
      inviteCode: inviteCode
    }
    let url = this._baseUrl + apis.ADD_INVITECODE
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 我的排款单
   * method: GET
   * parameter: {useState：0未使用， 1已使用}
   * response: {}
   */
  getBillList(useState, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      useState: useState,
      pageNo: pageNo,
      pageSize: pageSize
    }
    let url = this._baseUrl + apis.GET_BILL_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }



  /**  *********************** 首页 *************************** */

  /**
   * function: 首页药品列表
   * method: GET
   * parameter: {medcineDataName:'用以查询'，pageNo:'1',pageSize:'20'}
   * response: []
   */
  getMedicinalList(medcineDataName, pageNo = 1, pageSize = 10, info = '', message = '') {
    let data = {
      medcineDataName: medcineDataName,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_MEDICINAL_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 药品详情
   * method: GET
   * parameter: {id}
   * response: {}
   */
  getMedicinalDetail(id, info = '', message = '') {
    let data = {
      id: id
    }
    let url = this._baseUrl + apis.GET_MEDICINAL_DETAIL
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**  *********************** 合同 *************************** */

  /**
   * function: 获取任务类型
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  getWorkTypeList(id, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      id: id,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_WORK_TYPE_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 获取新增记录所需字段
   * method: GET
   * parameter: {id:任务类型id}
   * response: {}
   */
  getRecordField(id, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      id: id,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_RECORD_FIELD
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 获取所有工作区域/药品/时长/内容
   * method: GET
   * parameter: {
   *          id: type=0,1时 id=合同id;type=2,3时 id=任务类型下拉的id
   *          type: 工作区域：0 药品：1 时长：2 内容：3
   *          pageNo
   *          pageSize
   * }
   * response: {}
   */
  getAllSelectList(type, id, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      id: id,
      type: type,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_ALL_SELECT
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 获取终端列表
   * method: GET
   * parameter: {name,pageNo,pageSize}
   * response: {}
   */
  getTerminalList(name, pageNo = 1, pageSize = 10, info = '', message = '') {
    let data = {
      name: name,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_HOSPTIAL_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 保存创建或编辑的记录
   * method: POST
   * parameter: {data}
   * response: {}
   */
  saveEditRecord(data, info = '保存成功', message = ' 提交中') {
    let url = this._baseUrl + apis.SAVE_EDIT_RECORD
    return this._request.postRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 获取记录详情
   * method: GET
   * parameter: {id}
   * response: {}
   */
  getRecordDetail(id, info = '', message = '') {
    let data = {
      id: id
    }
    let url = this._baseUrl + apis.GET_RECORD_DETAIL
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
  * function: 获取提交记录
  * method: GET
  * parameter: {
      checkStatus: 0未提交(取消) 1待审核(已提交） 2已通过(已结转) 3已拒绝 4归档中 5已归档 6全部,
      pageNo,
      pageSize
  }
  * response: {}
  */
  getSubmissionList(checkStatus, pageNo = 1, pageSize = 20, info = '', message = '') {
    let data = {
      checkStatus: checkStatus,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_SUBMISSION_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 获取提交记录的详情
   * method: GET
   * parameter: { id }
   * response: {}
   */
  getSubmissionDetail(id, info = '', message = '') {
    let data = {
      id: id
    }
    let url = this._baseUrl + apis.GET_SUBMISSION_DETAIL
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 取消提交/重新提交
   * method: GET
   * parameter: { id }
   * response: {}
   */
  cancelRecordSubmit(id, info = '', message = '') {
    let data = {
      id: id
    }
    let url = this._baseUrl + apis.CANCEL_RECORD_SUBMIT
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


// **********************合同详情****************


  /**
   * function: 获取合同列表
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  getContractList(contractStatus, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      contractStatus: contractStatus,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_CONTRACT_LIST
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 获取合同详情
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  getContractDetail(id, info = '', message = '') {
    let data = {
      id: id,
    }
    let url = this._baseUrl + apis.GET_CONTRACT_DETAIL
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 我的记录
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
    getMyrecordsList(checkStatus, contractId, startTime='', endTime='', pageNo = 1, pageSize = 5, info = '', message = '') {
    let data = {
      checkStatus: checkStatus,
      contractId: contractId,
      startTime: startTime,
      endTime: endTime,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_MY_RECORD
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function:起止时间查询我的记录
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  getMyrecordsListSE(checkStatus, contractId, startTime, endTime, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      checkStatus: checkStatus,
      contractId: contractId,
      startTime: startTime,
      endTime: endTime,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_MY_RECORD
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 我的记录类型
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  getTaskType(id, pageNo = 1, pageSize = 999, info = '', message = '') {
    let data = {
      id: id,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + apis.GET_TASK_TYPE
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }

  /**
   * function: 删除记录
   * method: GET
   * parameter: {id:合同id,pageNo,pageSize}
   * response: {}
   */
  postDeleteRecord(id, info = '', message = '') {
    let data = {
      id: id,
    }
    let url = this._baseUrl + apis.DELETE_MY_RECORD
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 接合同
   * method: POST
   * parameter: {contractStatus,id}
   * response: {}
   */
  acceptContract(contractStatus, id, info = '', message = '') {
    let data = {
      contractStatus: contractStatus,
      id: id,
    }
    let url = this._baseUrl + apis.ACCEPT_CONTRACT
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }


  /**
   * function: 提交记录
   * method: POST
   * parameter: {contractId,verifyCode}
   * response: {}
   */
  submitRecord(contractId, idAndNumber, ids, month, billId, info = '', message = '') {
    let data = {
      contractId: contractId,
      idAndNumber: idAndNumber,
      ids: ids,
      month: month,
      billId: billId,
    }
    let url = this._baseUrl + apis.SUBMIT_RECORD
    return this._request.formRequest(url, data, info, message).then(res => res.data)
  }


  /** *************** 全局 ****************** */

  /**
   * function: 根据名称查询列表
   * method: GET
   * parameter: {name,api,pageNo,pageSize}
   * response: {}
   */
  getNameList(name, api, pageNo = 1, pageSize = 10, info = '', message = '') {
    let data = {
      name: name,
      pageNo: pageNo,
      pageSize: pageSize,
    }
    let url = this._baseUrl + api
    return this._request.getRequest(url, data, info, message).then(res => res.data)
  }


}

const $service = new service()

export default service