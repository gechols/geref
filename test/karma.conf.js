var path = require('path'),
  projectPath = path.resolve(__dirname, '../'),
  masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));

module.exports = function(config) {
  masterConf(config, {
    browsers: ["PhantomJS"],
    projectPath: projectPath,
    testFiles: [
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.9/angular.js',
      'node_modules/theme-engage/vendor/angularjs/js/angular-1.2.9/angular-mocks.js',

      "assets/js/angular/gemstore/gemstore.js",

      "assets/js/**/test/*Test.js"
    ]
  });
};