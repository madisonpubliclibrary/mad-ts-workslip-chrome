(function(){
  'use strict';
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 186 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { // [CTRL] + [;]
      chrome.runtime.sendMessage({"key": "printWorkslip"});
    } else if (e.keyCode === 190 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) { // [CTRL] + [.]
      chrome.runtime.sendMessage({"key":"listenForCopies"});
    }
  }, false);
})();
