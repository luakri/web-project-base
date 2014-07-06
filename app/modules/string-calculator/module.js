(function (app, $, undefined) {
  'use strict';

  app.initForm = function () {
    var stringCalculator = {};

    if (app.StringCalculator) {

      stringCalculator = new app.StringCalculator();

      $('#idform').on('submit', function(e) {
        var $form = $('#idform'),
          $entry = $form.find('#txt-entry'),
          $result = $form.find('#txt-result'),
          result = stringCalculator.add($entry.val());

        $entry.val('');
        $result.val(result);

        e.preventDefault();
      });
    }
  };

  $(document).ready(function() {
    if ($('#idform').length) {
      app.initForm();
    }
  });

}(window.app = window.app || {}, jQuery));
