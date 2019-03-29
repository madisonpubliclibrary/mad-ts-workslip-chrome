chrome.contextMenus.create({
  "id": "print-workslip",
  "title": "Print MAD-TS Workslip",
  "contexts": ["all"],
  "visible": true
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "print-workslip") {
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
                setTimeout(() => {
                  chrome.tabs.executeScript(holdsTab.id, {
                    "file": "getNumHolds.js"
                  }, holdsArr => {
                    chrome.tabs.remove(holdsTab.id);
                    resolve(holdsArr[0]);
                  });
                }, 5000);
            });
          } else {
          resolve('');
          }
        });

        getHolds.then(res => {
          data.holds = res;

          chrome.tabs.create({
            "url": chrome.runtime.getURL("workslip.html")
          }, function(tab) {
            setTimeout(function() {
              chrome.tabs.sendMessage(tab.id, data);
            }, 50);
          });
        });
      }
    });
  }
});
