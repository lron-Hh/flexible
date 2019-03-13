;(function (win, doc, undefined) {
  'use strict';
  var ua = win.navigator.userAgent.toLowerCase(),
    timer = null;

  var devicePras = {
    isAndroid: function () {
      return /android|adr/gi.test(ua) || false;
    },
    isIos: function () {
      return (/iphone|ipod|ipad/gi.test(ua) && !this.isAndroid()) || false;
    },
    scale: function () {
      if (this.isIos()) {
        return 1 / this.dpr();
      } else {
        return 1;
      }
    },
    dpr: function () {

      if (this.isIos()) {
        return Math.min(win.devicePixelRatio, 3);
      } else {
        return 1;
      }
    }
  };

  function setDpr(docEle) {
    docEle.dataset.dpr = devicePras.dpr();
  };

  function setFontSize() {
    var docEle = doc.documentElement,
      clientWidth = docEle.clientWidth;
    var dpr = devicePras.dpr();

    if (clientWidth < 320) {
      clientWidth = 320;
    }

    if (clientWidth > 750) {
      clientWidth = 750;
    }

    var fs = clientWidth / 10;
    if (fs) {
      var numObject = new Number(fs);
      docEle.style.fontSize = numObject.toFixed(2) + "px";
    } else {
      docEle.style.fontSize = "32px";
    }

  };

  function pageShowCallBack(e) {
    e = e || event;
    if (e.persisted) {
      timer && clearTimeout(timer);

      timer = setTimeout(setFontSize, 300);
    }
  };

  function winSizeChange() {
    win.onresize = function () {
      setFontSize();
    }
  }

  var init = function () {
    var docEle = doc.documentElement;
    setDpr(docEle);
    setFontSize();

    if (win.addEventListener) {
      win.addEventListener('pageshow', pageShowCallBack, false);
    } else {
      win.attachEvent('onpageshow', pageShowCallBack);
    }

    winSizeChange();
  };

  init();
})(window, document);