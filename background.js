chrome.contextMenus.create({
  "id": "print-workslip",
  "title": "Print MAD-TS Workslip",
  "documentUrlPatterns": [
    "https://scls-mad-staff.kohalibrary.com/cgi-bin/koha/acqui/getit.pl",
    "https://scls-mad-staff.kohalibrary.com/getit/public/index.html"],
  "contexts": ["all"],
  "visible": true
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "print-workslip") {
    printWorkslip(tab);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.key === 'printWorkslip') {
    chrome.tabs.query({'currentWindow': true, 'active': true}, tabs => {
      printWorkslip(tabs[0]);
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
            "url": "https://scls-staff.kohalibrary.com/cgi-bin/koha/catalogue/detail.pl?biblionumber=" + data.bibRecId,
            "active": false
          }, function(holdsTab) {
            chrome.tabs.executeScript(holdsTab.id, {
              "file": "getNumHolds.js"
            }, holdsArr => {
              chrome.tabs.remove(holdsTab.id);

              if (holdsArr[0] === 'holdsError') {
                reject('Unable to find item holds data; not logged into Koha.');
              } else {
                resolve(holdsArr[0]);
              }
            });
          });
        } else {
          resolve('');
        }
      });

      let getMARCData = new Promise(function(resolve, reject) {
        if (data.bibRecId.length > 0) {
          chrome.tabs.create({
            "url": "https://scls-staff.kohalibrary.com/cgi-bin/koha/cataloguing/addbiblio.pl?biblionumber=" + data.bibRecId,
            "active": false
          }, function(marcTab) {
            chrome.tabs.executeScript(marcTab.id, {
              "file": "getMARCData.js"
            }, marcArr => {
              chrome.tabs.remove(marcTab.id);

              if (marcArr[0] === 'marcError') {
                reject('Unable to find MARC data; not logged into Koha.');
              } else {
                resolve(marcArr[0]);
              }
            });
          });
        } else {
          resolve('');
        }
      });

      Promise.all([getHolds, getMARCData]).then(res => {
        data.holds = res[0];
        data.marcData = res[1];

        chrome.tabs.create({
          "url": chrome.runtime.getURL("workslip.html")
        }, function(tab) {
          setTimeout(function() {
            chrome.tabs.sendMessage(tab.id, data, () => {
              chrome.tabs.remove(tab.id);
            });
          }, 250);
        });
      }, reject => {
        chrome.tabs.create({
          "url": "https://scls-staff.kohalibrary.com",
          "active": true
        });
      });
    }
  });
}
