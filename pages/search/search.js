// pages/search/search.js

let wechat = require('../../utils/wechat.js')
let aMap = require('../../utils/amap.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lonlat:'',
    city:'',
    tips:[]
  },
  bindInput(e){
    let {value} = e.detail
    let {lonlat,city} = this.data
    aMap.getInputtips(city,lonlat,value)
      .then(res=>{
        if(res.tips&&res.tips.length){
          this.setData({
            tips:res.tips
          })
        }else{
          this.setData({
            tips:[]
          })
        }
      })
      .catch(e=>{
        console.log('sibaile!')
        console.log(e)
      })
  },
  bindSearch(e){
    console.log(e)
    console.log(e.target)
    let keywords = e.target.dataset.words
    console.log(keywords)
    let pages = getCurrentPages()
    const currentPage = getCurrentPages()[pages.length-2]
    console.log(currentPage,'currentPage')
    if(keywords){
      currentPage.setData({ keywords })
      aMap.getPoiAround(keywords)
        .then(res=>{
          console.log(res)
          let {markers} = res
          markers.forEach(item=>{
            item.iconPath = '/images/marker.png'
          })
          currentPage.showMarkerInfo(markers[0])
          currentPage.changeMarkerColor(0)
          currentPage.setData({markers})
        })
        .catch(e=>{
          console.log(e)
        })
    }
    wx.switchTab({
      url: '/pages/map/map'
    })
    // wx.navigateBack({
    //   delta:1
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      let {lonlat,city} = options
      this.setData({lonlat,city})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})