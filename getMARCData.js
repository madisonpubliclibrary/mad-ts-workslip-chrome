(function() {
  'use strict';
  let marcData = {};

  let marc092a = document.querySelector('[id^="tag_092_subfield_a"]');
  let marc092b = document.querySelector('[id^="tag_092_subfield_b"]');
  let marc099a = document.querySelector('[id^="tag_099_subfield_a"]');
  let loginError = document.getElementById('login_error');

  if (marc092a) marcData['092a'] = marc092a.value;
  if (marc092b) marcData['092b'] = marc092b.value;
  if (marc099a) marcData['099a'] = marc099a.value;

  if (loginError !== null) {
    return 'marcError';
  } else {
    return marcData;
  }
})();
