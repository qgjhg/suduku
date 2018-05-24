// pages/mainpage/mainpage.js
var numnow=0;
var lastidx=0;
var lastidy=0;
var lastsiu='';
var usetime=0;
var nowtime=0;
var isbiaoji=0;
var differ=45;
var timer;
var num = new Array();
for (var i = 0; i < 9; i++) {
  num[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    num[i][j] = 0;
  }
}
var numstatic = new Array(); //1= no static ; 0= static
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
var numbelong = new Array(); //1= no static ; 0= static
for (var i = 0; i < 9; i++) {
  numbelong[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    numbelong[i][j] =parseInt(i/3)*3+parseInt(j/3);
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
    var id = e.currentTarget.id;
    var idx = parseInt(id.substr(3, 1));
    var idy = parseInt(id.substr(4, 1));
    var param = {};
    if (lastsiu == 'shizi') {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if (i == lastidx || j == lastidy) {
            param[color] = 'background-color:#F2F2F2;';
          }
        }
      }
    } else if (lastsiu == 'dianwei') {
      for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
          var color = 'style' + i.toString() + j.toString();
          if ((num[i - 1][j - 1] == numnow) || (lastidx == i && lastidy == j)) {
            param[color] = 'background-color:#F2F2F2;';
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
            param[color] = 'background-color:#E0FFFF;';
          } else if (i == idx && j == idy) {
            param[color] = 'background-color:#BFEFFF;';
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
            param[color] = 'background-color:#FFD1A4;';
          } else if (i == idx && j == idy) {
            param[color] = 'background-color:#FF8000;';
          }
        }
      }
      lastsiu = 'dianwei';
      lastidx = idx;
      lastidy = idy;
    }
    this.setData(param);
  },

  //enter number
  putnum: function (e) {
    var param = {};
    if (lastidx > 0 && lastidy > 0) {
      var btnid = e.currentTarget.id;
      var btnnum = parseInt(btnid.substr(3, 1));
      if (isbiaoji == 0) {
        var changebox = 'text' + lastidx + lastidy;
        var changestyle = 'otherstyle' + lastidx + lastidy;
        var textstyle = 'txtstyle' + lastidx + lastidy;
        if (checkenternum(btnnum, num, lastidx - 1, lastidy - 1)) {
          if (numstatic[lastidx - 1][lastidy - 1] == 1) {
            num[lastidx - 1][lastidy - 1] = btnnum;
            param[changebox] = num[lastidx - 1][lastidy - 1];
            param[changestyle] = 'color:#009393;line-height:70rpx;';
            param[textstyle] = '';
          }
        }
      } else if (isbiaoji == 1) {
        var changebox = 'text' + lastidx + lastidy;
        var changestyle = 'otherstyle' + lastidx + lastidy;
        var textstyle = 'txtstyle' + lastidx + lastidy;
        if (numstatic[lastidx - 1][lastidy - 1] == 1) {
          num[lastidx - 1][lastidy - 1] = 0;
          var outnum = '';
          if (numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] == btnnum) {
            numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] = 0;
          } else {
            if (checkenternum(btnnum, num, lastidx - 1, lastidy - 1)) {
              numbiaoji[lastidx - 1][lastidy - 1][btnnum - 1] = btnnum;
            }
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
          param[changebox] = outnum;
          param[changestyle] = 'color:#009393; line-height:18rpx;';
          param[textstyle] = 'font-size:55%';
        }
      }
      var btnnumindex = 0;
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (num[i][j] == btnnum) {
            btnnumindex = btnnumindex + 1;
            if (btnnumindex >= 9) {
              var btnstyle = 'btnstyle' + btnnum;
              param[btnstyle] = 'background-color:#FFFFFF'
            }
          }
        }
      }
    }
    this.setData(param);
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
      clearTimeout(timer);
      wx.showModal({
        title: '恭喜！',
        content: '数独完成，耗时'+formatTime(nowtime),
        showCancel:false,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    }else{
      wx.showModal({
        title: '做错啦！',
        content: '再检查下，'+exstr,
        showCancel:false
      })
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
  newgame: function () {
    if (differ < 10) {
      differ = 10;
    }
    if (differ > 60) {
      differ=60;
     }
    var that = this;
    wx.showModal({
      title: '开始新局',
      content: '确认开始新局？本局难度设定为：' + differ.toString() + ' (10-60)',
      success: function (res) {
        if (res.confirm) {
          var onlyans=0;
            restart(that);
            var outnumindex=createbrock();
            onlyans=answer();
            num=outnumindex;
          show(that);
        }
      }
    })
  },

  answerbtn:function(){
    var result= answer();
    console.log(result);
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
    var that=this;
    restart(that);
    var outnumindex = createbrock();
    num=outnumindex;
    show(that);
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

//create suduku
function restart(that) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      num[i][j] = 0;
    }
  }
  lastidx = 0;
  lastidy = 0;
  usetime = 0;
  nowtime = 0;
  isbiaoji = 0;
  lastsiu = '';
  try {
    clearTimeout(timer);
    var numline = ran3_3();
    var changenum = [0, 3, 6, 1, 4, 7, 2, 5, 8];
    var setran = parseInt(Math.random() * 2)
    if (setran == 0) {
      for (var line = 0; line < 9; line++) {
        for (var up = 0; up < 9; up++) {
          num[line][up] = numline[tnine(up, changenum[line])];
        }
      }
    } else {
      for (var line = 0; line < 9; line++) {
        for (var up = 0; up < 9; up++) {
          num[up][line] = numline[tnine(up, changenum[line])];
        }
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

  } finally {

  }
}

function createbrock(){
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
  var outnumindex=num;
  for (var index = 1; index < 10; index++) {
    var blocknum = block();
    var boxnum = 0;
    for (var m = 0; m < 81; m++) {
      if (index == outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] && boxnum < 3) {
        outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 0;
        numstatic[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 1;
        boxnum++;
      }
      if (boxnum > 2) {
        break;
      }
    }
  }
  var blocknum = block();
  var otherboxnum = differ - 27;
  var numcount = [6,6,6,6,6,6,6,6,6,6];
  var isnumnone = 0;
  var nowboxnum = 0;
  for (var m = 0; m < 81; m++) {
    if (numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] > 0 && outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] != 0 && nowboxnum < otherboxnum) {
      if (isnumnone == 0) {
        numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] = numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] - 1;
        outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 0;
        numstatic[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 1;
        nowboxnum++;
      } else {
        if (numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] > 1) {
          numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] = numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] - 1;
          outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 0;
          numstatic[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)] = 1;
          nowboxnum++;
        }
      }
      if (numcount[outnumindex[parseInt(blocknum[m] / 9)][parseInt(blocknum[m] % 9)]] == 0) {
        isnumnone = 1;
      }
    }
  }
  return outnumindex;
}

