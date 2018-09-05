import {collection, levels} from './server';

Meteor.onConnection(function (connection) {
  connection.onClose(() => {
    if (collection !== null) {
      collection.insert({
        timestamp: new Date(),
        connection: connection.id,
        byUser: null,
        type: 'connectionEnd',
        level: levels.DEBUG,
        data: null,
      });
    }
  });

  if (collection !== null) {
    collection.insert({
      timestamp: new Date(),
      connection: connection.id,
      byUser: null,
      type: 'connectionStart',
      level: levels.DEBUG,
      data: {
        clientAddress: connection.clientAddress,
        userAgent: connection.httpHeaders['user-agent'] || null,
        acceptLanguage: connection.httpHeaders['accept-language'] || null,
        release: Meteor.release,
        version: __meteor_runtime_config__.VERSION || null,
      },
    });
  }
});
