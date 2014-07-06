/*global module:true */
// grunt ut --browser=PhantomJS

module.exports = function(config)
  {
  'use strict';

  config.set(
    {
      basePath : '../app',
      frameworks: ['mocha', 'chai', 'fixture', 'sinon'],
      browsers : ['PhantomJS'],

      keepalive: false,
      autoWatch : true,
      singleRun : false,
      port: 9876,
      runnerPort: 9100,
      colors: true,
      captureTimeout: 60000,

      preprocessors : {
        '**/*.html' : ['html2js'],
        '**/*.json' : ['html2js'],
        'modules/**!(tests)/*.js' : 'coverage'
      },

      reporters: ['dots', 'progress', 'coverage'],

      coverageReporter: {
        type : 'lcov',
        dir : '../dist/docs/coverage/'
      },

      proxies: {},

      exclude: [],

      files : [
        'js/lib/modernizr.js',
        'js/lib/jquery/jquery-1.11.0.js',

        'modules/**!(tests)/*.js',

        'modules/string-calculator/tests/unit/string-calculator-spec.js',
        'modules/string-calculator/tests/unit/string-calculator-view-spec.js',

        // IMPORTANT: include fixtures.
        '**/*.html'
      ]
    }
  );
};
