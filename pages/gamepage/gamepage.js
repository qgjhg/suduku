var level = 0;
var numnow = 0;
var lastidx = 0;
var lastidy = 0;
var lastsiu = '';
var usetime = 0;
var nowtime = 0;
var isbiaoji = 0;
var differ = 45;
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
  numbiaoji[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    numbiaoji[i][j] = new Array(i, j)
    for (var k = 0; k < 9; k++) {
      numbiaoji[i][j][k] = 0;
    }
  }
}
var numbelong = new Array(); //1= no static ; 0= static
for (var i = 0; i < 9; i++) {
  numbelong[i] = new Array(i);
  for (var j = 0; j < 9; j++) {
    numbelong[i][j] = parseInt(i / 3) * 3 + parseInt(j / 3);
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '00:00'
  },

  //choosenumber
  chooseTap: function chooseBox(e) {
    var id = e.currentTarget.id;
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
          if ((num[i - 1][j - 1] == numnow) || (lastidx == i && lastidy == j)) {
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
          num[lastidx - 1][lastidy - 1] = 0;
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
  donegame: function () {
    var exstr = '错误信息：'
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
    if (isendgame) {
      for (var i = 0; i < 9; i++) {
        if (!boxcheck(i)) {
          isendgame = false;
          var pos = ['左上', '中上', '右上', '左中', '正中', '右中', '左下', '中下', '右下'];
          exstr = exstr + pos[i] + '方块';
          break;
        }
      }
    }

    if (isendgame == true) {
      clearTimeout(timer);
      wx.showModal({
        title: '恭喜！',
        content: '数独完成，耗时' + formatTime(nowtime),
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    } else {
      wx.showModal({
        title: '做错啦！',
        content: '再检查下，' + exstr,
        showCancel: false
      })
    }
  },

  //pause
  pause: function () {
    var that = this;
    clearTimeout(timer);
    wx.showModal({
      title: '',
      content: '继续请按确定',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          Countdown(that)
        }
      }
    })
  },

  //biaoji
  biaoji: function () {
    if (isbiaoji) {
      isbiaoji = 0;
      this.setData({
        biaojistyle: ''
      })
    } else {
      isbiaoji = 1;
      this.setData({
        biaojistyle: 'background-color:#FFD1A4'
      })
    }
  },

  chongkai: function () {
    var that = this;
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
              var otherstyle = 'otherstyle' + line + up;
              if (numstatic[line - 1][up - 1] == 1) {
                num[line - 1][up - 1] = 0;
              }
              if (num[line - 1][up - 1] != 0) {
                that.setData({
                  [boxname]: num[line - 1][up - 1]
                })
              } else {
                that.setData({
                  [boxname]: ''
                })
              }
              that.setData({
                [txt]: '',
                [boxstyle]: 'background-color:#F2F2F2',
                [otherstyle]: ''
              })
            }
          }
        }
      }
    })
  },

  answerbtn: function () {
    var result = answer();
    console.log(result);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    level = parseInt(options.title);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    //creat sudu
    clearTimeout(timer);
    nowtime=0;
    var that = this;
    if(level==0){

    }else{
      if (level == 1) {
        num = [[7, 5, 0, 9, 0, 6, 0, 0, 1], [0, 0, 0, 0, 7, 0, 3, 5, 0], [0, 0, 0, 0, 8, 0, 0, 0, 0], [0, 7, 0, 3, 0, 0, 0, 0, 6], [0, 0, 3, 0, 1, 0, 9, 0, 0], [1, 0, 0, 0, 0, 2, 0, 8, 0], [0, 0, 0, 0, 6, 0, 0, 0, 0], [0, 8, 9, 0, 2, 0, 0, 0, 0], [2, 0, 0, 4, 0, 9, 0, 1, 7]];
      } else if (level == 2) {
        num = [[0, 0, 0, 0, 5, 0, 0, 0, 0], [0, 9, 2, 0, 0, 6, 0, 0, 0], [8, 3, 5, 0, 7, 0, 0, 4, 0], [4, 0, 1, 0, 0, 9, 0, 3, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 2, 0, 1, 0, 0, 9, 0, 4], [0, 8, 0, 0, 9, 0, 2, 5, 7], [0, 0, 0, 2, 0, 0, 3, 6, 0], [0, 0, 0, 0, 8, 0, 0, 0, 0]]
      } else if (level == 3) {
        num = [[7,0,0,0,5,6,0,0,1],[0,2,0,0,0,0,0,0,0],[0,0,0,4,0,9,2,0,6],[0,0,5,3,0,0,0,8,0],[1,0,0,6,0,4,0,0,3],[0,8,0,0,0,5,9,0,0],[3,0,8,7,0,1,0,0,0],[0,0,0,0,0,0,0,4,0],[6,0,0,5,4,0,0,0,8]]
      } else if (level == 4) {
        num = [[0,2,5,0,0,0,4,0,0],[6,0,4,0,0,1,0,0,3],[0,0,0,4,0,5,6,0,0],[0,7,0,1,0,0,0,3,0],[0,0,3,0,0,0,2,0,0],[0,9,0,0,0,4,0,5,0],[0,0,9,6,0,3,0,0,0],[3,0,0,2,0,0,7,0,6],[0,0,8,0,0,0,3,9,0]]
      } else if (level == 5) {
        num = [[2,5,0,9,0,8,0,0,0], [0,0,0,0,1,0,0,0,0], [8,0,4,0,0,0,0,0,0], [3,1,0,4,6,0,9,0,0], [0,0,5,2,0,3,4,0,0], [0,0,7,0,9,1,0,2,3], [0,0,0,0,0,0,6,0,7], [0,0,0,0,4,0,0,0,0], [0,0,0,1,0,7,0,5,4]]
      } else if (level == 6) {
        num = [[0,0,0,0,0,1,0,8,4], [0,5,1,0,2,0,7,0,0], [8,0,0,0,0,0,0,3,0], [0,0,0,0,1,8,0,0,0], [4,6,2,0,0,0,8,5,1], [0,0,0,2,4,0,0,0,0], [0,1,0,0,0,0,0,0,9], [0,0,8,0,7,0,3,1,0], [7,4,0,1,0,0,0,0,0]]
      }
    }
    for(var i=0;i<9;i++){
      for(j=0;j<9;j++){
        if(num[i,j]!=0){
          numstatic[i][j]=1;
        }
      }
    }

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        for (var k = 0; k < 9; k++) {
          numbiaoji[i][j][k] = 0;
        }
      }
    }

    show(that);
  },

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
    nowtime = nowtime + 1;
    that.setData({
      time: formatTime(nowtime)
    });
    Countdown(that);
  }, 1000)
}

