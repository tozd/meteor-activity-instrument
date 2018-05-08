Package.describe({
  name: 'tozd:activity-instrument',
  summary: "Instrument client and server to log user activity.",
  version: '0.1.2',
  git: 'https://github.com/tozd/meteor-activity-instrument.git'
});

Npm.depends({
  'parseurl': '1.3.2',
  'lodash.isplainobject': '4.0.6',
  'lodash.debounce': '4.0.8'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.4.4.5');

  // Core dependencies.
  api.use([
    'accounts-base',
    'promise',
    'ecmascript',
    'webapp'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:check-extension@0.4.0',
    'peerlibrary:stacktrace@1.3.1_2'
  ]);

  api.use([
    'peerlibrary:flow-router@2.12.1_1',
    'kadira:flow-router@2.12.1'
  ], {weak: true});

  api.addFiles([
    'router.js',
    'errors.js',
    'visibility.js',
    'focus.js'
  ], 'client');

  api.addFiles([
    'api.js',
    'connection.js',
    'account.js'
  ], 'server');

  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});
