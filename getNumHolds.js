(function() {
  'use strict';

  return new Promise((resolve, reject) => {
    const holdsData = document.getElementsByClassName('holds-data');
    const loginError = document.getElementById('login_error');

    if (loginError !== null  || !holdsData) {
      reject('Unable to find item holds data; not logged into B\'vation.');
    } else {
      const waitForHolds = setInterval(() => {
        if (holdsData.length > 0 && /\d+ total/.exec(holdsData[0].textContent) != null
            && holdsData[0].textContent.match(/\d+ item/).length > 0) {
          const payload = {
            "holds": /\d+ total/.exec(holdsData[0].textContent)[0].split(' ')[0],
            "linkCopies": holdsData[0].textContent.match(/\d+ item/)[0].split(' ')[0]
          };
          clearInterval(waitForHolds);
          resolve(payload);
        }
      }, 400);
    }
  });
})();
