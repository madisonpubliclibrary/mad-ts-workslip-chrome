(function() {
  'use strict';
  let contentDoc = document.getElementById('staff-iframe');
  let data = {
    "dateToday": (new Date()).toLocaleDateString(),
    "rush": false
  };

  if (contentDoc) {
    contentDoc = contentDoc.contentWindow.document.getElementById('frame').contentWindow.document;

    let title = contentDoc.getElementById('pou-title');
    data.title = title ? title.value : '';
    let author = contentDoc.getElementById('pou-author');
    data.author = author ? author.value : '';
    let ean13 = contentDoc.getElementById('pou-EAN13');
    data.ean13 = ean13 ? ean13.value : '';
    let isbn = contentDoc.getElementById('pou-ISBN');
    // Check whether ISBN is 10 or 13 digits
    if (isbn && /^(?:978)?\d{10}$/.test(isbn.value.trim())) {
      data.isbn = isbn.value.trim();
      // Ignore final digit, then extract right 9 to compare with MARC ISBN
      let isbnMatchDigits = data.isbn.match(/^(?:978)?(\d{9})\d$/);
      data.isbnMatchDigits = isbnMatchDigits && isbnMatchDigits.length === 2
          ? isbnMatchDigits[1] : '';
    } else {
      data.isbn = '';
      data.isbnMatchDigits = '';
    }
    let issn = contentDoc.getElementById('pou-ISSN');
    data.issn = issn ? issn.value : '';
    let ismn = contentDoc.getElementById('pou-ISMN');
    data.ismn = ismn ? ismn.value : '';
    let upc = contentDoc.getElementById('pou-UPC');
    data.upc = upc ? upc.value : '';
    let manufactNum = contentDoc.getElementById('pou-manufacturer_number');
    data.manufactNum = manufactNum ? manufactNum.value : '';
    let supplierNum = contentDoc.getElementById('pou-supplier_number');
    data.supplierNum = supplierNum ? supplierNum.value : '';
    let publisher = contentDoc.getElementById('pou-publisher');
    data.publisher = publisher ? publisher.value : '';
    let listPrice = contentDoc.getElementById('pou-list_price');
    data.listPrice = listPrice ? listPrice.value : '';
    let discountedPrice = contentDoc.getElementById('pou-discounted_price');
    data.discountedPrice = discountedPrice ? discountedPrice.value : '';
    let datePub = contentDoc.getElementById('pou-date_of_publication');
    data.datePub = datePub ? datePub.value : '';
    let edition = contentDoc.getElementById('pou-edition');
    data.edition = edition ? edition.value : '';
    let description = contentDoc.getElementById('pou-description');
    data.description = description ? description.value : '';
    let bibRecId = contentDoc.getElementById('pou-bibliographic_record_id');
    data.bibRecId = bibRecId ? bibRecId.value : '';
    let getitCopies = /\d+ Copies/.exec(contentDoc.querySelector('.active div[ng-controller="PurchaseOrderLinesUpdateCtrl"]').textContent);

    data.getitCopies = getitCopies.length === 1 ? /\d+/.exec(getitCopies[0])[0] : '?';
    let orderLineRef = contentDoc.getElementById('pou-order_line_reference');
    if (orderLineRef && orderLineRef.value.length > 0) {
      data.orderLineRef = orderLineRef.value;
      if (/[^a-z]*rush[^a-z]*/i.test(orderLineRef.value)) {
        data.rush = true;
      }
      let orderLineRefParts = orderLineRef.value.split('-');
      orderLineRefParts.pop();
      data.poNum = orderLineRefParts.join('-');
    } else {
      data.orderLineRef = '';
      data.poNum = '';
    }

    let rushCheckbox = contentDoc.getElementById('pou-rush');
    if (rushCheckbox.checked) data.rush = true;

    data.copies = [];

    if (window.bibCopies && window.bibCopies.length > 0) {
      for (let item of window.bibCopies) {
        let copy = {};

        copy.copyLoc = item.loc;
        copy.receiptStatus = item.stat;
        copy.staffNote = item.note;

        if (/[^a-z]*rush[^a-z]*/i.test(copy.staffNote)) {
          data.rush = true;
        }

        data.copies.push(copy);
      }
      window.bibCopies = [];
    } else {
      let header = contentDoc.querySelectorAll('#polc-index .ui-grid-header');

      if (header.length > 1) {
        header = header[1].textContent.split(/\s\s+/);
        const locationIdx = header.indexOf("Location");
        const statusIdx = header.indexOf("Status");
        const notesIdx = header.indexOf("Notes");

        let rows = contentDoc.querySelectorAll('#polc-index div[ui-grid-row="row"]');
        for (let i = 0; i < rows.length; i++) {
          let copy = {}
          if (rows[i].textContent !== '') {

            data.copies.push({
              "copyLoc": rows[i].children[locationIdx].textContent.trim(),
              "receiptStatus": rows[i].children[statusIdx].textContent.trim().substring(0, 3) + '\'d',
              "staffNote": rows[i].children[notesIdx].textContent.trim()
            });
          }
        }
      }
    }
    data.copies.sort((a,b)=>{return a.copyLoc > b.copyLoc ? 1 : b.copyLoc > a.copyLoc ? -1 : 0;});
  }
  return data;
})();