function show(that) {
  for (var line = 1; line < 10; line++) {
    for (var up = 1; up < 10; up++) {
      var boxname = 'text' + line + up;
      var txt = 'txtstyle' + line + up;
      var otherstyle = 'otherstyle' + line + up;
      var boxstyle = 'style' + line + up;
      if (num[line - 1][up - 1] != 0) {
        that.setData({
          [boxname]: num[line - 1][up - 1]
        })
      } else {
        that.setData({
          [boxname]: ''
        })
      }
      that.setData({
        [txt]: '',
        [boxstyle]: 'background-color:#F2F2F2',
        [otherstyle]: ''
      })
    }
  }
  isbiaoji = 0;
  that.setData({
    biaojistyle: ''
  })
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
function answer() {
  var isonlyanswer = 0;//1=onlyanswer,2=2answer.....
  var answernum = new Array();
  for (var i = 0; i < 9; i++) {
    answernum[i] = new Array(i);
    for (var j = 0; j < 9; j++) {
      if (numstatic == 1) {
        answernum[i][j] = 0;
      } else {
        answernum[i][j] = num[i][j];
      }
    }
  }
  console.log('start');
  var maxtimes = 100000000000;
  var x = 0;
  var y = 0;
  var nowtimes = 0;
  var lastx = -1;
  var lasty = -1;
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

          while (x >= 0 ? (numstatic[x][y] == 0 || answernum[x][y] >= 9) : x >= 0) {
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
function checknum(getnumbox, x, y) {
  var returnvalue = true;
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