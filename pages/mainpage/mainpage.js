// pages/mainpage/mainpage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },



  bindMain: function ran3_3() {
    var outnum = new Array(9);
    var totalnum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < 9; i++) {
      var ran = Math.floor(Math.random() * (9 - i));
      outnum[i] = totalnum[ran];
      for (var j = ran; j < 8 - i; j++) {
        totalnum[j] = totalnum[j + 1];
      }
    }

    this.setData({
      test: outnum
    })
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  onReady: function () {
    //creat sudu
    var num = new Array();
    for (var i = 0; i < 9; i++) {
      num[i] = new Array(i);
      for (var j = 0; j < 9; j++) {
        num[i][j] = 0;
      }
    }
    try {
      var allnum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      


      for (var line = 1; line < 10; line++) {
        for (var up = 1; up < 10; up++) {
          var boxname = 'text' + line + up;
          this.setData({
            [boxname]: '1'
          })
        }
      }
    } finally {

    }

    //random1-9
    function ran3_3() {
      var outnum=new Array(9);
      var totalnum=[1,2,3,4,5,6,7,8,9];
      for(var i=0;i<9;i++){
        var ran=Math.floor(Math.random()*(9-i));
        outnum[i]=totalnum[ran];
        for(var j=ran;j<8-i;j++)
        {
          totalnum[j]=totalnum[j+1];
        }
      }
      return outnum;
    }

    //
    /*function numToxy(box, num) {
      var boxx = parseInt(box % 3);
      var boxy = parseInt(box / 3);
      var inx = parseInt(num % 3);
      var iny = parseInt(num / 3);
      var x = boxx * 3 + intx;
      var y = boxy * 3 + inty;

    }*/


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