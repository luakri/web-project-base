/*global describe:true, beforeEach:true, it:true, expect:true, assert:true */

describe('String Calculator Spec', function()
{
  'use strict';

  var stringCalculator = {};

  beforeEach(function ()
  {
    stringCalculator = new window.app.StringCalculator();
  });

  describe('add()', function()
  {
    it('Should return 0 when no values present', function(done)
    {
      var result = stringCalculator.add();

      expect(result).to.equal(0);

      assert.equal(result, 0);

      done();
    });

    it('Should return 0 when passing ""', function(done)
    {
      var result = stringCalculator.add("");

      expect(result).to.equal(0);

      assert.equal(result, 0);

      done();
    });

    it('Should return 1 when passing "1"', function(done)
    {
      var result = stringCalculator.add("1");

      expect(result).to.equal(1);

      assert.equal(result, 1);

      done();
    });

    it('Should return 3 when passing "1,2"', function(done)
    {
      var result = stringCalculator.add("1,2");

      expect(result).to.equal(3);

      assert.equal(result, 3);

      done();
    });

    it('Should return 6 when passing "1,2,3"', function(done)
    {
      var result = stringCalculator.add("1,2,3");

      expect(result).to.equal(6);

      assert.equal(result, 6);

      done();
    });

    it('Should return 6 when passing "1\\n2,3"', function(done)
    {
      var result = stringCalculator.add("1\n2,3");

      expect(result).to.equal(6);

      assert.equal(result, 6);

      done();
    });

    it('Should return 3 when passing "//;\\n1;2"', function(done)
    {
      var result = stringCalculator.add("//;\n1;2");

      expect(result).to.equal(3);

      assert.equal(result, 3);

      done();
    });

    it('Should raise when passing "//1,-2"', function()
    {
      expect(function()
      {
        stringCalculator.add("//;\n1;-2");
      }).to['throw'](Error);

      assert.throws(function()
      {
        stringCalculator.add("//;\n1;-2");
      }, Error);
    });

    it('Should return error message when including negative numbers', function()
    {
      var result = "negatives not allowed -1,-2";

      try {
        stringCalculator.add("//;\n-1;-2");
      }
      catch(e)
      {
        expect(e.message).to.equal(result);

        assert.equal(e.message, result);
      }
    });

    it('Should exclude numbers bigger than 1000', function()
    {
      var result = stringCalculator.add("2,1001");

      expect(result).to.equal(2);

      assert.equal(result, 2);
    });
  });
});
