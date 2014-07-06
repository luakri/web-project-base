/*global exports:true, global:true, browser:true */

exports.config =
{
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8002',

  rootElement: 'html',
  allScriptsTimeout: 60000,
  chromeOnly: false,
  includeStackTrace : true,
  verbose: true,

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000
  },

  onPrepare: function(){
    'use strict';

    global.isAngularSite = function(flag){
      browser.ignoreSynchronization = !flag;
    };
  },

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions : {
        args : ['test-type']
      }
    }/*,
    {
      browserName: 'firefox',
      proxy : {
        proxyType: 'AUTODETECT'
      }
    }*/
  ],

  specs: [
    '../app/modules/string-calculator/tests/e2e/string-calculator-spec.js'
  ]
};
