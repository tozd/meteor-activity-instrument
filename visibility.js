// Based on: https://stereologics.com/2015/04/02/about-page-visibility-api-hidden-visibilitychange-visibilitystate/

import {Meteor} from 'meteor/meteor';

import debounce from 'lodash.debounce';

const BROWSER_PREFIXES = [
  'moz',
  'ms',
  'o',
  'webkit'
];

function getHiddenPropertyName(prefix) {
  if (prefix) {
    return `${prefix}Hidden`;
  }
  else {
    return 'hidden';
  }
}

function getVisibilityEvent(prefix) {
  if (prefix) {
    return `${prefix}visibilitychange`;
  }
  else {
    return 'visibilitychange';
  }
}

function getBrowserPrefix() {
  for (let prefix of BROWSER_PREFIXES) {
    if (getHiddenPropertyName(prefix) in document) {
      return prefix;
    }
  }

  return null;
}

Meteor.startup(function () {
  const browserPrefix = getBrowserPrefix();
  const hiddenPropertyName = getHiddenPropertyName(browserPrefix);
  const visibilityEventName = getVisibilityEvent(browserPrefix);

  // Maybe it is not supported.
  if (!(hiddenPropertyName in document)) {
    return;
  }

  let hidden = null;

  const visibilityChange = function (event) {
    if (hidden === document[hiddenPropertyName]) {
      return;
    }
    hidden = document[hiddenPropertyName];

    Meteor.apply('Activity.visibility', [!hidden], {noRetry: true}, function (error, result) {
      // We are ignoring errors.
    });
  };

  const debouncedVisibilityChange = debounce(visibilityChange, 5000); // ms

  document.addEventListener(visibilityEventName, debouncedVisibilityChange, false);

  // Log initial value.
  visibilityChange();
});
