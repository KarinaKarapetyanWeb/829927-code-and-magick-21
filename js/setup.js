'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_NUMBER = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

userDialog.classList.remove('hidden');

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createWizardsArray = function (array, names, lastNames, coatColor, eyesColor) {
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    array[i] = {
      name: getRandomItem(names) + ' ' + getRandomItem(lastNames),
      coatColor: getRandomItem(coatColor),
      eyeColor: getRandomItem(eyesColor)
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// модальное окно

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
// еще одна переменная .setup userDialog
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// валидация формы

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userNameInput = document.querySelector('.setup-user-name');
var coatColorInput = document.querySelector('input[name=coat-color]');
var eyesColorInput = document.querySelector('input[name=eyes-color]');
var fireballColorInput = document.querySelector('input[name=fireball-color]');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var randomCoatColor;
var randomEyeColor;
var randomFireballColor;


userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
});

// название функции соотвеnствует критерию? Или можно было бы просто назвать wizardSettings?

var onWizardClick = function (element, data, color, input) {
  element.addEventListener('click', function () {
    color = getRandomItem(data);
    input.value = color;
    if (element === wizardFireball) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
  });
};

onWizardClick(wizardCoat, COAT_COLORS, randomCoatColor, coatColorInput);

onWizardClick(wizardEyes, EYES_COLORS, randomEyeColor, eyesColorInput);

onWizardClick(wizardFireball, FIREBALL_COLORS, randomFireballColor, fireballColorInput);

// wizardCoat.addEventListener('click', function() {
//   var randomCoatColor = getRandomItem(COAT_COLORS);
//   wizardCoat.style.fill = randomCoatColor;
//   coatColorInput.value = randomCoatColor;
// });

// wizardEyes.addEventListener('click', function() {
//   var randomEyeColor = getRandomItem(EYES_COLORS);
//   wizardEyes.style.fill = randomEyeColor;
//   eyesColorInput.value = randomEyeColor;
// });

// wizardFireball.addEventListener('click', function() {
//   var randomFireballColor = getRandomItem(FIREBALL_COLORS);
//   wizardFireball.style.backgroundColor = randomFireballColor;
//   fireballColorInput.value = randomFireballColor;
// });
