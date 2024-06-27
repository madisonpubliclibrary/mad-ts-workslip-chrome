(function(){
  'use strict';
  let poNum = document.querySelector('td.poNum');
  let dateToday = document.querySelector('td.dateToday');
  let holds = document.querySelector('td.holds');
  let titleTH = document.querySelector('th.title');
  let title = document.querySelector('td.title');
  let authorTH = document.querySelector('th.author');
  let author = document.querySelector('td.author');
  let bibRecId = document.querySelector('td.bibRecId');
  let marc300 = document.querySelector('td.marc300');
  let ean13 = document.querySelector('td.ean13');
  let marc001 = document.querySelector('td.marc001');
  let marc092 = document.querySelector('td.marc092');
  let marc099a = document.querySelector('td.marc099a');
  let isbn = document.querySelector('td.isbn');
  let isbnMARC = document.querySelector('td.isbnMARC');
  let upc024a = document.querySelector('td.upc024a');
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
  let otherNotes = document.querySelector('td.otherNotes');

  let copyTableBody = document.getElementById('copyTableBody');

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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

    // If MARC data is returned
    if (request.hasOwnProperty('marcData') && request.marcData !== '') {
      // If MARC 020$a contained a 10 and/or 13-digit ISBN
      if (request.marcData.hasOwnProperty('020') && request.marcData['020'].length > 0) {
        // Use whichever ISBN was listed first in the workslip
        isbn.textContent = request.marcData['020'][0];
        // If the GetIT ISBN match digits appear in any of the MARC ISBN(s),
        // Confirm MARC ISBN is OK, else indicate update needed
        if (request.isbnMatchDigits.length === 9 && request.marcData['020'].some(i => i.includes(request.isbnMatchDigits))) {
          isbnMARC.textContent = "Yes";
        } else {
          isbnMARC.textContent = "No — UPDATE NEEDED";
        }
      } else {
        // Update also needed if no MARC ISBN but GetIT has valid ISBN
        if (request.isbn.length === 10 || request.isbn.length === 13) {
          isbnMARC.textContent = "No — UPDATE NEEDED";
        }
      }

      if (request.marcData.hasOwnProperty('024a') && request.marcData['024a'].length > 0 && request.upc !== '') {
        upc024a.parentElement.style.display = '';
        if (request.marcData['024a'].includes(request.upc)) {
          upc024a.textContent = 'Yes';
        }
      }

      if (request.marcData.hasOwnProperty('001')) {
        marc001.textContent = request.marcData['001'];
      } else {
        marc001.innerHTML = '&nbsp;';
      }

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

      // Override title if it was found in MARC data
      if (request.marcData.hasOwnProperty('245')) {
        titleTH.textContent = 'MARC 245' + request.marcData['245fields'] + ':';
        title.textContent = request.marcData['245'];
      }

      // Override author if it was found in MARC data
      if (request.marcData.hasOwnProperty('100+700')) {
        authorTH.textContent = request.marcData['100+700title']
        author.textContent = request.marcData['100+700'];
      }

      if (request.marcData.hasOwnProperty('300') && request.marcData['300'] !== '') {
        marc300.textContent = request.marcData['300'];
      } else {
        marc300.parentElement.style.display = 'none';
      }

      // Check if New AD FIC book over 500 pages
      if (request.marcData.hasOwnProperty('numPages') && request.hasOwnProperty('isNewADFIC')) {
        if (request.isNewADFIC && request.marcData.numPages >= 500) {
          otherNotes.textContent = 'NEW 4-WEEK AD FIC (' + request.marcData.numPages + ' pages)';
        }
      }
    } else {
      isbnMARC.parentElement.style.display = 'none';
      marc300.parentElement.style.display = 'none';
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
      if (parseInt(request.holds) >= 50) {
        rush.textContent = 'Super rush order!';
      }
    }

    if (request.getitCopies) {
      getitCopies.textContent = request.getitCopies;
    } else {
      getitCopies.textContent = '?';
    }

    if (request.linkCopies || request.linkCopies === 0) {
      linkCopies.textContent = request.linkCopies;
    } else {
      linkCopies.textContent = '?';
    }

    for  (let copy of request.copies) {
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
