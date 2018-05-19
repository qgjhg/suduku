// pages/mainpage/mainpage.js
var numnow=0;
var lastidx=0;
var lastidy=0;
var lastsiu='';
var usetime=0;
var nowtime=0;
var isbiaoji=0;
var differ=50;
var timer;
var num = new Array();
for (var i = 0; i < 9; i++) {
  num[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    num[i][j] = 0;
  }
}
var numstatic = new Array();
for (var i = 0; i < 9; i++) {
  numstatic[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    numstatic[i][j] = 0;
  }
}
var numbiaoji = new Array();
for (var i = 0; i < 9; i++) {
  numbiaoji[i]=new Array(i);
  for (var j = 0; j < 9; j++) {
    numbiaoji[i][j]=new Array(i,j)
    for (var k = 0; k < 9; k++) {
      numbiaoji[i][j][k] = 0;
    }
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:'00:00'
  },

  //choosenumber
  chooseTap: function chooseBox(e) {
    var id=e.currentTarget.id;
    var idx = parseInt(id.substr(3, 1));
    var idy = parseInt(id.substr(4, 1));

    if (lastsiu == 'shizi') {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if (i == lastidx || j == lastidy) {
            this.setData({
              [color]: 'background-color:#F2F2F2;'
            })
          }
        }
      }
    } else if (lastsiu == 'dianwei') {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if ((num[i - 1][j - 1] == numnow)||(lastidx==i && lastidy==j)) {
            this.setData({
              [color]: 'background-color:#F2F2F2;'
            })
          }
        }
      }
    }

    numnow = parseInt(num[idx - 1][idy - 1]);
    if (numnow == 0) {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if ((i == idx || j == idy) && (!(i == idx && j == idy))) {
            this.setData({
              [color]: 'background-color:#E0FFFF;'
            })
          } else if (i == idx && j == idy) {
            this.setData({
              [color]: 'background-color:#BFEFFF;'
            })
          }
        }
      }
      lastsiu = 'shizi';
      lastidx = idx;
      lastidy = idy;
    } else if (numnow >= 1 && numnow <= 9) {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if ((num[i - 1][j - 1] == numnow) && (!(i == idx && j == idy))) {
            this.setData({
              [color]: 'background-color:#FFD1A4;'
            })
          } else if (i == idx && j == idy) {
            this.setData({
              [color]: 'background-color:#FF8000;'
            })
          }
        }
      }
      lastsiu = 'dianwei';
      lastidx = idx;
      lastidy = idy;
    }
  },

  //enter number
  putnum: function (e) {
    if (lastidx > 0 && lastidy > 0) {
      if (isbiaoji == 0) {
        var btnid = e.currentTarget.id;
        var btnnum = parseInt(btnid.substr(3, 1));
        var changebox = 'text' + lastidx + lastidy;
        var changestyle = 'otherstyle' + lastidx + lastidy;
        var textstyle = 'txtstyle' + lastidx + lastidy;
        if (numstatic[lastidx - 1][lastidy - 1] == 1) {
          num[lastidx - 1][lastidy - 1] = btnnum;
          this.setData({
            [changebox]: num[lastidx - 1][lastidy - 1],
            [changestyle]: 'color:#009393;line-height:70rpx;',
            [textstyle]: ''
          })
        }
      } else if (isbiaoji == 1) {
        var btnid = e.currentTarget.id;
        var btnnum = btnid.substr(3, 1);
        var changebox = 'text' + lastidx + lastidy;
        var changestyle = 'otherstyle' + lastidx + lastidy;
        var textstyle = 'txtstyle' + lastidx + lastidy;
        if (numstatic[lastidx - 1][lastidy - 1] == 1) {
          num[lastidx-1][lastidy-1]=0;
          var outnum = '';
          if (numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] == btnnum) {
            numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] = 0;
          } else {
            numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] = btnnum;
          }
          for (var k = 0; k < 9; k++) {
            if (k % 3 == 0 && k != 0) {
              outnum = outnum + '\n'
            }
            if (numbiaoji[lastidx - 1][lastidy - 1][k] != 0) {
              outnum = outnum + numbiaoji[lastidx - 1][lastidy - 1][k].toString();
            } else {
              outnum = outnum + ' ';
            }
          }

          this.setData({
            [changebox]: outnum,
            [changestyle]: 'color:#009393; line-height:18rpx;',
            [textstyle]: 'font-size:55%'
          })
        }
      }
    }
  },

  //finish game
  donegame:function(){
    var exstr='错误信息：'
    var isendgame = true;
    if (isendgame) {
      for (var line = 0; line < 9; line++) {
        if (!linecheck(line)) {
          isendgame = false;
          exstr = exstr + '行' + (line + 1).toString();
          break;
        }
      }
    }
    if (isendgame) {
      for (var up = 0; up < 9; up++) {
        if (!upcheck(up)) {
          isendgame = false;
          exstr = exstr + '列' + (up + 1).toString();
          break;
        }
      }
    }
    if(isendgame){
      for (var i = 0; i < 9; i++) {
        if (!boxcheck(i)) {
          isendgame = false;
          var pos=['左上','中上','右上','左中','正中','右中','左下','中下','右下'];
          exstr = exstr  + pos[i] +'方块';
          break;
        }
      }
    }
    
    if(isendgame==true){
      wx.showModal({
        title: '恭喜！',
        content: '数独完成，耗时'+formatTime(nowtime),
        showCancel:false
      })
    }else{
      wx.showModal({
        title: '做错啦！',
        content: '再检查下，'+exstr,
        showCancel:false
      })
    }


    function linecheck(checkline){
      var returnvalue=true;
      for(var up=0;up<8;up++){
        for(var i=up+1;i<9;i++){
          if(num[checkline][up]==num[checkline][i]){
            returnvalue=false;
          }
        }
      }
      return returnvalue;
    }
    function upcheck(checkup){
      var returnvalue = true;
      for (var line = 0; line < 8; line++) {
        for (var i = line + 1; i < 9; i++) {
          if (num[checkup][line] == num[checkup][i]) {
            returnvalue = false;
          }
        }
      }
      return returnvalue;
    }
    function boxcheck(checkbox){
      var exx=parseInt(checkbox%3)*3;
      var exy=parseInt(checkbox/3)*3;
      var returnvalue=true;
      for(var i=0;i<8;i++){
        for(var j=i+1;j<9;j++){
          var nix = parseInt(i % 3);
          var niy = parseInt(i / 3);
          var njx = parseInt(j % 3);
          var njy = parseInt(j / 3);
          if(num[exx+nix][eyy+niy]==num[exx+njx][eyy+njy]){
            returnvalue=false;
          }
        }
      }
      return returnvalue;
    }
  },

  //pause
  pause:function(){
    var that=this;
    clearTimeout(timer);
    wx.showModal({
      title: '',
      content: '继续请按确定',
      showCancel: false,
      success: function (res) {
        if(res.confirm){
          Countdown(that)
        }
      }
    })
  },

  //biaoji
  biaoji:function(){
    if (isbiaoji) {
      isbiaoji = 0;
      this.setData({
        biaojistyle: ''
      })
    } else {
      isbiaoji=1;
      this.setData({
        biaojistyle: 'background-color:#FFD1A4'
      })
    }
  },

  chongkai:function(){
    var that=this;
    wx.showModal({
      title: '重开本局',
      content: '确认重新开始本局游戏？',
      success: function (res) {
        if (res.confirm) {
          nowtime = 0;
          for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
              for (var k = 0; k < 9; k++) {
                numbiaoji[i][j][k] = 0;
              }
            }
          }
          for (var line = 1; line < 10; line++) {
            for (var up = 1; up < 10; up++) {
              var txt = 'txtstyle' + line + up;
              var boxstyle = 'style' + line + up;
              var boxname = 'text' + line + up;
              var otherstyle='otherstyle'+line+up;
              if(numstatic[line-1][up-1]==1){
                num[line - 1][up - 1]=0;
              }
              if (num[line - 1][up - 1] != 0) {
                that.setData({
                  [boxname]: num[line - 1][up - 1]
                })
              }else{
                that.setData({
                  [boxname]: ''
                })
              }
              that.setData({
                [txt]: '',
                [boxstyle]: 'background-color:#F2F2F2',
                [otherstyle]:''
              })
            }
          }
        }
      }
    })
  },

  //new game
  newgame:function(){
    if(differ<10){
      differ=10;
    }
    if(differ>60){}
    var that = this;
    wx.showModal({
      title: '开始新局',
      content: '确认开始新局？本局难度设定为：'+differ.toString()+' (10-60)',
      success: function (res) {
        if (res.confirm) {
          restart(that);
        }
      }
    })

    function restart(that){
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        num[i][j] = 0;
      }
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        numstatic[i][j] = 0;
      }
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        for (var k = 0; k < 9; k++) {
          numbiaoji[i][j][k] = 0;
        }
      }
    }
     lastidx = 0;
     lastidy = 0;
     usetime = 0;
     nowtime = 0;
     isbiaoji = 0;
     lastsiu='';
    try {
      var numline = ran3_3();
      var changenum = [0, 3, 6, 1, 4, 7, 2, 5, 8];
      for (var line = 0; line < 9; line++) {
        for (var up = 0; up < 9; up++) {
          num[line][up] = numline[tnine(up, changenum[line])];
        }
      }

      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          numstatic[i][j] = 0;
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

      var blocknum = block();
      for (var m = 0; m < differ; m++) {
        num[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 0;
        numstatic[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 1;
      }

      for (var line = 1; line < 10; line++) {
        for (var up = 1; up < 10; up++) {
          var boxname = 'text' + line + up;
          var txt='txtstyle'+line+up;
          var otherstyle='otherstyle'+line+up;
          var boxstyle='style'+line+up;
          if(num[line-1][up-1]!=0){
            that.setData({
              [boxname]: num[line - 1][up - 1]
            })
          }else{
            that.setData({
              [boxname]: ''
            })
          }
          that.setData({
            [txt]:'',
            [boxstyle]:'background-color:#F2F2F2',
            [otherstyle]:''
          })
        }
      }
      isbiaoji = 0;
      that.setData({
        biaojistyle: ''
      })
    } finally {

    }
    }

    function tnine(num, line) {
      var outnum = 0;
      if (num - line < 0) {
        outnum = num - line + 9;
      } else {
        outnum = num - line;
      }
      return outnum;
    }

    function block() {
      var outnum = new Array(81);
      var totalnum = new Array(81);
      for (var m = 0; m < 81; m++) {
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
      var outnum = new Array(9);
      var totalnum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (var i = 0; i < 9; i++) {
        var ran = Math.floor(Math.random() * (9 - i));
        outnum[i] = totalnum[ran];
        for (var j = ran; j < 8 - i; j++) {
          totalnum[j] = totalnum[j + 1];
        }
      }
      return outnum;
    }
  },

  test:function(){
    this.setData({
      test123:'background-color:#123456;color:#F0F0F0;'
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
      
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          numstatic[i][j] = 0;
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
      for(var m=0;m<differ;m++){
        num[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]=0;
        numstatic[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]=1;
      }

      for (var line = 1; line < 10; line++) {
        for (var up = 1; up < 10; up++) {
          var boxname = 'text' + line + up;
          if (num[line - 1][up - 1] != 0) {
            this.setData({
              [boxname]: num[line - 1][up - 1]
            })
          }
        }
      }
      var that=this;
      Countdown(that);
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

function formatTime(seconds) {
  return [
    parseInt(seconds / 60 % 60), // 分
    parseInt(seconds % 60)       // 秒
  ]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}

function Countdown(that) {
  // 渲染倒计时时钟

  timer = setTimeout(function () {
    nowtime=nowtime+1;
    that.setData({
      time:formatTime(nowtime)
    });
    Countdown(that);
  }, 1000)
}