(function() {
  'use strict';
  let loginError = document.getElementById('login_error');

  if (loginError !== null) {
    return 'marcError';
  } else {
    const marcData = {};

    const marc092a = document.querySelector('.f092 .sf-a .sf-value');
    const marc092b = document.querySelector('.f092 .sf-b .sf-value');
    const marc099a = document.querySelector('.f099 .sf-a .sf-value');

    const marc300a = document.querySelector('.f300 .sf-a .sf-value');
    const marc300b = document.querySelector('.f300 .sf-b .sf-value');
    const marc300c = document.querySelector('.f300 .sf-c .sf-value');
    const marc300e = document.querySelector('.f300 .sf-e .sf-value');

    const bibDescriptionArr = [];
    const titleSubfields = [];
    const titleArr = [];
    const isbnArr = [];

    if (marc092a) {
      marcData['092'] = marc092a.value;

      if (marc092b) marcData['092'] += ' ' + marc092b.value;
    } else if (marc092b) {
      marcData['092'] = marc092b.value;
    }

    if (marc099a) marcData['099a'] = marc099a.value;

    if (marc300a && marc300a.value !== '') {
      bibDescriptionArr.push(marc300a.value);
      // Try to get number of pages
      let pagesNum = marc300a.value.match(/\d+ pages/);
      if (pagesNum) {
        if (pagesNum.length > 0) pagesNum = pagesNum[0].match(/\d+/);
        if (pagesNum.length > 0) marcData.numPages = parseInt(pagesNum[0]);
      }
    }
    if (marc300b && marc300b.value !== '') bibDescriptionArr.push(marc300b.value);
    if (marc300c && marc300c.value !== '') bibDescriptionArr.push(marc300c.value);
    if (marc300e && marc300e.value !== '') bibDescriptionArr.push(marc300e.value);

    if (bibDescriptionArr.length > 0) marcData['300'] = bibDescriptionArr.join(' ');

    const marc245a = document.querySelector('.f245 .sf-a .sf-value');
    const marc245h = document.querySelector('.f245 .sf-h .sf-value');
    const marc245b = document.querySelector('.f245 .sf-b .sf-value');
    const marc245n = document.querySelector('.f245 .sf-n .sf-value');
    const marc245p = document.querySelector('.f245 .sf-p .sf-value');

    if (marc245a && marc245a.value.trim() !== '') {
      titleSubfields.push('a');
      titleArr.push(marc245a.value);
    }
    if (marc245h && marc245h.value.trim() !== '') {
      titleSubfields.push('h');
      titleArr.push(marc245h.value);
    }
    if (marc245b && marc245b.value.trim() !== '') {
      titleSubfields.push('b');
      titleArr.push(marc245b.value);
    }
    if (marc245n && marc245n.value.trim() !== '') {
      titleSubfields.push('n');
      titleArr.push(marc245n.value);
    }
    if (marc245p && marc245p.value.trim() !== '') {
      titleSubfields.push('p');
      titleArr.push(marc245p.value);
    }

    const marc100a = document.querySelector('.f100 .sf-a .sf-value');
    const marc700a = document.querySelector('.f700 .sf-a .sf-value');

    if (marc100a && marc100a.value.length > 0 && marc700a && marc700a.value.length > 0) {
      marcData['100+700title'] = 'MARC 100/700:';
      marcData['100+700'] = marc100a.value + '; ' + marc700a.value;
    } else if (marc100a && marc100a.value.length > 0) {
      marcData['100+700title'] = 'MARC 100:';
      marcData['100+700'] = marc100a.value;
    } else if (marc700a && marc700a.value.length > 0) {
      marcData['100+700title'] = 'MARC 700:';
      marcData['100+700'] = marc700a.value;
    }

    marcData['245'] = titleArr.join(' ');
    marcData['245fields'] = titleSubfields.join(',');

    for (let isbnElt of document.querySelectorAll('.f020 .sf-a .sf-value')) {
      if (isbnElt.value != '') isbnArr.push(isbnElt.value);
    }

    if (isbnArr.length > 0) marcData['020'] = isbnArr.map(x => x.match(/^\d+/)[0]);

    return marcData;
  }
})();
