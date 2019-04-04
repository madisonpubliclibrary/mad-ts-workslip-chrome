(function() {
  'use strict';
  let holdsNotice = document.querySelector(".dialogue.alert b");
  let loginError = document.getElementById('login_error');

  if (loginError !== null) {
    return 'holdsError';
  } else if (holdsNotice) {
    return /\d+/.exec(holdsNotice.textContent.match(/There are a total of \d+ holds/)[0])[0];
  } else {
    return 0;
  }
})();
