chrome.contextMenus.create({
  "id": "get-item-copies",
  "title": "Get Item Copies",
  "documentUrlPatterns": [
    "https://mad.scls.bibliovation.com/app/staff/acquisitions",
    "https://mad.scls.bibliovation.com/getit/app/static/partials/index-dev.html"],
  "contexts": ["all"],
  "visible": true
});

chrome.contextMenus.create({
  "id": "print-workslip",
  "title": "Print MAD-TS Workslip",
  "documentUrlPatterns": [
    "https://mad.scls.bibliovation.com/app/staff/acquisitions",
    "https://mad.scls.bibliovation.com/getit/app/static/partials/index-dev.html"],
  "contexts": ["all"],
  "visible": true
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "print-workslip") {
    printWorkslip(tab);
  } else if (info.menuItemId === "get-item-copies") {
    chrome.tabs.executeScript({
      "file": "copiesListener.js",
      "allFrames": true
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.key === 'printWorkslip') {
    chrome.tabs.query({'currentWindow': true, 'active': true}, tabs => {
      printWorkslip(tabs[0]);
    });
  } else if (request.key === 'listenForCopies') {
    chrome.tabs.executeScript({
      "file": "copiesListener.js",
      "allFrames": true
    });
  }
});

function printWorkslip(tab) {
  chrome.tabs.executeScript(tab.id, {
    "file": "scrapeGetIt.js"
  }, (resultArr) => {
    if (resultArr.length > 0) {
      let data = resultArr[0];

      let getHolds = new Promise(function(resolve, reject) {
        if (data.bibRecId.length > 0) {
          chrome.tabs.create({
            "url": "https://mad.scls.bibliovation.com/app/staff/bib/" + data.bibRecId + "/details",
            "active": true
          }, function(holdsTab) {
            let waitForHolds = setInterval(() => {
              chrome.tabs.executeScript(holdsTab.id, {
                "file": "getNumHolds.js"
              }, holdsArr => {
                if (holdsArr && holdsArr.length > 0 && holdsArr[0] !== null) {
                  if (holdsArr[0].hasOwnProperty('holds')) {
                    chrome.tabs.remove(holdsTab.id);
                    clearInterval(waitForHolds);
                    window.bibCopies = [];
                    resolve(holdsArr[0]);
                  } else if (holdsArr[0] === 'holdsError') {
                      reject('Unable to find item holds data; not logged into B\'vation.');
                  }
                }
              });
            }, 400);
          });
        } else {
          resolve('No bib in B\'vation');
        }
      });

      let getMARCData = new Promise(function(resolve, reject) {
        if (data.bibRecId.length > 0) {
          chrome.tabs.create({
            "url": "https://mad.scls.bibliovation.com/app/staff/marced/edit/" +
                    data.bibRecId,
            "active": true
          }, function(marcTab) {
            let marcTimeout = 50; // 50 * 400ms = 20sec
            let waitForMARC = setInterval(() => {
              marcTimeout--;
              if (marcTimeout === 0) {
                chrome.tabs.remove(marcTab.id);
                clearInterval(waitForMARC);
                resolve('');
              }
              chrome.tabs.executeScript(marcTab.id, {
                "file": "getMARCData.js"
              }, marcArr => {
                if (marcArr && marcArr.length > 0 && marcArr[0] !== null) {
                  if (marcArr[0].hasOwnProperty('001') && (marcArr[0].hasOwnProperty('092') || marcArr[0].hasOwnProperty('099a') || marcArr[0].hasOwnProperty('300'))) {
                    chrome.tabs.remove(marcTab.id);
                    clearInterval(waitForMARC);
                    resolve(marcArr[0]);
                  } else if (marcArr[0] === 'marcError') {
                    reject('Unable to find MARC data; not logged into B\'vation.');
                  }
                }
              });
            }, 400);
          });
        } else {
          resolve('No bib in B\'vation');
        }
      });

      Promise.all([getHolds, getMARCData]).then(res => {
        if (res[0] === 'No bib in B\'vation') {
          data.holds = res[0];
        } else {
          data.holds = res[0].holds;
          data.linkCopies = res[0].linkCopies;
          data.isNewADFIC = res[0].isNewADFIC;
          data.marcData = res[1];
        }

        chrome.tabs.create({
          "url": chrome.runtime.getURL("workslip.html")
        }, function(tab) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tab.id, data, () => {
              chrome.tabs.remove(tab.id);
            });
          }, 450);
        });
      }, reject => {
        chrome.tabs.create({
          "url": "https://mad.scls.bibliovation.com",
          "active": true
        });
      });
    }
  });
}
