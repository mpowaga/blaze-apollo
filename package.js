Package.describe({
  name: 'mpowaga:blaze-apollo',
  version: '0.0.1',
  summary: 'Blaze integration for the Apollo Client',
  git: 'https://github.com/mpowaga/blaze-apollo',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use([
    'ecmascript',
    'reactive-var',
    'blaze-html-templates'
  ], 'client');
  api.mainModule('blaze-apollo.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mpowaga:blaze-apollo');
  api.mainModule('blaze-apollo-tests.js');
});
