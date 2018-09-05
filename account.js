import {Accounts} from 'meteor/accounts-base';

import {collection, levels} from './server';

Accounts.onLogin(function (attempt) {
  if (collection !== null) {
    collection.insert({
      timestamp: new Date(),
      connection: attempt.connection.id,
      byUser: {
        _id: attempt.user._id,
      },
      type: 'login',
      level: levels.ADMIN,
      data: {
        type: attempt.type,
        methodName: attempt.methodName,
        clientAddress: attempt.connection.clientAddress,
        userAgent: attempt.connection.httpHeaders['user-agent'] || null,
      },
    });
  }
});

Accounts.onLoginFailure(function (attempt) {
  let user;
  if (attempt.user) {
    user = {
      _id: attempt.user._id,
    };
  }
  else {
    user = null;
  }

  if (collection !== null) {
    collection.insert({
      timestamp: new Date(),
      connection: attempt.connection.id,
      byUser: user,
      type: 'loginFailure',
      level: levels.ADMIN,
      data: {
        type: attempt.type,
        methodName: attempt.methodName,
        error: `${attempt.error}`,
        clientAddress: attempt.connection.clientAddress,
        userAgent: attempt.connection.httpHeaders['user-agent'] || null,
      },
    });
  }
});

Accounts.onLogout(function (attempt) {
  let user;
  if (attempt.user) {
    user = {
      _id: attempt.user._id,
    };
  }
  else {
    user = null;
  }

  if (collection !== null) {
    collection.insert({
      timestamp: new Date(),
      connection: attempt.connection.id,
      byUser: user,
      type: 'logout',
      level: levels.ADMIN,
      data: null,
    });
  }
});
