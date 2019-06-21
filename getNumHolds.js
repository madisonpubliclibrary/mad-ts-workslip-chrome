(function() {
  'use strict';
  const holdsNotice = document.querySelector(".dialogue.alert b");
  const loginError = document.getElementById('login_error');
  const linkCopies = document.querySelector('#tabs-holdings tbody');

  const items = document.querySelector('#tabs-holdings tbody');

  const itemData = {'isNewADFIC': false};

  if (loginError !== null) {
    return 'holdsError';
  } else {
    // Determine if new adult fiction
    let libIdx;
    let locationIdx;
    let collectionIdx;

    for (let i = 0; i < items.children[0].children.length; i++) {
      if (items.children[0].children[i].textContent.trim() === 'Location') {
        locationIdx = i;
      } else if (items.children[0].children[i].textContent.trim() === 'Collection') {
        collectionIdx = i;
      } else if (items.children[0].children[i].textContent.trim() === 'Home Library') {
        libIdx = i;
      }
    }

    if (locationIdx != null && collectionIdx != null) {
      for (let item of items.children) {
        if (/^(HAW|HPB|LAK|MAD|MEA|MSB|PIN|SEQ|SMB)$/.test(item.children[libIdx].textContent.trim())) {
          if (/^NEW/.test(item.children[locationIdx].textContent.trim()) &&
              /^BOOKS AD FIC/.test(item.children[collectionIdx].textContent.trim())) {
            itemData.isNewADFIC = true;
            break;
          }
        }
      }
    }

    // Find holds and copies
    if (document.body.textContent.includes('Cannot find biblionumber')) {
      itemData.holds = 'No bib in Koha';
      itemdata.linkCopies = 0;
    } else if (holdsNotice) {
      itemData.holds = /\d+/.exec(holdsNotice.textContent.match(/There are a total of \d+ holds/)[0])[0];
      itemData.linkCopies = linkCopies.children.length - 1;
    } else {
      itemData.holds = 0;
      itemData.linkCopies = linkCopies.children.length - 1;
    }

    return itemData;
  }
})();
