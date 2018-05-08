Instrument client and server to log user activity
=================================================

Meteor package which instrument client and server to log user activity
in *activity document* format. It logs:

* Meteor connection creation and disconnect.
* Meteor account login.
* Meteor account login failure.
* Meteor account logout.
* Route changes, supporting Flow Router and Vue Router.
* Any browser error (`window.onerror`) with metadata for debugging.
* Client window visibility changes.
* Client window focus changes.

Both client and server side.

Installation
------------

```
meteor add tozd:activity-instrument
```

On client, initialize:

```js
import {init} from 'meteor/tozd:activity-instrument';

Meteor.startup(function () {
  const vm = new Vue({
    ...
  });

  init(ActivityCollection, vm);
});
```

If you are not using Vue, just pass `null` as the second argument.
`ActivityCollection` is a Meteor collection into which to store
activity documents.

On server, initialize:

```js
import {init} from 'meteor/tozd:activity-instrument';

init(ActivityCollection, {
  DEBUG: 'debug',
  ERROR: 'error',
  ADMIN: 'admin',
  USER: 'user',
  GENERAL: 'general',
});
```
