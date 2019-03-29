(function(){
  'use strict';
  let poNum = document.querySelector('td.poNum');
  let dateToday = document.querySelector('td.dateToday');
  let holds = document.querySelector('td.holds');
  let title = document.querySelector('td.title');
  let author = document.querySelector('td.author');
  let callNumber = document.querySelector('td.callNumber');
  let isbn = document.querySelector('td.isbn');
  let issn = document.querySelector('td.issn');
  let ismn = document.querySelector('td.ismn');
  let upc = document.querySelector('td.upc');
  let manufactNum = document.querySelector('td.manufactNum');
  let supplierNum = document.querySelector('td.supplierNum');
  let publisher = document.querySelector('td.publisher');
  let datePub = document.querySelector('td.datePub');
  let edition = document.querySelector('td.edition');
  let description = document.querySelector('td.description');
  let bibRecId = document.querySelector('td.bibRecId');
  let orderLineRef = document.querySelector('td.orderLineRef');

  let copyTable = document.getElementById('copyTable');

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.poNum !== '') {
      poNum.textContent = request.poNum;
    } else {
      poNum.innerHTML = '&nbsp;';
    }

    if (request.dateToday !== '') {
      dateToday.textContent = request.dateToday;
    } else {
      dateToday.innerHTML = '&nbsp;';
    }

    if (request.holds !== '') {
      holds.textContent = request.holds;
    } else {
      holds.innerHTML = '&nbsp;';
    }

    if (request.title !== '') {
      title.textContent = request.title;
    } else {
      title.innerHTML = '&nbsp;';
    }

    if (request.author !== '') {
      author.textContent = request.author;
    } else {
      author.innerHTML = '&nbsp;';
    }

    if (request.callNumber !== '') {
      callNumber.textContent = request.callNumber;
    } else {
      callNumber.innerHTML = '&nbsp;';
    }

    if (request.isbn !== '') {
      isbn.textContent = request.isbn;
    } else {
      isbn.innerHTML = '&nbsp;';
    }

    if (request.issn !== '') {
      issn.textContent = request.issn;
    } else {
      issn.innerHTML = '&nbsp;';
    }

    if (request.ismn !== '') {
      ismn.textContent = request.ismn;
    } else {
      ismn.innerHTML = '&nbsp;';
    }

    if (request.upc !== '') {
      upc.textContent = request.upc;
    } else {
      upc.innerHTML = '&nbsp;';
    }

    if (request.manufactNum !== '') {
      manufactNum.textContent = request.manufactNum;
    } else {
      manufactNum.innerHTML = '&nbsp;';
    }

    if (request.supplierNum !== '') {
      supplierNum.textContent = request.supplierNum;
    } else {
      supplierNum.innerHTML = '&nbsp;';
    }

    if (request.publisher !== '') {
      publisher.textContent = request.publisher;
    } else {
      publisher.innerHTML = '&nbsp;';
    }

    if (request.datePub !== '') {
      datePub.textContent = request.datePub;
    } else {
      datePub.innerHTML = '&nbsp;';
    }

    if (request.edition !== '') {
      edition.textContent = request.edition;
    } else {
      edition.innerHTML = '&nbsp;';
    }

    if (request.description !== '') {
      description.textContent = request.description;
    } else {
      description.innerHTML = '&nbsp;';
    }

    if (request.bibRecId !== '') {
      bibRecId.textContent = request.bibRecId;
    } else {
      bibRecId.innerHTML = '&nbsp;';
    }

    if (request.orderLineRef !== '') {
      orderLineRef.textContent = request.orderLineRef;
    } else {
      orderLineRef.innerHTML = '&nbsp;';
    }

    for  (let copy of request.copies) {
      let tr = document.createElement('tr');
      let copyLoc = document.createElement('td');
      let staffNote = document.createElement('td');
      let receiptStatus = document.createElement('td');

      copyLoc.textContent = copy.copyLoc;
      staffNote.textContent = copy.staffNote;
      receiptStatus.textContent = copy.receiptStatus;

      tr.appendChild(copyLoc);
      tr.appendChild(staffNote);
      tr.appendChild(receiptStatus);

      copyTable.appendChild(tr);
    }

    window.print();
  });
})();
