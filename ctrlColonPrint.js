(function(){
  'use strict';
  document.addEventListener("keydown", function (e) {
    if (e.key === ';' && (navigator.userAgent.match("Mac OS X") ? e.metaKey : e.ctrlKey)) {
      chrome.runtime.sendMessage({"key": "printWorkslip"});
    } else if (e.key === '.' && (navigator.userAgent.match("Mac OS X") ? e.metaKey : e.ctrlKey)) {
      chrome.runtime.sendMessage({"key":"listenForCopies"});
    }
  }, false);
})();
