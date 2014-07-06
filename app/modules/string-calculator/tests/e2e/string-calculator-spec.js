/*global describe:true, require:true, browser:true, expect:true, it:true, element:true, by:true, beforeEach:true, isAngularSite:true, $$:true */

describe('String Calculator Spec', function()
{
  'use strict';

  var helper = require('./page-object-helper.js');

  beforeEach(function ()
  {
    isAngularSite(false);

    browser.get('/modules/string-calculator/');
  });

  describe('Page Load', function ()
  {
    it('Should display page elements', function ()
    {
      expect(element.all(by.tagName('form')).count()).toEqual(1);

      expect(element.all(by.css('#idform')).count()).toEqual(1);

      expect($$('#txt-entry').count()).toEqual(1);

      expect(element.all(by.css('#txt-result')).count()).toEqual(1);
    });
  });

  describe('Calculate Data', function ()
  {
    it('Should return 0 when no values present', function ()
    {
      helper.formTestData('', '0');
    });

    it('Should return 1 when passing "1"', function ()
    {
      helper.formTestData('1', '1');
    });

    it('Should return 3 when passing "1,2"', function ()
    {
      helper.formTestData('1,2', '3');
    });

    it('Should return 6 when passing "1,2,3"', function ()
    {
      helper.formTestData('1,2,3', '6');
    });

    it('Should return 6 when passing "1\\n2,3', function ()
    {
      helper.formTestData('1\n2,3', '6');
    });

    it('Should return 3 when passing "//;\\n1;2"', function ()
    {
      helper.formTestData('//;\n1;2', '3');
    });

    it('Should return 2 when passing "//;\\n1;2"', function ()
    {
      helper.formTestData('2,1001', '2');
    });
  });
});
