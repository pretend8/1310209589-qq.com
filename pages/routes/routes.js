// pages/routes/routes.js

let aMap = require('../../utils/amap.js')
let weChat = require('../../utils/wechat.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["getDrivingRoute", "getWalkingRoute", "getTransitRoute", "getRidingRoute"],
    markers: [],
    polyline: [],
    distance: '',
    cost: '',
    transits: [],
    city: "",
    name: "",
    desc: "",
    tabList: [{
        name: '驾车',
        id: 1
      },
      {
        name: '步行',
        id: 2
      },
      {
        name: '公交',
        id: 3
      },
      {
        name: '骑行',
        id: 4
      }
    ],
    activeIndex: 0,
  },
  toDetail(){
    let url = '/pages/info/info'
    wx.navigateTo({
      url
    })
  },
  toNav(){
    let {latitude,longitude,name,desc} = this.data
    wx.openLocation({
      latitude:+latitude,
      longitude:+longitude,
      name,
      address:desc
    })
  },
  tabChange(e) {
    console.log(e, '2222')
    let currentId = e.target.dataset.id
    let activeIndex = this.data.tabList.findIndex(val => val.id === currentId)
    this.setData({
      activeIndex
    })
    this.getRoute()
    console.log('index', 'nihao')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let {
      latitude,
      latitude2,
      longitude,
      longitude2,
      name,
      desc,
      city
    } = e
    let markers = [{
        iconPath: "/images/mapicon_navi_s.png",
        id: 0,
        latitude,
        longitude,
        width: 23,
        height: 33
      },
      {
        iconPath: "/images/mapicon_navi_e.png",
        id: 0,
        latitude2,
        longitude2,
        width: 23,
        height: 33
      }
    ]
    this.setData({
      latitude,
      latitude2,
      longitude,
      longitude2,
      city,
      name,
      desc,
      markers
    })
    console.log(this.data, 'shujuyuan')
    this.getRoute()
  },
  getRoute() {
    let {
      latitude,
      latitude2,
      longitude,
      longitude2,
      types,
      activeIndex,
      city,
      name,
      desc
    } = this.data
    let type = types[activeIndex]
    let origin = `${longitude},${latitude}`
    let destination = `${longitude2},${latitude2}`
    console.log(this.data, destination, 'nihao')
    console.log(city, 'shenmehuishi')
    aMap.getRoute(origin, destination, type, city)
      .then(res => {
        console.log(res, 'jieguo')
        this.setRouteData(res, type)
      })
      .catch(e => {
        console.log(e)
      })
  },
  setRouteData(res, type) {
    if (type !== 'getTransitRoute') {
      // 其它方式
      let points = []
      if (res.paths && res.paths.length && res.paths[0].steps && res.paths[0].steps.length) {
        let steps = res.paths[0].steps
        wx.setStorageSync('steps', steps)
        steps.forEach(val => {
          let poLen = val.polyline.split(';')
          poLen.forEach(value => {
            let obj = {
              longitude: parseFloat(value.split(',')[0]),
              latitude: parseFloat(value.split(',')[1])
            }
            points.push(obj)
          })
        })
      }
      this.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      })
      console.log(this.data.polyline, 'this.data.polyline')

    } else {
      // //公交
      if (res.transits && res.transits.length) {
        res.transits.forEach(item => {
          item.transports = []
          let {
            segments
          } = item
          segments.forEach((subItem, subIndex) => {
            if (subItem.bus && subItem.bus.buslines && subItem.bus.buslines[0] && subItem.bus.buslines[0].name) {
              let name = subItem.bus.buslines[0].name
              item.transports.push(name)
            }
          })
        })
        this.setData({
          transits:res.transits
        })
      }

    }

    // 处理距离 和时间
    if (type ==='getDrivingRoute'){
      // 自驾
      if(res.paths&&res.paths.length&&res.paths[0].distance){
        this.setData({
          distance:res.paths[0].distance +'米'
        })
      }
      if (res.taxi_cost){
        this.setData({
          cost: `打车约${parseInt(res.taxi_cost)}元`
        })
      }
    } else if (type === 'getWalkingRoute' || type === 'getRidingRoute'){
      // 步行或者骑行
      if (res.paths && res.paths.length && res.paths[0].distance) {
        this.setData({
          distance: res.paths[0].distance + '米'
        })
      }
      if (res.paths && res.paths.length && res.paths[0].duration) {
        this.setData({
          cost: parseInt(res.paths[0].duration/60) + '分钟'
        })
      }
    }else{
      // 公交
    }
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