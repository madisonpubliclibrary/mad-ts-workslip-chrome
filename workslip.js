(function(){
  'use strict';
  let poNum = document.querySelector('td.poNum');
  let dateToday = document.querySelector('td.dateToday');
  let holds = document.querySelector('td.holds');
  let title = document.querySelector('td.title');
  let author = document.querySelector('td.author');
  let bibRecId = document.querySelector('td.bibRecId');
  let marc300 = document.querySelector('td.marc300');
  let ean13 = document.querySelector('td.ean13');
  let marc092 = document.querySelector('td.marc092');
  let marc099a = document.querySelector('td.marc099a');
  let isbn = document.querySelector('td.isbn');
  let issn = document.querySelector('td.issn');
  let ismn = document.querySelector('td.ismn');
  let upc = document.querySelector('td.upc');
  let manufactNum = document.querySelector('td.manufactNum');
  let supplierNum = document.querySelector('td.supplierNum');
  let publisher = document.querySelector('td.publisher');
  let listPrice = document.querySelector('td.listPrice');
  let discountedPrice = document.querySelector('td.discountedPrice');
  let datePub = document.querySelector('td.datePub');
  let edition = document.querySelector('td.edition');
  let getitDescription = document.querySelector('td.getitDescription');
  let rush = document.getElementById('rush');
  let getitCopies = document.getElementById('getitCopies');
  let linkCopies = document.getElementById('linkCopies');

  let copyTableBody = document.getElementById('copyTableBody');

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.poNum !== '') {
      poNum.textContent = request.poNum;
    } else {
      poNum.parentElement.style.display = 'none';
    }

    if (request.dateToday !== '') {
      dateToday.textContent = request.dateToday;
    } else {
      dateToday.parentElement.style.display = 'none';
    }

    if (request.holds !== '') {
      holds.textContent = request.holds;
    } else {
      holds.parentElement.style.display = 'none';
    }

    if (request.title !== '') {
      title.textContent = request.title;
    } else {
      title.parentElement.style.display = 'none';
    }

    if (request.author !== '') {
      author.textContent = request.author;
    } else {
      author.parentElement.style.display = 'none';
    }

    if (request.bibRecId !== '') {
      bibRecId.textContent = request.bibRecId;
    } else {
      bibRecId.parentElement.style.display = 'none';
    }

    if (request.ean13 !== '') {
      ean13.textContent = request.ean13;
    } else {
      ean13.parentElement.style.display = 'none';
    }

    if (request.hasOwnProperty('marcData')) {
      if (request.marcData.hasOwnProperty('092')) {
        marc092.textContent = request.marcData['092'];
      } else {
        marc092.innerHTML = '&nbsp;';
      }

      if (request.marcData.hasOwnProperty('099a')) {
        marc099a.textContent = request.marcData['099a'];
      } else {
        marc099a.innerHTML = '&nbsp;';
      }

      if (request.marcData.hasOwnProperty('300')) {
        marc300.textContent = request.marcData['300'];
      } else {
        marc300.innerHTML = '&nbsp;';
      }
    }

    if (request.isbn !== '') {
      isbn.textContent = request.isbn;
    } else {
      isbn.parentElement.style.display = 'none';
    }

    if (request.issn !== '') {
      issn.textContent = request.issn;
    } else {
      issn.parentElement.style.display = 'none';
    }

    if (request.ismn !== '') {
      ismn.textContent = request.ismn;
    } else {
      ismn.parentElement.style.display = 'none';
    }

    if (request.upc !== '') {
      upc.textContent = request.upc;
    } else {
      upc.parentElement.style.display = 'none';
    }

    if (request.manufactNum !== '') {
      manufactNum.textContent = request.manufactNum;
    } else {
      manufactNum.parentElement.style.display = 'none';
    }

    if (request.supplierNum !== '') {
      supplierNum.textContent = request.supplierNum;
    } else {
      supplierNum.parentElement.style.display = 'none';
    }

    if (request.publisher !== '') {
      publisher.textContent = request.publisher;
    } else {
      publisher.parentElement.style.display = 'none';
    }

    if (request.listPrice !== '') {
      listPrice.textContent = '$' + request.listPrice;
    } else {
      listPrice.parentElement.style.display = 'none';
    }

    if (request.discountedPrice !== '') {
      discountedPrice.textContent = '$' + request.discountedPrice;
    } else {
      discountedPrice.parentElement.style.display = 'none';
    }

    if (request.datePub !== '') {
      datePub.textContent = request.datePub;
    } else {
      datePub.parentElement.style.display = 'none';
    }

    if (request.edition !== '') {
      edition.textContent = request.edition;
    } else {
      edition.parentElement.style.display = 'none';
    }

    if (request.description !== '') {
      getitDescription.textContent = request.description;
    } else {
      getitDescription.parentElement.style.display = 'none';
    }

    if (request.rush) {
      rush.style.display = 'block';
    }

    if (request.getitCopies) {
      getitCopies.textContent = request.getitCopies;
    } else {
      getitCopies.textContent = '?';
    }

    if (request.linkCopies) {
      linkCopies.textContent = request.linkCopies;
    } else {
      linkCopies.textContent = '?';
    }

    for (let copy of request.copies) {
      let tr = document.createElement('tr');
      let copyLoc = document.createElement('td');
      let staffNote = document.createElement('td');
      let receiptStatus = document.createElement('td');

      if (copy.copyLoc !== '') {
        copyLoc.textContent = copy.copyLoc;
      } else {
        copyLoc.innerHTML = '&nbsp;';
      }

      if (copy.staffNote !== '') {
        staffNote.textContent = copy.staffNote;
      } else {
        staffNote.innerHTML = '&nbsp;';
      }

      if (copy.receiptStatus !== '') {
        receiptStatus.textContent = copy.receiptStatus;
      } else {
        receiptStatus.innerHTML = '&nbsp;';
      }

      tr.appendChild(copyLoc);
      tr.appendChild(receiptStatus);
      tr.appendChild(staffNote);

      copyTableBody.appendChild(tr);
    }

    window.print();
  });
})();
