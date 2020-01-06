/**
 * name: service.js
 * description: request 处理基础类 正常无需改动
 * date: 2019-12-3
 */
import apis from './api.js'
class request {
  constructor() {
    this._header = {}
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'application/json; charset=UTF-8' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'application/json; charset=UTF-8' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'application/json; charset=UTF-8' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'application/json; charset=UTF-8' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'POST')
  }

  /**
   * formdata类型的网络请求
   */
  formRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'POST')
  }

  /**
   * formdata上传文件类型的网络请求
   */
  fileRequest(url, data, info, message, header = this._header) {
    let contentType = { 'content-type': 'multipart/form-data' }
    header = Object.assign(this._header, contentType)
    return this.requestAll(url, data, info, message, header, 'POST')
  }

  /**
   * 网络请求
   * url: 网络请求的url
   * params: 请求参数
   * message: 加载中的提示信息
   * method: 请求方式
   * success: 成功的回调函数
   * _errorHandler：失败的回调
   */
  requestAll(url, data, info, message, header, method) {
    let $this = this
    wx.showNavigationBarLoading();
    if (message) {
      wx.showLoading({
        title: message,
      })
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
          if (message) {
            wx.hideLoading()
          }
          if (200 <= res.statusCode && res.statusCode <= 300) { //服务端业务处理正常结束
            if (res.data.code == 1024) { //报错处理
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            } else if (res.data.code == 0) { //成功提示
              if (info) {
                wx.showToast({
                  title: info
                })
              }
            }
            resolve(res)
          } else { //其它错误，提示用户错误信息（统一异常处理）
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading();
          if (message) {
            wx.hideLoading()
          } else {
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
          }
          reject(res)
        })
      })
    })
  }
}

export default request