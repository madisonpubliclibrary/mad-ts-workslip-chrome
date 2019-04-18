(function(){
  'use strict';
  let contentDoc = document.getElementById('frame');
  let data = {"dateToday": (new Date()).toLocaleDateString(), "rush": false};

  if (contentDoc) {
    contentDoc = contentDoc.contentWindow.document;

    let title = contentDoc.querySelector('.active input[ng-model="formdata.title"]');
    data.title = title ? title.value : '';
    let author = contentDoc.querySelector('.active input[ng-model="formdata.author"]');
    data.author = author ? author.value : '';
    let ean13 = contentDoc.querySelector('.active input[ng-model="formdata.EAN13"]');
    data.ean13 = ean13 ? ean13.value : '';
    let isbn = contentDoc.querySelector('.active input[ng-model="formdata.ISBN"]');
    data.isbn = isbn ? isbn.value : '';
    let issn = contentDoc.querySelector('.active input[ng-model="formdata.ISSN"]');
    data.issn = issn ? issn.value : '';
    let ismn = contentDoc.querySelector('.active input[ng-model="formdata.ISMN"]');
    data.ismn = ismn ? ismn.value : '';
    let upc = contentDoc.querySelector('.active input[ng-model="formdata.UPC"]');
    data.upc = upc ? upc.value : '';
    let manufactNum = contentDoc.querySelector('.active input[ng-model="formdata.manufacturer_number"]');
    data.manufactNum = manufactNum ? manufactNum.value : '';
    let supplierNum = contentDoc.querySelector('.active input[ng-model="formdata.supplier_number"]');
    data.supplierNum = supplierNum ? supplierNum.value : '';
    let publisher = contentDoc.querySelector('.active input[ng-model="formdata.publisher"]');
    data.publisher = publisher ? publisher.value : '';
    let listPrice = contentDoc.querySelector('.active input[ng-model="formdata.list_price"]');
    data.listPrice = listPrice ? listPrice.value : '';
    let discountedPrice = contentDoc.querySelector('.active input[ng-model="formdata.discounted_price"]');
    data.discountedPrice = discountedPrice ? discountedPrice.value : '';
    let datePub = contentDoc.querySelector('.active input[ng-model="formdata.date_of_publication"]');
    data.datePub = datePub ? datePub.value : '';
    let edition = contentDoc.querySelector('.active input[ng-model="formdata.edition"]');
    data.edition = edition ? edition.value : '';
    let description = contentDoc.querySelector('.active input[ng-model="formdata.description"]');
    data.description = description ? description.value : '';
    let bibRecId = contentDoc.querySelector('.active input[ng-model="formdata.bibliographic_record_id"]');
    data.bibRecId = bibRecId ? bibRecId.value : '';
    let totalCopies = contentDoc.querySelector('.active div[ng-controller="PurchaseOrderLinesSummary"] .po_header_lines p:first-child');
    data.totalCopies = totalCopies !== null ? totalCopies.textContent.match(/\d+/)[0] : '?';
    let orderLineRef = contentDoc.querySelector('.active input[ng-model="formdata.order_line_reference"]');
    if (orderLineRef && orderLineRef.value.length > 0) {
      data.orderLineRef = orderLineRef.value;
      let orderLineRefParts = orderLineRef.value.split('-');
      orderLineRefParts.pop();
      data.poNum = orderLineRefParts.join('-');
    } else {
      data.orderLineRef = '';
      data.poNum = '';
    }

    data.copies = [];
    let copyTable = contentDoc.querySelector('.active div[ng-include="\'app/purchase_order_line_copies/index.html\'"] .ngCanvas');

    if (copyTable) {
      for (let row of copyTable.children) {
        row = row.children[0].children[1];

        let copy = {};

        copy.copyLoc = row.children[0].textContent.trim();
        copy.receiptStatus = row.children[2].textContent.trim().substring(0,3) + '\'d';
        copy.staffNote = row.children[7].textContent.trim();

        if (/[^a-zA-Z]*rush[^a-zA-Z]*/i.test(copy.staffNote)) {
          data.rush = true;
        }

        data.copies.push(copy);
      }

      data.copies.sort((a,b) => {return a.copyLoc > b.copyLoc ? 1 : b.copyLoc > a.copyLoc ? -1 : 0;});
    }
  }
  return data;
})();
