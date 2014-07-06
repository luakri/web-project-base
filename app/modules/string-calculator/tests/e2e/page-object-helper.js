/*global element:true, by:true, exports:true, module:true, expect:true, protractor:true, browser:true */

/*jshint unused:false*/
var pageObject = function () {
  'use strict';

  var obj =
  {
    formTestData : function (input, result)
    {
      var $entry = {},
        $result = {};

      element.all(by.css('#idform'))
      .first()
      .then(function(form)
      {
        $entry = browser.driver.findElement(by.css('#txt-entry'));

        $result = browser.driver.findElement(by.css('#txt-result'));

        expect($entry.getAttribute('value')).toEqual('');

        expect($result.getAttribute('value')).toEqual('');

        $entry.sendKeys(input);

        expect($entry.getAttribute('value')).toBe(input);

        form.submit()
        .then(function ()
        {
          expect($entry.getAttribute('value')).toEqual('');

          expect($result.getAttribute('value')).toBe(result);
        });
      });
    }
  };

  return obj;
};

module.exports = pageObject();