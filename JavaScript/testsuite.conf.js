// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '.',
    autoWatch: './src/**.*.js',
    autoWatchBatchDelay: 1000,
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ["Chrome","ChromeCanary","PhantomJS"],
    files: [
      'target/**/*.js',
      'test/**/*.js'
    ]
  });
};