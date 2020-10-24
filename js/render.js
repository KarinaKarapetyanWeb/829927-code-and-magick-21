'use strict';

(function () {
  var WIZARDS_NUMBER = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var similarListElement = window.util.setup.querySelector('.setup-similar-list');
  var similarBlock = window.util.setup.querySelector('.setup-similar');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length > WIZARDS_NUMBER
      ? WIZARDS_NUMBER
      : wizards.length;

    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    similarBlock.classList.remove('hidden');
  };
})();
