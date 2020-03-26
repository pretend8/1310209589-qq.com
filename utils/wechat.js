/**
 * Promise化小程序接口
 */

class Wechat {
  /**
   * 登录
   * @return {Promise}
   */
  static login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 获取用户信息
   * @return {Promise}
   */
  static getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 设置本地数据缓存
   * @return {Promise}
   */
  static setStorage(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 获取当前位置
   * @params {string} type
   * @return {Promise}
   */
  static getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 发起网路请求
   * @params {string} api
   * @params {string} path
   * @params {object} params
   * @return {Promise}
   */
  static request(api, path, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${api}/${path}`,
        params: Object.assign({}, params),
        header: {
          'Content-Type': 'json'
        },
        success: resolve,
        fail: reject
      })
    })
  }
}
module.exports = Wechat;