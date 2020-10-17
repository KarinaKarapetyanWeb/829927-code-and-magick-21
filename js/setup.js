'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var WIZARDS_NUMBER = 4;

  var similarListElement = window.util.setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizards = [];

  var createWizardsArray = function (array, names, lastNames, coatColor, eyesColor) {
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      array[i] = {
        name: window.util.getRandomItem(names) + ' ' + window.util.getRandomItem(lastNames),
        coatColor: window.util.getRandomItem(coatColor),
        eyeColor: window.util.getRandomItem(eyesColor)
      };
    }
  };

  createWizardsArray(wizards, WIZARD_NAMES, WIZARD_LAST_NAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');

})();
