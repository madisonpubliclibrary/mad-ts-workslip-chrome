(function() {
  'use strict';
  let holdsNotice = document.querySelector(".dialogue.alert b");

  if (holdsNotice) {
    return /\d+/.exec(holdsNotice.textContent.match(/There are a total of \d+ holds/)[0])[0];
  } else {
    return 0;
  }
})();
