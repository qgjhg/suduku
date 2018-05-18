// pages/mainpage/mainpage.js


var num = new Array();
for (var i = 0; i < 9; i++) {
  num[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    num[i][j] = 0;
  }
}
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


    try {
      var numline=ran3_3();
      var changenum=[0,3,6,1,4,7,2,5,8];
      for (var line = 0; line < 9; line++) {
        for (var up = 0; up < 9; up++) {
          num[line][up] = numline[tnine(up , changenum[line])];
        }
      }
      
      for (var CTimes = 0; CTimes < 10; CTimes++) {
        var Cran = Math.floor(Math.random() * 3) * 3 + 1;
        var ran = Math.floor(Math.random() * 3);
        if (ran == 0) {
          var reline = num[Cran];
          num[Cran] = num[Cran - 1];
          num[Cran - 1] = reline;
        } else if (ran == 1) {
          var reline = num[Cran];
          num[Cran] = num[Cran + 1];
          num[Cran + 1] = reline;
        } else if (ran == 2) {
          var reline = num[Cran - 1];
          num[Cran - 1] = num[Cran + 1];
          num[Cran + 1] = reline;
        }
      }

      for (var RTimes = 0; RTimes < 10; RTimes++) {
        var Rran = Math.floor(Math.random() * 3) * 3 + 1;
        var ran = Math.floor(Math.random() * 3);
        var reline = 0;
        if (ran == 0) {
          for (var k = 0; k < 9; k++) {
            reline = num[k][Rran];
            num[k][Rran] = num[k][Rran - 1];
            num[k][Rran - 1] = reline;
          }
        } else if (ran == 1) {
          for (var k = 0; k < 9; k++) {
            reline = num[k][Rran];
            num[k][Rran] = num[k][Rran + 1];
            num[k][Rran + 1] = reline;
          }
        } else if (ran == 2) {
          for (var k = 0; k < 9; k++) {
            reline = num[k][Rran - 1];
            num[k][Rran - 1] = num[k][Rran + 1];
            num[k][Rran + 1] = reline;
          }
        }
      }

      var blocknum=block();
      for(var m=0;m<55;m++){
        num[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]='';
      }

      for (var line = 1; line < 10; line++) {
        for (var up = 1; up < 10; up++) {
          var boxname = 'text' + line + up;
          this.setData({
            [boxname]: num[line-1][up-1]
          })
        }
      }
    } finally {

    }

    function tnine(num,line)
    {
      var outnum=0;
      if(num-line<0){
        outnum=num-line+9;
      }else
      {
        outnum=num-line;
      }
      return outnum;
    }

    function block(){
      var outnum = new Array(81);
      var totalnum=new Array(81);
      for(var m=0;m<81;m++){
      totalnum[m] = m;
      }
      for (var i = 0; i < 81; i++) {
        var ran = Math.floor(Math.random() * (81 - i));
        outnum[i] = totalnum[ran];
        for (var j = ran; j < 80 - i; j++) {
          totalnum[j] = totalnum[j + 1];
        }
      }
      return outnum;
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