// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义两个变量，
    showInThearter: true,
    showComingSoon: false,
    //下面两个对象用来存放加载到的数据offset和total
    //让这两个对象和typeId同名，方便使用
    inThearters: {},
    comingSoon: {},
    isBookShow: false,
    isThingShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var typeId = options.typeId;
    if (typeId === 'inThearters') {
      this.setData({
        showInThearter: false,
        showComingSoon: true
      })
    } else {
      this.setData({
        showInThearter: true,
        showComingSoon: false
      });
    }
    this.getMovieListData('inThearters'); //根据唯一标示获取对应的数据
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
    var isShow = this.data.isShow;
    this.setData({
      isShow: false
    })
   
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
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

  },
  selectTap(event) {

    var tabId = event.currentTarget.dataset.tabId;
    console.log(tabId); //comingSoon inThearters
    //注意此处的tabId是text标签中（正在上映、即将上映）中的data-tab-id的值
    //这里最好还是要换一个标示，不然跟上面的标示重名，容易混淆
    if (tabId === 'inThearters') {
      this.setData({
        showInThearter: true,
        showComingSoon: false
      });

    } else {
      this.setData({
        showInThearter: false,
        showComingSoon: true
      });

    }
    //在两个值切换的时候，如果没有数据再进行加载
    if (!this.data[tabId].messages) {
      this.getMovieListData(tabId);
    }
  },
  getMovieListData(typeId) {
    var that = this;
    var URL, mark;
    var bookLength = that.data.bookLength;
    var thingLength = that.data.thingLength;
    var isBookShow = that.data.isBookShow;
    var isThingShow = that.data.isThingShow;
    if (typeId === 'inThearters') {
      URL = app.globalData.huanbaoBase + 'refreshbooks.php';
      mark = 'lastbookId';
    } else {
      URL = app.globalData.huanbaoBase + 'refreshthings.php';
      mark = 'lastthingId';
    }

    if (bookLength < 5) {
      that.setData({
        isBookShow: true
      })
    }
    if (thingLength < 5) {
      that.setData({
        isThingShow: true
      })
    }
    if (thingLength < 5 && bookLength < 5) {
      return
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
  
  },
  //下拉加载数据
  loadMore() {
    let typeId = '';
    if (this.data.showInThearter) {
      typeId = 'inThearters'
    } else {
      typeId = 'comingSoon'
    }

    this.getMovieListData(typeId);
  },


})