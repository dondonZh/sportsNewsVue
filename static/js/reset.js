/**
 * Created by wangyiqiang on 2016/11/22.
 */
// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';//  320/20=16rem
//         };
//
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

var windowWidth, rem;
$(function () {
  reset();

  windowWidth = $(window).width();
  rem = windowWidth / 20;
  $(window).bind("resize", function (e) {

    if (windowWidth != $(window).width()) {
      windowWidth = $(window).width();
      rem = windowWidth / 20;
      reset();
    }
  });
});

var reset = function () {
  var Dpr = 1, uAgent = window.navigator.userAgent;
  var isIOS = uAgent.match(/iphone/i);
  var isYIXIN = uAgent.match(/yixin/i);
  var is2345 = uAgent.match(/Mb2345/i);
  var ishaosou = uAgent.match(/mso_app/i);
  var isSogou = uAgent.match(/sogoumobilebrowser/ig);
  var isLiebao = uAgent.match(/liebaofast/i);
  var isGnbr = uAgent.match(/GNBR/i);
  var isWeixin = uAgent.toLowerCase().indexOf('micromessenger') != -1;

  function resizeRoot() {
    var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth,
      wDpr, wFsize;
    var wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
    if (window.devicePixelRatio) {
      wDpr = window.devicePixelRatio;
    } else {
      wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    }
    if (isIOS) {
      wWidth = screen.width;
      wHeight = screen.height;
    }
    if (wWidth > wHeight) {
      wWidth = wHeight;
    }
    wFsize = wWidth > 800 ? 40 : wWidth / 20;
    window.screenWidth_ = wWidth;
    //YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
    if (isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr) {
      setTimeout(function () {
        wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth;
        wHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight;
        wFsize = wWidth > 800 ? 40 : wWidth / 20;
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        //document.getElementById("fixed").style.display="none";
      }, 500);
    } else {
      document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
      //document.getElementById("fixed").style.display="none";
    }

    //适配 部分安卓手机        部分安卓手机 body高度为0
    if ($("body").height() * 2 < wHeight) {
      $("body").height(wHeight);
    }
    return {"sysWidth": wWidth, "sysHeight": wHeight};
  }

  var hw = resizeRoot();
  window.pageHW = hw;


};