function show(that){
  var param = {};
  for (var line = 1; line < 10; line++) {
    for (var up = 1; up < 10; up++) {
      var boxname = 'text' + line + up;
      var txt = 'txtstyle' + line + up;
      var otherstyle = 'otherstyle' + line + up;
      var boxstyle = 'style' + line + up;
      if (num[line - 1][up - 1] != 0) {
        param[boxname] = num[line - 1][up - 1];
      } else {
        param[boxname] = '';
      }
      param[txt] = '';
      param[boxstyle] = 'background-color:#F2F2F2';
      param[otherstyle] = '';
    }
  }
  isbiaoji = 0;
  param['biaojistyle'] = '';
  that.setData(param);
  Countdown(that);
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

//answer suduku
function answer(){
  var isonlyanswer=0;//1=onlyanswer,2=2answer.....
  var answernum=new Array();
  for (var i = 0; i < 9; i++) {
    answernum[i] = new Array(i);
    for (var j = 0; j < 9; j++) {
      if(numstatic==1){
      answernum[i][j] = 0;
      }else{
        answernum[i][j]=num[i][j];
      }
    }
  }
  console.log('start');
  var maxtimes=100000000000;
  var x=0;
  var y=0;
  var nowtimes=0;
  var lastx=-1;
  var lasty=-1;
  while (x < 9) {
    if (x < 0) {
      break;
    }
    if (numstatic[x][y] == 0) {
      y = y + 1;
      if (y >= 9) {
        y = 0; 
        x = x + 1;
      }
    } else {
      if (answernum[x][y] == 0) {
        lastx = x;
        lasty = y;
        answernum[x][y] = answernum[x][y] + 1;
      }
      if (checknum(answernum, x, y) == false) {
        if (answernum[x][y] < 9) {
          if (answernum[x][y] < 8) {
            lastx = x;
            lasty = y;
          }
          answernum[x][y] = answernum[x][y] + 1;
        } else {
          answernum[x][y] = 0;
          y = y - 1;
          if (y == -1) { y = 8; x = x - 1; }
          
          while (x >= 0 ? (numstatic[x][y] == 0 || answernum[x][y] >= 9) : x >= 0){
            if (numstatic[x][y] != 0) {
              answernum[x][y] = 0;
            }
            y = y - 1;
            if (y == -1) { y = 8; x = x - 1; }
          }
          if (x < 0) {
            break;
          } else {
            if (answernum[x][y] < 8) {
              lastx = x;
              lasty = y;
            }
            answernum[x][y] = answernum[x][y] + 1;
          }
        }
      } else {
        y = y + 1;
        if (y >= 9) {
          y = 0; x = x + 1;
        }
      }
    }
    nowtimes++;
    if (nowtimes > maxtimes) {
      break;
    }

    if (x >= 9) {
      isonlyanswer = isonlyanswer + 1;
      x = lastx;
      y = lasty;
      answernum[x][y] = answernum[x][y] + 1;
    }
  }

  return isonlyanswer;

}

//check number
function checknum(getnumbox,x,y){
  var returnvalue=true;
  for (var i = 0; i < 9; i++) {
    if (i != x && getnumbox[i][y] == getnumbox[x][y]) {
      returnvalue = false;
    }
  }
  for (var j = 0; j < 9; j++) {
    if (j != y && getnumbox[x][j] == getnumbox[x][y]) {
      returnvalue = false;
    }
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (numbelong[x][y] == numbelong[i][j]) {
        if ((!(i == x && j == y)) && getnumbox[i][j] == getnumbox[x][y]) {
          returnvalue = false;
        }
      }
    }
  }
  return returnvalue;
}

