(function(){
  'use strict';
  let contentDoc = document.getElementById('frame');
  let data = {"dateToday": (new Date()).toLocaleDateString()};

  if (contentDoc) {
    contentDoc = contentDoc.contentWindow.document;

    let title = contentDoc.querySelector('input[ng-model="formdata.title"]');
    data.title = title ? title.value : '';
    let author = contentDoc.querySelector('input[ng-model="formdata.author"]');
    data.author = author ? author.value : '';
    let callNumber = contentDoc.querySelector('input[ng-model="formdata.EAN13"]');
    data.callNumber = callNumber ? callNumber.value : '';
    let isbn = contentDoc.querySelector('input[ng-model="formdata.ISBN"]');
    data.isbn = isbn ? isbn.value : '';
    let issn = contentDoc.querySelector('input[ng-model="formdata.ISSN"]');
    data.issn = issn ? issn.value : '';
    let ismn = contentDoc.querySelector('input[ng-model="formdata.ISMN"]');
    data.ismn = ismn ? ismn.value : '';
    let upc = contentDoc.querySelector('input[ng-model="formdata.UPC"]');
    data.upc = upc ? upc.value : '';
    let manufactNum = contentDoc.querySelector('input[ng-model="formdata.manufacturer_number"]');
    data.manufactNum = manufactNum ? manufactNum.value : '';
    let supplierNum = contentDoc.querySelector('input[ng-model="formdata.supplier_number"]');
    data.supplierNum = supplierNum ? supplierNum.value : '';
    let publisher = contentDoc.querySelector('input[ng-model="formdata.publisher"]');
    data.publisher = publisher ? publisher.value : '';
    let listPrice = contentDoc.querySelector('input[ng-model="formdata.list_price"]');
    data.listPrice = listPrice ? listPrice.value : '';
    let discountedPrice = contentDoc.querySelector('input[ng-model="formdata.discounted_price"]');
    data.discountedPrice = discountedPrice ? discountedPrice.value : '';
    let datePub = contentDoc.querySelector('input[ng-model="formdata.date_of_publication"]');
    data.datePub = datePub ? datePub.value : '';
    let edition = contentDoc.querySelector('input[ng-model="formdata.edition"]');
    data.edition = edition ? edition.value : '';
    let description = contentDoc.querySelector('input[ng-model="formdata.description"]');
    data.description = description ? description.value : '';
    let bibRecId = contentDoc.querySelector('input[ng-model="formdata.bibliographic_record_id"]');
    data.bibRecId = bibRecId ? bibRecId.value : '';
    let orderLineRef = contentDoc.querySelector('input[ng-model="formdata.order_line_reference"]');
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
    let copyTable = contentDoc.querySelector('div[ng-include="\'app/purchase_order_line_copies/index.html\'"] .ngCanvas');

    if (copyTable) {
      for (let row of copyTable.children) {
        row = row.children[0].children[1];

        let copy = {};

        copy.copyLoc = row.children[0].textContent.trim();
        copy.receiptStatus = row.children[2].textContent.trim().substring(0,3) + '\'d';
        copy.staffNote = row.children[7].textContent.trim();

        data.copies.push(copy);
      }

      data.copies.sort((a,b) => {return a.copyLoc > b.copyLoc ? 1 : b.copyLoc > a.copyLoc ? -1 : 0;});
    }
  }
  return data;
})();
