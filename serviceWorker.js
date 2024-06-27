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
    chrome.scripting.executeScript({
      "target": {"tabId": tab.id, "allFrames": true},
      "files": ["copiesListener.js"]
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({'currentWindow': true, 'active': true}).then(tabs => {
    if (request.key === 'printWorkslip') {
      printWorkslip(tabs[0]);
    } else if (request.key === 'listenForCopies') {
      chrome.scripting.executeScript({
        "target": {"tabId": tabs[0].id, "allFrames": true},
        "files": ["copiesListener.js"]
      });
    }
  });
});

function printWorkslip(tab) {
  chrome.scripting.executeScript({
    "target": {"tabId": tab.id},
    "files": ["scrapeGetIt.js"]
  }).then(resultArr => {
    if (resultArr.length > 0) {
      let data = resultArr[0].result;

      let getHolds = new Promise((resolve, reject) => {
        if (data.bibRecId.length > 0) {
          chrome.tabs.create({
            "url": "https://mad.scls.bibliovation.com/app/staff/bib/"
                    + data.bibRecId + "/details",
            "active": true
          }).then(holdsTab => {
            chrome.scripting.executeScript({
              "target": {"tabId": holdsTab.id},
              "files": ["getNumHolds.js"]
            }).then(injectionResults => {
              chrome.tabs.remove(holdsTab.id);
              resolve(injectionResults[0].result);
            });
          });
        } else {
          reject('Biblio ID empty in GetIT')
        }
      });

      let getMARCData = new Promise((resolve, reject) => {
        if (data.bibRecId.length > 0) {
          chrome.tabs.create({
            "url": "https://mad.scls.bibliovation.com/app/staff/marced/edit/"
                    + data.bibRecId,
            "active": true
          }).then(marcTab => {
            chrome.scripting.executeScript({
              "target": {"tabId": marcTab.id},
              "files": ["getMARCData.js"]
            }).then(injectionResults => {
              chrome.tabs.remove(marcTab.id);
              resolve(injectionResults[0].result);
            });
          });
        } else {
          reject('Biblio ID empty in GetIT')
        }
      });

      Promise.all([getHolds, getMARCData]).then(res => {
        data.holds = res[0].holds;
        data.linkCopies = res[0].linkCopies;
        data.isNewADFIC = res[0].isNewADFIC;
        data.marcData = res[1];

        chrome.tabs.create({
          "url": chrome.runtime.getURL("workslip.html")
        }).then(tab => {
          setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, data).then(() => {
              chrome.tabs.remove(tab.id);
            });
          }, 250);
        });
      });
    }
  });
}