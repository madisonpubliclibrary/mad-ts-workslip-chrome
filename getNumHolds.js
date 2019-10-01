(function() {
  'use strict';
  const holdsData = document.getElementsByClassName('holds-data')
  const loginError = document.getElementById('login_error');

  if (loginError !== null  || !holdsData) {
    return 'holdsError';
  } else {
    return {
      "holds": /\d+ total/.exec(holdsData[0].textContent)[0].split(' ')[0],
      "linkCopies": holdsData[0].textContent.match(/\d+ item/)[0].split(' ')[0]
    };
  }
})();
