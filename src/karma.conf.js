// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['text', 'lcov'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['HeadlessChrome'],
    // browsers: ['Chrome'],
    customLaunchers:{
      HeadlessChrome:{
        base: 'ChromeHeadless',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222',
        ]
      }
    },
    singleRun: false,
    captureTimeout: 120000,
    browserDisconnectTimeout : 60000,
    browserDisconnectTolerance : 4,
    browserNoActivityTimeout : 120000,
  });
};
