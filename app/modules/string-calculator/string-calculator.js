/* Credits
http://www.solveet.com/exercises/Kata-String-Calculator/8/solution-1026
http://www.solveet.com/alberto
http://osherove.com/tdd-kata-1/
*/

(function (app, $, undefined) {
  'use strict';
  /*jshint camelcase:false */

  var sum = function(values) {
    guardAgainstNegatives(values);
    return values.reduce(function(previous, current) {
      return previous + current;
    });
  };

  var guardAgainstNegatives = function(values) {
    var n = negatives(values);
    if (n.length > 0) {
      throw new Error("negatives not allowed " + n);
    }
  };

  var values = function(s) {
    var d = delimiters_expression(s);
    return positive(numbers(s, d));
  };

  var numbers = function(s, delimiters) {
    return string_with_numbers(s).split(delimiters).map(function(value){
      return +value;
    });
  };

  var positive = function(numbers) {
    return numbers.filter(function(value){
      return value <= 1000;
    });
  };

  var string_with_numbers = function(s) {
    if (s.indexOf('//') === 0) {
      return s.substr(s.indexOf('\n') +1);
    }
    return s;
  };

  var negatives = function(values) {
    return values.filter(function(value) {
      return value < 0;
    });
  };

  var delimiters_expression = function(s) {
    return new RegExp(delimiters(s).join('|'));
  };

  var delimiters = function(s) {
    return defaultDelimiters().concat(customDelimiters(s));
  };

  var defaultDelimiters = function() {
    return [',', '\n'];
  };

  var customDelimiters = function(s) {
    if (s.indexOf('//') === -1) {
      return [];
    }
    return [s[2]];
  };

  var StringCalculator = function () {};

  StringCalculator.prototype.add = function(s) {
    return sum(values(s || "0"));
  };

  app.StringCalculator = StringCalculator;

}(window.app = window.app || {}, jQuery));
