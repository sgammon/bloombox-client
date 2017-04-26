// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    autoWatch: './target/**.*.js',
    autoWatchBatchDelay: 1000,
    frameworks: ['mocha', 'chai'],
    reporters: ['dots', 'junit', 'progress', 'spec', 'coverage'],
    browsers: ['Chrome', 'Firefox'],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      // configure the reporter to use isparta for JavaScript coverage
      // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
      instrumenters: { isparta: require('isparta') },
      instrumenter: {
        'src/**/*.js': 'isparta'
      },
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text', dir: 'coverage/', file: 'coverage-summary.txt'},
        {type: 'lcov', dir: 'coverage/', subdir: 'report-lcov'},
        {type: 'cobertura', dir: 'coverage/', subdir: 'report-cobertura'},
        {type: 'text-summary'},
      ]
    },
    junitReporter: {
      outputDir: 'test-reports/',
      suite: 'bloombox.apiclient.js',
      useBrowserName: true
    },
    flags: [
      '--disable-web-security', '--headless', '--no-sandbox', '--ignore-ssl-errors=true'
    ],
    plugins: [
      'karma-spec-reporter',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-junit-reporter'],
    files: [
      'https://apis.google.com/js/client.js',
      'test/shim.js',
      'src/common/_base.js',
      'src/common/api.js',
      'src/common/logging.js',
      'src/api/tools.js',
      'src/api/embed/_base.js',
      'src/api/embed/index.js',
      'test/testsuite.js'
    ]
  });
};
