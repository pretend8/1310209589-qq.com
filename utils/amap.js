let amap = require('./amap-wx.js')
// 高德开发者的key
let key = '4c3ff995b43fc82dca57e52d8592d07a';

let myFun  = new amap.AMapWX({key})

class Amap{
  /* 
    获取POI数据
    @params {String} querykeywords
  */
  static getPoiAround(querykeywords=''){
    return new Promise((res,rej)=>{
      myFun.getPoiAround({
        querykeywords,
        success:res,
        fail:rej
      })
    })
  }
  /*
    获取地理描述数据
   */
  static getRegeo(){
    return new Promise((res,rej)=>{
      myFun.getRegeo({
        success:res,
        fail:rej
      })
    })
  }
  /*
    获取天气数据
   */
  static getWeather(){
    return new Promise((res,rej)=>{
      myFun.getWeather({
        success: res,
        fail: rej
      })
    })
  }

  /**
   * 获取输入提示词
   * @params {string} keywords
   * @params {string} location
   */
  static getInputtips(city,location='',keywords=''){
    return new Promise((res,rej)=>{
      console.log(res,'whath the fuck')
      myFun.getInputtips({
        city,
        keywords,
        location,
        success:res,
        fail:rej
      })
    })
  }

  /**
   * 获取路线规划
   * type : getDrivingRoute --驾车
   * type : getWalkingRroute --步行
   * type : getTransitRoute --公交
   * type : getRidingRoute --骑车
   * @params {string} origin
   * @params {string} distination
   */
  static getRoute(origin, destination,type,city){
    console.log(origin, destination)
    return new Promise((res,rej)=>{
      myFun[type]({
        origin,
        destination,
        city,
        success:res,
        fail:rej
      })
    })
  }
}

module.exports = Amap;