//check line
function linecheck(checkline) {
  var returnvalue = true;
  for (var up = 0; up < 8; up++) {
    for (var i = up + 1; i < 9; i++) {
      if (num[checkline][up] == num[checkline][i]) {
        returnvalue = false;
      }
    }
  }
  return returnvalue;
}

//check up
function upcheck(checkup) {
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

//check box
function boxcheck(checkbox) {
  var exx = parseInt(checkbox % 3) * 3;
  var exy = parseInt(checkbox / 3) * 3;
  var returnvalue = true;
  for (var i = 0; i < 8; i++) {
    for (var j = i + 1; j < 9; j++) {
      var nix = parseInt(i % 3);
      var niy = parseInt(i / 3);
      var njx = parseInt(j % 3);
      var njy = parseInt(j / 3);
      if (num[exx + nix][exy + niy] == num[exx + njx][exy + njy]) {
        returnvalue = false;
      }
    }
  }
  return returnvalue;
}

//check enter num
function checkenternum(enternum, num, x, y) {
  var returnvalue = true;
  for (var i = 0; i < 9; i++) {
    if (i != x && num[i][y] == enternum) {
      returnvalue = false;
    }
  }
  for (var j = 0; j < 9; j++) {
    if (j != y && num[x][j] == enternum) {
      returnvalue = false;
    }
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (numbelong[x][y] == numbelong[i][j]) {
        if ((!(i == x && j == y)) && num[i][j] == enternum) {
          returnvalue = false;
        }
      }
    }
  }
  return returnvalue;
}