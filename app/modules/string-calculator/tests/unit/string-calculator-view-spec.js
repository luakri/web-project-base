/*global describe:true, beforeEach:true, afterEach:true, it:true, expect:true, fixture:true */

describe('String Calculator View Spec', function()
{
  'use strict';

  var $element = {};

  beforeEach(function ()
  {
    fixture.base = 'modules/string-calculator/tests/unit/fixtures';

    var element = fixture.load('calculator-fixture.html');

    $element = $(element);
  });

  afterEach(function(){
    fixture.cleanup();
  });

  describe('Page Load', function()
  {
    it('Should display page elements', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      expect($entry.length).to.equal(1);

      expect($result.length).to.equal(1);

      expect($button.length).to.equal(1);

      done();
    });
  });

  describe('Calculate Data', function()
  {
    it('Should return 0 when no values present', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('0');

      done();
    });

    it('Should return 1 when passing "1"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('1');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('1');

      done();
    });

    it('Should return 3 when passing "1,2"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('1,2');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('3');

      done();
    });

    it('Should return 6 when passing "1,2,3"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('1,2,3');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('6');

      done();
    });

    it('Should return 6 when passing "1\\n2,3"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('1\n2,3');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('6');

      done();
    });

    it('Should return 3 when passing "//;\\n1;2"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('//;\n1;2');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('3');

      done();
    });

    it('Should return 2 when passing "//;\\n1;2"', function(done)
    {
      var $entry = $element.find('#txt-entry'),
        $result = $element.find('#txt-result'),
        $button = $element.find('input[type=submit]');

      window.app.initForm();

      $entry.val('2,1001');

      expect($result.val()).to.equal('');

      $button.trigger('click');

      expect($result.val()).to.equal('2');

      done();
    });
  });
});
