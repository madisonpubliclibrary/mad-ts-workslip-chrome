(function() {
  'use strict';
  window.bibCopies = [];
  let contentDoc = document.getElementById('staff-iframe');

  if (contentDoc) {
    contentDoc = contentDoc.contentWindow.document.getElementById('frame').contentWindow.document;

    window.bibCopies = [];

    let header = contentDoc.querySelectorAll('#polc-index .ui-grid-header');

    if (header.length > 1) {
      header = header[1].textContent.split(/\s+/);
      const locationIdx = header.indexOf("Location");
      const statusIdx = header.indexOf("Status");
      const notesIdx = header.indexOf("Notes");

      function simpleHash(str) {
        let hash = 0;
        if (str.length == 0) {
          return hash;
        }
        for (let i = 0; i < str.length; i++) {
          var char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      }

      function getCopies() {
        let rows = contentDoc.querySelectorAll('#polc-index div[ui-grid-row="row"]');
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].textContent !== '') {
            let addToCopies = true;
            for (let item of window.bibCopies) {
              if (item.hash === simpleHash(rows[i].textContent)) {
                addToCopies = false;
                break;
              }
            }

            if (addToCopies) window.bibCopies.push({
              "loc": rows[i].children[locationIdx].textContent.trim(),
              "stat": rows[i].children[statusIdx].textContent.trim().substring(0, 3) + '\'d',
              "note": rows[i].children[notesIdx].textContent.trim(),
              "hash": simpleHash(rows[i].textContent)
            });
          }
        }
      }

      const targetNode = contentDoc.getElementById('polc-index');
      const config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      const observer = new MutationObserver(function(mutationsList, observer) {
        getCopies();
      });
      observer.observe(targetNode, config);

      getCopies();
    }
  }
})();
