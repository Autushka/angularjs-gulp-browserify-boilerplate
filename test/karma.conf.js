'use strict';

var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');

module.exports = function(config) {

  config.set({

    basePath: '../',
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-browserify', 'karma-coverage'],
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'app/js/**/*.js': ['browserify', 'coverage']
    },
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: './test/coverage/',
        reporters: [{
                type: 'text-summary'
            }, {
                type: 'lcov',
                dir: 'test/reports',
                subdir: 'coverage'
            }
        ]
    },

    autoWatch: true,

    browserify: {
      debug: true,
      extensions: ['.js', '.jsx'],
      transform: [
        'babelify',
        'bulkify',
        istanbul({
          instrumenter: isparta,
          ignore: ['**/node_modules/**', '**/test/**']
        })
      ]
    },

    proxies: {
      '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
      // app-specific code
      'app/js/main.js',

      // 3rd-party resources
      'node_modules/angular-mocks/angular-mocks.js',

      // test files
      'test/unit/**/*.js'
    ]

  });

};
