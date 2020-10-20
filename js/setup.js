'use strict';

(function () {

  var WIZARDS_NUMBER = 4;

  var similarListElement = window.util.setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');


  var form = window.util.setup.querySelector('.setup-wizard-form');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var submitSuccessHandler = function () {
    window.util.setup.classList.add('hidden');
  };

  // var submitErrorHandler = function () {
  //   window.util.setup.classList.add('hidden');
  // };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), submitSuccessHandler, errorHandler);
    evt.preventDefault();
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', submitHandler);
})();
