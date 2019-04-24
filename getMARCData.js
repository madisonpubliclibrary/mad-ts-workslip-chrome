(function() {
  'use strict';
  let loginError = document.getElementById('login_error');

  if (loginError !== null) {
    return 'marcError';
  } else {
    const marcData = {};

    const marc092a = document.querySelector('[id^="tag_092_subfield_a"]');
    const marc092b = document.querySelector('[id^="tag_092_subfield_b"]');
    const marc099a = document.querySelector('[id^="tag_099_subfield_a"]');

    const marc300a = document.querySelector('[id^="tag_300_subfield_a"]');
    const marc300b = document.querySelector('[id^="tag_300_subfield_b"]');
    const marc300c = document.querySelector('[id^="tag_300_subfield_c"]');
    const marc300e = document.querySelector('[id^="tag_300_subfield_e"]');

    const bibDescriptionArr = [];

    if (marc092a) {
      marcData['092'] = marc092a.value;

      if (marc092b) marcData['092'] += ' ' + marc092b.value;
    } else if (marc092b) {
      marcData['092'] = marc092b.value;
    }

    if (marc099a) marcData['099a'] = marc099a.value;

    if (marc300a) bibDescriptionArr.push(marc300a.value);
    if (marc300b) bibDescriptionArr.push(marc300b.value);
    if (marc300c) bibDescriptionArr.push(marc300c.value);
    if (marc300e) bibDescriptionArr.push(marc300e.value);

    marcData['300'] = bibDescriptionArr.join(' ');

    return marcData;
  }
})();
