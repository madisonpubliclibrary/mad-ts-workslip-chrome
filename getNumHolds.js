(function() {
  'use strict';
  const holdsNotice = document.querySelector(".dialogue.alert b");
  const loginError = document.getElementById('login_error');
  const linkCopies = document.querySelector('#tabs-holdings tbody');

  if (loginError !== null) {
    return 'holdsError';
  } else if (document.body.textContent.includes('Cannot find biblionumber')) {
    return {
      "holds": 'No bib in Koha',
      "linkCopies": 0
    };
  } else if (holdsNotice) {
    return {
      "holds": /\d+/.exec(holdsNotice.textContent.match(/There are a total of \d+ holds/)[0])[0],
      "linkCopies": linkCopies.children.length - 1
    };
  } else {
    return {
      "holds": 0,
      "linkCopies": linkCopies.children.length - 1
    };
  }
})();
