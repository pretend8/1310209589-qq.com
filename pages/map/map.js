// pages/map/map.js

// 获取应用实例 
let app = getApp()
let wechat = require('../../utils/wechat.js')
let aMap = require('../../utils/amap.js')
let markersData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    includePoints: [
      { latitude: '114.375743', longitude:'30.882557'},
      { latitude: '114.569084', longitude:'30.128765'}
    ],
    keywords: "",
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    controls: [{
      id: 0,
      position: {
        left: 10,
        top: 200,
        width: 40,
        height: 40
      },
      iconPath: "/images/circle1.png",
      clickable: true
    }],
    city: '',
    markerId: 0
  },
  getRoutes() {
    // 起点位置
    let {
      markers,
      markerId,
      longitude,
      latitude,
      city,
      textData
    } = this.data
    let {
      name,
      desc
    } = textData
    if (!markers.length) return
    // 终点位置

    let {
      latitude: latitude2,
      longitude: longitude2
    } = markers[markerId]

    let url = `/pages/routes/routes?latitude=${latitude}&longitude=${longitude}&latitude2=${latitude2}&longitude2=${longitude2}&city=${city}&name=${name}&desc=${desc}`
    wx.navigateTo({
      url
    })

  },
  bindInput() {
    let {
      latitude,
      longitude,
      city
    } = this.data
    let url = `/pages/search/search?city=${city}&lonlat=${longitude},${latitude}`
    wx.navigateTo({
      url
    })
  },
  mapchange() {},
  // 回到原点
  controltap(e) {
    let {
      controlId
    } = e.detail
    let mapCtx = wx.createMapContext("map")
    mapCtx.moveToLocation()
  },
  // 标记点击事件
  markertap(e) {
    let {
      markerId
    } = e
    let {
      markers
    } = this.data
    let marker = markers[markerId]
    this.showMarkerInfo(marker)
    this.changeMarkerColor(markerId)
  },

  showMarkerInfo(data) {
    let {
      name,
      address: desc
    } = data
    this.setData({
      textData: {
        name,
        desc
      }
    })
  },
  changeMarkerColor(markerId) {
    let {
      markers
    } = this.data
    markers.forEach((val, index) => {
      val.iconPath = '/images/marker.png'
      if (index == markerId) val.iconPath = '/images/marker_checked.png'
    })
    this.setData({
      markers,
      markerId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中！！！',
    })
    // 获取信息
    aMap.getRegeo()
      .then(d => {
        wx.hideLoading()
        let {
          name,
          desc,
          latitude,
          longitude
        } = d[0]
        let {
          city
        } = d[0].regeocodeData.addressComponent
        this.setData({
          latitude,
          longitude,
          city,
          textData: {
            name,
            desc
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})