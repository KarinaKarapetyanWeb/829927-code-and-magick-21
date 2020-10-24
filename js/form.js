'use strict';

(function () {

  var form = window.util.setup.querySelector('.setup-wizard-form');

  var submitSuccessHandler = function () {
    window.util.setup.classList.add('hidden');
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), submitSuccessHandler, window.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);
})();
