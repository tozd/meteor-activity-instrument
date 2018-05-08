import {Meteor} from 'meteor/meteor';

import debounce from 'lodash.debounce';

Meteor.startup(function () {
  let focused = null;

  const focusChange = function (event) {
    if (focused === document.hasFocus()) {
      return;
    }
    focused = document.hasFocus();

    Meteor.apply('Activity.focus', [focused], {noRetry: true}, function (error, result) {
      // We are ignoring errors.
    });
  };

  const debouncedFocusChange = debounce(focusChange, 5000); // ms

  document.addEventListener('focus', debouncedFocusChange, false);
  document.addEventListener('blur', debouncedFocusChange, false);

  window.addEventListener('focus', debouncedFocusChange, false);
  window.addEventListener('blur', debouncedFocusChange, false);

  // Log initial value.
  focusChange();
});
